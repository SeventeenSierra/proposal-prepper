# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

"""
Local Executive Order Crawler for the Sovereign OBI platform.

This module fetches Executive Orders from the National Archives (Federal Register)
API and prepares them for ingestion into the OBI knowledge base.
"""

import logging
import httpx
import asyncio
from typing import List, Dict, Any, Optional
from datetime import datetime
import json

from database import get_async_session
from obi_models import EOCrawlStatus, KnowledgeSource, KnowledgeChunk
from sqlalchemy import select, update

logger = logging.getLogger(__name__)

class EOCrawler:
    """Crawler for National Archives Federal Register Executive Orders."""
    
    API_BASE_URL = "https://www.federalregister.gov/api/v1/documents.json"
    
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=30.0)
    
    async def discover_recent_eos(self, per_page: int = 20) -> List[Dict[str, Any]]:
        """
        Discover the most recent Executive Orders from the Federal Register API.
        """
        params = {
            "conditions[type][]": "PRESDOCU",
            "conditions[presidential_document_type][]": "executive_order",
            "per_page": per_page,
            "order": "newest"
        }
        
        try:
            logger.info(f"Fetching recent EOs from Federal Register API...")
            response = await self.client.get(self.API_BASE_URL, params=params)
            response.raise_for_status()
            data = response.json()
            
            results = data.get("results", [])
            logger.info(f"Discovered {len(results)} Executive Orders")
            
            await self._update_discovery_status(results)
            return results
            
        except Exception as e:
            logger.error(f"Failed to discover EOs: {e}")
            return []

    async def _update_discovery_status(self, eo_results: List[Dict[str, Any]]):
        """Store newly discovered EOs in the crawl status table."""
        async with get_async_session() as session:
            for eo_data in eo_results:
                eo_number = eo_data.get("executive_order_number")
                if not eo_number:
                    # Some presidential documents might not have an EO number in the same field
                    # depending on the specific API response structure
                    continue
                
                # Check if already exists
                stmt = select(EOCrawlStatus).where(EOCrawlStatus.eo_number == str(eo_number))
                existing = (await session.execute(stmt)).scalar_one_or_none()
                
                if not existing:
                    new_eo = EOCrawlStatus(
                        eo_number=str(eo_number),
                        title=eo_data.get("title", "Unknown Title"),
                        signing_date=datetime.fromisoformat(eo_data["signing_date"]) if eo_data.get("signing_date") else None,
                        publication_date=datetime.fromisoformat(eo_data["publication_date"]) if eo_data.get("publication_date") else None,
                        federal_register_url=eo_data.get("html_url"),
                        status="discovered"
                    )
                    session.add(new_eo)
            
            await session.commit()

    async def fetch_eo_content(self, document_number: str) -> Optional[Dict[str, Any]]:
        """Fetch the full text and metadata for a specific document."""
        url = f"https://www.federalregister.gov/api/v1/documents/{document_number}.json"
        
        try:
            logger.info(f"Fetching metadata for document {document_number}...")
            response = await self.client.get(url)
            response.raise_for_status()
            doc_data = response.json()
            
            # Fetch raw text if URL is present
            raw_text_url = doc_data.get("raw_text_url")
            if raw_text_url:
                logger.info(f"Fetching raw text from {raw_text_url}...")
                text_response = await self.client.get(raw_text_url)
                text_response.raise_for_status()
                doc_data["raw_text"] = text_response.text
                
            return doc_data
        except Exception as e:
            logger.error(f"Failed to fetch content for {document_number}: {e}")
            return None

    async def ingest_eo(self, doc_data: Dict[str, Any]):
        """Chunk and ingest an Executive Order into the OBI knowledge base."""
        logger.info(f"Ingesting doc metadata. Keys: {list(doc_data.keys())}")
        eo_number = doc_data.get("executive_order_number")
        title = doc_data.get("title", f"EO {eo_number}")
        content = doc_data.get("body", doc_data.get("raw_text", ""))
        
        if not content:
            logger.warning(f"No content found for EO {eo_number}")
            return

        # Clean content: remove null bytes and basic HTML wrapping if present
        content = content.replace('\x00', '')
        if "<body><pre>" in content:
            content = content.split("<body><pre>")[1].split("</pre></body>")[0]
        
        async with get_async_session() as session:
            # 1. Create Knowledge Source
            source = KnowledgeSource(
                name=f"EO {eo_number}: {title}",
                source_type="EO",
                version=doc_data.get("publication_date"),
                metadata_json={
                    "document_number": doc_data.get("document_number"),
                    "federal_register_url": doc_data.get("html_url")
                }
            )
            session.add(source)
            await session.flush() # Get the source ID

            # 2. Chunk the content (Simple char-based split for now)
            chunk_size = 2000
            overlap = 200
            chunks = []
            
            for i in range(0, len(content), chunk_size - overlap):
                chunk_text = content[i:i + chunk_size]
                chunk_idx = len(chunks)
                
                new_chunk = KnowledgeChunk(
                    source_id=source.id,
                    content=chunk_text,
                    reference_id=f"EO {eo_number}",
                    title=f"{title} (Part {chunk_idx + 1})",
                    chunk_index=chunk_idx,
                    metadata_json={"char_start": i, "char_end": i + len(chunk_text)}
                )
                chunks.append(new_chunk)
                session.add(new_chunk)

            # 3. Update Status
            stmt = update(EOCrawlStatus).where(EOCrawlStatus.eo_number == str(eo_number)).values(
                status="ingested",
                last_crawl_attempt=datetime.utcnow()
            )
            await session.execute(stmt)
            
            await session.commit()
            logger.info(f"Successfully ingested EO {eo_number} into {len(chunks)} chunks")

    async def close(self):
        await self.client.aclose()

# Example usage
async def main():
    from database import create_database_engines
    create_database_engines()
    
    crawler = EOCrawler()
    try:
        # Step 1: Discover
        results = await crawler.discover_recent_eos(per_page=5)
        
        # Step 2: Fetch and Ingest the first one as a test
        if results:
            first_eo = results[0]
            doc_num = first_eo.get("document_number")
            if doc_num:
                full_data = await crawler.fetch_eo_content(doc_num)
                if full_data:
                    await crawler.ingest_eo(full_data)
                    
    finally:
        await crawler.close()

if __name__ == "__main__":
    import asyncio
    logging.basicConfig(level=logging.INFO)
    asyncio.run(main())

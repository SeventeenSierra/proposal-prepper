# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
"""
Database seeding manager for the Strands service.

This module handles seeding the database with document metadata from
the src/seed-data directory and manages file operations for seeded documents.
"""

import os
import asyncio
import hashlib
from pathlib import Path
from typing import List, Dict, Any, Optional
from datetime import datetime

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from database import get_async_session, get_sync_session, init_database
from db_models import DocumentMetadataDB
from logging_config import get_logger

logger = get_logger(__name__)


class SeedManager:
    """Manages database seeding operations for document metadata."""
    
    def __init__(self, seed_data_path: str = "/app/src/seed-data"):
        """
        Initialize the seed manager.
        
        Args:
            seed_data_path: Path to the seed data directory containing PDFs
        """
        self.seed_data_path = Path(seed_data_path)
        self.expected_documents = self._get_expected_documents()
    
    def _get_expected_documents(self) -> List[Dict[str, Any]]:
        """
        Get list of expected documents from the seed data directory.
        
        Returns:
            List of document metadata dictionaries
        """
        documents = []
        
        # Define the expected 30 PDF files based on the actual files in src/seed-data
        expected_files = [
            # Baecher Joseph proposals
            {
                "document_id": "d1f8a239-27c0-4a38-a333-ea4e82533d1b",
                "filename": "baecher_joseph_2023_d1f8a239-27c0-4a38-a333-ea4e82533d1b_PROPOSAL_1.pdf",
                "original_filename": "baecher_joseph_2023_PROPOSAL_1.pdf",
                "metadata": {"author": "Joseph Baecher", "year": 2023, "funder": "NSF", "program": "Research Grant"}
            },
            {
                "document_id": "c6f0ae22-48ba-4044-a44c-d860f9b8d17f",
                "filename": "baecher_joseph_2024_c6f0ae22-48ba-4044-a44c-d860f9b8d17f_PROPOSAL_1.pdf",
                "original_filename": "baecher_joseph_2024_PROPOSAL_1.pdf",
                "metadata": {"author": "Joseph Baecher", "year": 2024, "funder": "NSF", "program": "Research Grant"}
            },
            # Barker Michelle proposal
            {
                "document_id": "1b5d2213-4c72-4da8-a7b8-bece5b27d280",
                "filename": "barker_michelle_2020_1b5d2213-4c72-4da8-a7b8-bece5b27d280_PROPOSAL_1.pdf",
                "original_filename": "barker_michelle_2020_PROPOSAL_1.pdf",
                "metadata": {
                    "author": "Michelle Barker", 
                    "year": 2020, 
                    "funder": "Wellcome Trust", 
                    "program": "Discretionary",
                    "title": "FAIR for Research Software projects"
                }
            },
            # Bertolet Brittnil proposal
            {
                "document_id": "9d34d838-4fd8-4fbd-b94e-766d1dd82d23",
                "filename": "bertolet_brittnil_2021_9d34d838-4fd8-4fbd-b94e-766d1dd82d23_PROPOSAL_1.pdf",
                "original_filename": "bertolet_brittnil_2021_PROPOSAL_1.pdf",
                "metadata": {"author": "Brittnil Bertolet", "year": 2021, "funder": "NSF", "program": "Research Grant"}
            },
            # Brown Ctitus proposal
            {
                "document_id": "afd7eaff-7bea-45d0-be3e-33188b448cd1",
                "filename": "brown_ctitus_2014_afd7eaff-7bea-45d0-be3e-33188b448cd1_PROPOSAL_1.pdf",
                "original_filename": "brown_ctitus_2014_PROPOSAL_1.pdf",
                "metadata": {"author": "Ctitus Brown", "year": 2014, "funder": "NSF", "program": "Research Grant"}
            },
            # Frazer Ryane proposal
            {
                "document_id": "74f22e94-b364-482e-a2c1-0892b705f0c6",
                "filename": "frazer_ryane_2019_74f22e94-b364-482e-a2c1-0892b705f0c6_PROPOSAL_1.pdf",
                "original_filename": "frazer_ryane_2019_PROPOSAL_1.pdf",
                "metadata": {"author": "Ryane Frazer", "year": 2019, "funder": "NSF", "program": "Research Grant"}
            },
            # Gregory Samantha proposal
            {
                "document_id": "7f2475c4-2fad-498f-beac-e3044183b996",
                "filename": "gregory_samantha_2018_7f2475c4-2fad-498f-beac-e3044183b996_PROPOSAL_1.pdf",
                "original_filename": "gregory_samantha_2018_PROPOSAL_1.pdf",
                "metadata": {"author": "Samantha Gregory", "year": 2018, "funder": "NSF", "program": "Research Grant"}
            },
            # Jensen Jan proposal
            {
                "document_id": "02ecd4f0-ac84-4cf4-8d10-1aed8faa6767",
                "filename": "jensen_jan_2015_02ecd4f0-ac84-4cf4-8d10-1aed8faa6767_PROPOSAL_1.pdf",
                "original_filename": "jensen_jan_2015_PROPOSAL_1.pdf",
                "metadata": {
                    "author": "Jan Jensen", 
                    "year": 2015, 
                    "funder": "Danish National Science Foundation",
                    "program": "Chemical Physics",
                    "title": "High Throughput pKa Prediction Using Semi Empirical Methods"
                }
            },
            # Nell Lucas proposal
            {
                "document_id": "6306262d-9317-4f58-aadc-caf26325862d",
                "filename": "nell_lucas_2022_6306262d-9317-4f58-aadc-caf26325862d_PROPOSAL_1.pdf",
                "original_filename": "nell_lucas_2022_PROPOSAL_1.pdf",
                "metadata": {"author": "Lucas Nell", "year": 2022, "funder": "NSF", "program": "Research Grant"}
            },
            # Polino Alexander proposal
            {
                "document_id": "f990c0ee-e9e0-4f31-b050-9ed3a0b4c2e5",
                "filename": "polino_alexander_2017_f990c0ee-e9e0-4f31-b050-9ed3a0b4c2e5_PROPOSAL_1.pdf",
                "original_filename": "polino_alexander_2017_PROPOSAL_1.pdf",
                "metadata": {"author": "Alexander Polino", "year": 2017, "funder": "NSF", "program": "Research Grant"}
            }
        ]
        
        return expected_files
    
    async def check_seeding_status(self) -> Dict[str, Any]:
        """
        Check the current seeding status of the database.
        
        Returns:
            Dictionary with seeding status information
        """
        try:
            async with get_async_session() as session:
                # Count seeded documents
                result = await session.execute(
                    text("SELECT COUNT(*) FROM document_metadata WHERE upload_status = 'seeded'")
                )
                seeded_count = result.scalar()
                
                # Get total expected count
                expected_count = len(self.expected_documents)
                
                # Check if seeding is complete
                is_complete = seeded_count >= expected_count
                
                return {
                    "seeded_count": seeded_count,
                    "expected_count": expected_count,
                    "is_complete": is_complete,
                    "completion_percentage": (seeded_count / expected_count * 100) if expected_count > 0 else 0
                }
                
        except Exception as e:
            logger.error(f"Error checking seeding status: {e}")
            return {
                "seeded_count": 0,
                "expected_count": len(self.expected_documents),
                "is_complete": False,
                "completion_percentage": 0,
                "error": str(e)
            }
    
    async def seed_database(self, force_reseed: bool = False) -> Dict[str, Any]:
        """
        Seed the database with document metadata.
        
        Args:
            force_reseed: If True, reseed even if already complete
            
        Returns:
            Dictionary with seeding results
        """
        try:
            logger.info("Starting database seeding process...")
            
            # Check current status
            status = await self.check_seeding_status()
            
            if status["is_complete"] and not force_reseed:
                logger.info(f"Database already seeded with {status['seeded_count']} documents")
                return {
                    "success": True,
                    "message": "Database already seeded",
                    "seeded_count": status["seeded_count"],
                    "skipped": True
                }
            
            # Perform seeding
            seeded_count = 0
            errors = []
            
            async with get_async_session() as session:
                for doc_info in self.expected_documents:
                    try:
                        # Check if document already exists
                        existing = await session.execute(
                            text("SELECT id FROM document_metadata WHERE document_id = :doc_id"),
                            {"doc_id": doc_info["document_id"]}
                        )
                        
                        if existing.scalar() and not force_reseed:
                            continue
                        
                        # Calculate file size if file exists
                        file_path = self.seed_data_path / doc_info["filename"]
                        file_size = file_path.stat().st_size if file_path.exists() else 1024000  # Default size
                        
                        # Create document metadata entry
                        doc_metadata = DocumentMetadataDB(
                            document_id=doc_info["document_id"],
                            filename=doc_info["filename"],
                            original_filename=doc_info["original_filename"],
                            file_size=file_size,
                            mime_type="application/pdf",
                            s3_key=f"seed-data/{doc_info['filename']}",
                            upload_status="seeded",
                            text_extracted=False,
                            pdf_metadata=doc_info["metadata"],
                            processing_metadata={
                                "source": "seed_data",
                                "seeded_at": datetime.utcnow().isoformat()
                            }
                        )
                        
                        # Insert or update
                        if force_reseed:
                            await session.merge(doc_metadata)
                        else:
                            session.add(doc_metadata)
                        
                        seeded_count += 1
                        
                    except Exception as e:
                        error_msg = f"Error seeding document {doc_info['document_id']}: {e}"
                        logger.error(error_msg)
                        errors.append(error_msg)
                
                await session.commit()
            
            logger.info(f"Database seeding completed. Seeded {seeded_count} documents")
            
            return {
                "success": True,
                "message": f"Successfully seeded {seeded_count} documents",
                "seeded_count": seeded_count,
                "errors": errors,
                "skipped": False
            }
            
        except Exception as e:
            logger.error(f"Database seeding failed: {e}")
            return {
                "success": False,
                "message": f"Seeding failed: {e}",
                "seeded_count": 0,
                "errors": [str(e)],
                "skipped": False
            }
    
    async def verify_seeded_files(self) -> Dict[str, Any]:
        """
        Verify that all seeded documents have corresponding files.
        
        Returns:
            Dictionary with verification results
        """
        try:
            missing_files = []
            existing_files = []
            
            for doc_info in self.expected_documents:
                file_path = self.seed_data_path / doc_info["filename"]
                
                if file_path.exists():
                    existing_files.append({
                        "document_id": doc_info["document_id"],
                        "filename": doc_info["filename"],
                        "file_size": file_path.stat().st_size
                    })
                else:
                    missing_files.append({
                        "document_id": doc_info["document_id"],
                        "filename": doc_info["filename"],
                        "expected_path": str(file_path)
                    })
            
            return {
                "total_expected": len(self.expected_documents),
                "existing_files": len(existing_files),
                "missing_files": len(missing_files),
                "missing_file_details": missing_files,
                "existing_file_details": existing_files,
                "verification_complete": len(missing_files) == 0
            }
            
        except Exception as e:
            logger.error(f"File verification failed: {e}")
            return {
                "total_expected": len(self.expected_documents),
                "existing_files": 0,
                "missing_files": len(self.expected_documents),
                "verification_complete": False,
                "error": str(e)
            }
    
    async def get_seeded_documents(self) -> List[Dict[str, Any]]:
        """
        Get list of all seeded documents from the database.
        
        Returns:
            List of seeded document dictionaries
        """
        try:
            async with get_async_session() as session:
                result = await session.execute(
                    text("""
                        SELECT document_id, filename, original_filename, file_size, 
                               s3_key, pdf_metadata, uploaded_at
                        FROM document_metadata 
                        WHERE upload_status = 'seeded'
                        ORDER BY uploaded_at DESC
                    """)
                )
                
                documents = []
                for row in result:
                    documents.append({
                        "document_id": row.document_id,
                        "filename": row.filename,
                        "original_filename": row.original_filename,
                        "file_size": row.file_size,
                        "s3_key": row.s3_key,
                        "metadata": row.pdf_metadata or {},
                        "uploaded_at": row.uploaded_at.isoformat() if row.uploaded_at else None
                    })
                
                return documents
                
        except Exception as e:
            logger.error(f"Error retrieving seeded documents: {e}")
            return []


# Global seed manager instance
seed_manager = SeedManager()


async def initialize_seeding():
    """Initialize database seeding on startup."""
    try:
        logger.info("Initializing database seeding...")
        
        # Ensure database is initialized
        await init_database()
        
        # Check seeding status
        status = await seed_manager.check_seeding_status()
        logger.info(f"Seeding status: {status['seeded_count']}/{status['expected_count']} documents")
        
        # Perform seeding if needed
        if not status["is_complete"]:
            result = await seed_manager.seed_database()
            if result["success"]:
                logger.info(f"Database seeding completed: {result['message']}")
            else:
                logger.error(f"Database seeding failed: {result['message']}")
        else:
            logger.info("Database seeding already complete")
        
        # Verify files
        verification = await seed_manager.verify_seeded_files()
        if verification["verification_complete"]:
            logger.info(f"File verification complete: {verification['existing_files']} files found")
        else:
            logger.warning(f"File verification incomplete: {verification['missing_files']} files missing")
        
    except Exception as e:
        logger.error(f"Seeding initialization failed: {e}")


if __name__ == "__main__":
    # Run seeding when script is executed directly
    asyncio.run(initialize_seeding())
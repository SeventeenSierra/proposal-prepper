# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

"""
Intelligence Fusion Service for the Sovereign OBI platform.

Implements Part III of the Citizen's Guide (doc1.md):
- Incumbent Discovery via USAspending.gov
- "Price to Beat" pricing analysis
- Teaming Partner Discovery via SBA DSBS (Placeholder)
"""

import logging
import httpx
from typing import List, Dict, Any, Optional
from datetime import datetime

logger = logging.getLogger(__name__)

class IntelligenceFusion:
    """Service for fusing federal data sources into competitive intelligence."""
    
    USASPENDING_API_BASE = "https://api.usaspending.gov/api/v2"
    
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=30.0)

    async def find_incumbents(self, agency_name: str, naics_code: str, keywords: List[str] = None) -> List[Dict[str, Any]]:
        """
        Identify incumbents for a given agency and NAICS code.
        Corresponds to doc1.md Strategy for Incumbent Discovery (3.1).
        """
        endpoint = f"{self.USASPENDING_API_BASE}/search/spending_by_award/"
        
        payload = {
            "filters": {
                "agencies": [{"type": "awarding", "tier": "toptier", "name": agency_name}],
                "naics_codes": [naics_code],
                "award_type_codes": ["A", "B", "C", "D"], # Contracts: A=R&D, B=Other Service, C=Supplies, D=Equipment
                "time_period": [
                    {"start_date": "2020-10-01", "end_date": datetime.now().strftime("%Y-%m-%d")}
                ]
            },
            "fields": [
                "Award ID", 
                "Recipient Name", 
                "Start Date", 
                "End Date", 
                "Award Amount", 
                "Description",
                "Awarding Agency"
            ],
            "limit": 10,
            "page": 1,
            "sort": "Award Amount",
            "order": "desc"
        }
        
        if keywords:
            payload["filters"]["keywords"] = keywords

        try:
            logger.info(f"Searching USAspending for incumbents in {agency_name} (NAICS: {naics_code})...")
            response = await self.client.post(endpoint, json=payload)
            response.raise_for_status()
            data = response.json()
            
            results = data.get("results", [])
            logger.info(f"Found {len(results)} potential incumbents/contracts")
            return results
            
        except Exception as e:
            logger.error(f"USAspending search failed: {e}")
            return []

    async def get_award_details(self, generated_internal_id: str) -> Dict[str, Any]:
        """Fetch granular details for a specific award."""
        endpoint = f"{self.USASPENDING_API_BASE}/awards/{generated_internal_id}/"
        try:
            response = await self.client.get(endpoint)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"Failed to fetch award details for {generated_internal_id}: {e}")
            return {}

    async def close(self):
        await self.client.aclose()

# Example usage for verification
async def main():
    fusion = IntelligenceFusion()
    try:
        # Test Case: Custom Computer Programming (541511) at DHS
        incumbents = await fusion.find_incumbents(
            agency_name="Department of Homeland Security", 
            naics_code="541511",
            keywords=["cybersecurity"]
        )
        for i, award in enumerate(incumbents[:3]):
            print(f"\nIncumbent {i+1}: {award.get('Recipient Name')}")
            print(f"Award Amount: ${award.get('Award Amount'):,.2f}")
            print(f"End Date: {award.get('End Date')}")
            print(f"Description: {award.get('Description')[:100]}...")
            
    finally:
        await fusion.close()

if __name__ == "__main__":
    import asyncio
    logging.basicConfig(level=logging.INFO)
    asyncio.run(main())

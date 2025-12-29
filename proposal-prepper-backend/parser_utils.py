# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import json
import logging
from typing import Dict, Any, List, Optional
from models import ComplianceIssue, RegulatoryReference, ComplianceResults, ComplianceSummary

logger = logging.getLogger(__name__)

def extract_json_from_text(text: str) -> str:
    """
    Extracts JSON content from a potentially messy string (markdown wrappers, prefix/suffix).
    """
    if not text:
        raise ValueError("Empty response text")
        
    # Handle markdown wrappers
    if "```json" in text:
        try:
            return text.split("```json")[1].split("```")[0].strip()
        except IndexError:
            pass
            
    # Fallback: Find the first '{' and last '}'
    start = text.find('{')
    end = text.rfind('}') + 1
    
    if start == -1 or end == 0:
        raise ValueError("No JSON object found in text")
        
    return text[start:end]

def map_issue_data(issue_data: Dict[str, Any], document_id: str, index: int, prefix: str = "") -> ComplianceIssue:
    """ Maps a raw dict from AI into a ComplianceIssue object. """
    reg_data = issue_data.get("regulation", {})
    regulation = RegulatoryReference(
        regulation=reg_data.get("regulation", "N/A"),
        section=reg_data.get("section", "N/A"),
        title=reg_data.get("title", "N/A"),
        url=reg_data.get("url")
    )
    
    return ComplianceIssue(
        id=f"{prefix}{document_id}_{index}",
        severity=issue_data.get("severity", "info").lower(),
        title=issue_data.get("title", "Issue"),
        description=issue_data.get("description", ""),
        regulation=regulation,
        confidence=issue_data.get("confidence", 0.5),
        remediation=issue_data.get("remediation")
    )

def parse_llm_json(content: str) -> Dict[str, Any]:
    """ Extracts and parses JSON from LLM content string. """
    json_str = extract_json_from_text(content)
    try:
        return json.loads(json_str)
    except json.JSONDecodeError as e:
        logger.error(f"Failed to decode JSON: {e}")
        logger.debug(f"Raw JSON string: {json_str}")
        raise ValueError(f"Invalid JSON format: {str(e)}")

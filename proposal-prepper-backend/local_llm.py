# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

"""
Local LLM integration for AI-powered document analysis.

This module provides the interface to a local LLM (e.g., Ollama) 
for compliance analysis as a cost-effective alternative to AWS Bedrock.
"""

import json
import logging
import httpx
from typing import Dict, Any, Optional, List
from datetime import datetime

from config import get_settings
from models import ComplianceResults, ComplianceIssue, ComplianceSummary, RegulatoryReference

logger = logging.getLogger(__name__)
settings = get_settings()


class LocalLLMClient:
    """Local LLM client (OpenAI-compatible or Ollama) for compliance analysis."""
    
    def __init__(self):
        """Initialize the Local LLM client."""
        self.model = settings.local_llm_model
        self.url = settings.local_llm_url
        self.timeout = 120.0 # Local LLMs can be slow
    
    def is_available(self) -> bool:
        """Check if local LLM service is reachable."""
        try:
            # Try to hit the tags/version endpoint for Ollama
            response = httpx.get(f"{self.url}/api/tags", timeout=2.0)
            return response.status_code == 200
        except Exception as e:
            logger.warning(f"Local LLM availability check failed: {e}")
            return False
    
    async def analyze_document(
        self,
        document_text: str,
        filename: str,
        document_id: str,
        agent_type: str = "far"
    ) -> ComplianceResults:
        """
        Analyze document text using a local LLM via HTTP API.
        """
        try:
            # Create the analysis prompt (using specialized personas if available)
            try:
                from agent_personas import get_persona_prompt
                persona_sop = get_persona_prompt(agent_type)
            except ImportError:
                persona_sop = f"You are a Federal Compliance Analyst specialized in {agent_type.upper()}."
                
            prompt = self._create_compliance_prompt(document_text, filename, persona_sop)
            
            # Prepare payload for Ollama /api/generate
            # ... (omitted same as before)
            payload = {
                "model": self.model,
                "prompt": prompt,
                "stream": False,
                "format": "json",
                "options": {
                    "temperature": 0.1,
                    "num_predict": 4096
                }
            }
            
            logger.info(f"Sending analysis request to Local LLM ({self.model}) at {self.url} using {agent_type} agent")
            
            # ... (rest of the content)
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.url}/api/generate",
                    json=payload,
                    timeout=self.timeout
                )
                response.raise_for_status()
                
                result = response.json()
                ai_response = result.get("response", "")
            
            logger.info(f"Received {agent_type} analysis response from Local LLM for document {document_id}")
            
            # Parse the structured response
            results = self._parse_ai_response(ai_response, document_id)
            
            return results
            
        except httpx.HTTPError as e:
            logger.error(f"Local LLM HTTP error for document {document_id}: {e}")
            raise Exception(f"Local AI service error: {str(e)}")
            
        except Exception as e:
            logger.error(f"Unexpected error during local analysis for document {document_id}: {e}")
            raise Exception(f"Local Analysis failed: {str(e)}")

    def _create_compliance_prompt(self, document_text: str, filename: str, persona_sop: str = "") -> str:
        """
        Create a structured prompt for compliance analysis using specialized SOPs.
        """
        prompt = f"""{persona_sop}

## Input
Document: {filename}
Document Text:
{document_text[:6000]}

## Output Instructions
Format your response EXACTLY as this JSON:
{{
    "overall_status": "pass|fail|warning",
    "overall_score": <0-100>,
    "issues": [
        {{
            "severity": "critical|warning|info",
            "title": "string",
            "description": "string",
            "regulation": {{
                "regulation": "string",
                "section": "string",
                "title": "string"
            }},
            "confidence": <0-1>,
            "remediation": "string"
        }}
    ],
    "summary": {{
        "total_issues": <number>,
        "critical_count": <number>,
        "warning_count": <number>,
        "info_count": <number>
    }}
}}
"""
        return prompt

    def _parse_ai_response(self, ai_response: str, document_id: str) -> ComplianceResults:
        """
        Parse the AI response into structured ComplianceResults.
        """
        try:
            # Extract JSON from the response
            json_start = ai_response.find('{')
            json_end = ai_response.rfind('}') + 1
            json_text = ai_response[json_start:json_end]
            parsed_data = json.loads(json_text)
            
            # Use same logic as bedrock_client to convert to models
            from bedrock_utils import convert_to_compliance_results # Hypothetical or just copy logic
            # For now, let's just implement the mapping here to keep it self-contained
            
            issues = []
            for issue_data in parsed_data.get('issues', []):
                reg_data = issue_data.get('regulation', {})
                regulation = RegulatoryReference(
                    regulation=reg_data.get('regulation', 'FAR'),
                    section=reg_data.get('section', 'unknown'),
                    title=reg_data.get('title', 'Unknown Requirement'),
                    url=reg_data.get('url')
                )
                
                issue = ComplianceIssue(
                    id=f"{document_id}_{len(issues)}",
                    severity=issue_data.get('severity', 'warning'),
                    title=issue_data.get('title', 'Compliance Finding'),
                    description=issue_data.get('description', 'No description provided'),
                    regulation=regulation,
                    confidence=issue_data.get('confidence', 0.5),
                    remediation=issue_data.get('remediation')
                )
                issues.append(issue)
            
            summary_data = parsed_data.get('summary', {})
            summary = ComplianceSummary(
                total_issues=len(issues),
                critical_count=summary_data.get('critical_count', len([i for i in issues if i.severity == 'critical'])),
                warning_count=summary_data.get('warning_count', len([i for i in issues if i.severity == 'warning'])),
                info_count=summary_data.get('info_count', len([i for i in issues if i.severity == 'info'])),
                overall_score=parsed_data.get('overall_score', 50.0)
            )
            
            return ComplianceResults(
                id=f"local_{document_id}_{int(datetime.utcnow().timestamp())}",
                session_id="", 
                document_id=document_id,
                status=parsed_data.get('overall_status', 'warning'),
                issues=issues,
                summary=summary,
                generated_at=datetime.utcnow(),
                ai_model=self.model,
                processing_time=0.0,
                metadata={
                    "ai_provider": "local_llm",
                    "model_id": self.model,
                    "url": self.url
                }
            )
        except Exception as e:
            logger.error(f"Failed to parse local AI response: {e}")
            raise Exception("Local AI response parsing failed")

# Global local client instance
_local_client = None

def get_local_llm_client() -> LocalLLMClient:
    """Get the global local LLM client instance."""
    global _local_client
    if _local_client is None:
        _local_client = LocalLLMClient()
    return _local_client

# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import random
from datetime import datetime
from typing import Dict, Any, Optional, List
from models import ComplianceResults, ComplianceIssue, ComplianceSummary, RegulatoryReference
from parser_utils import parse_llm_json, map_issue_data
from analysis_provider import AnalysisProvider, AnalysisRouter, ProviderType
from logging_config import get_logger
from config import get_settings

logger = get_logger(__name__)
settings = get_settings()

class LocalAnalysisProvider(AnalysisProvider):
    """
    Local analysis provider. 
    Currently provides simulated analysis, but is designed to be 
    integrated with LiteLLM for real local AI analysis.
    """
    
    def __init__(self):
        self.mock_issues_templates = self._initialize_mock_templates()
        self._graph = self._build_analysis_graph()

    def is_available(self) -> bool:
        """Local mode is always available."""
        return True

    def get_name(self) -> str:
        """Get the human-readable name of the provider."""
        return "Local Mode"

    async def analyze_document(
        self, 
        document_text: str, 
        filename: str, 
        document_id: str,
        **kwargs
    ) -> ComplianceResults:
        """Analyze a document using local AI for 'Air Spec' mode."""
        logger.info(f"Using LocalAnalysisProvider for document {document_id}")
        session_id = kwargs.get("session_id", "local_session")
        
        # 1. Thermal Guard: Check if we need to 'Chill'
        if settings.air_spec_mode:
            await self._thermal_guard()

        # 2. Try Local AI Analysis (LiteLLM)
        if settings.use_local_llm:
            try:
                return await self._run_ai_analysis(document_text, filename, document_id, session_id)
            except Exception as e:
                logger.warning(f"Local AI analysis failed, checking fallback: {e}")
                if not settings.use_simulated_data:
                    raise
        
        # 3. Fallback to Simulation
        logger.info("Falling back to consolidated simulation logic")
        return await self._generate_simulated_analysis(
            document_text=document_text,
            filename=filename,
            document_id=document_id,
            session_id=session_id
        )

    async def _thermal_guard(self):
        """Monitor CPU usage and pause if it exceeds threshold (Air Spec)."""
        try:
            import psutil
            import asyncio
            
            cpu_usage = psutil.cpu_percent(interval=0.1)
            if cpu_usage > settings.cpu_usage_threshold:
                logger.warning(f"CPU usage at {cpu_usage}%, cooling down for {settings.batch_cool_down_seconds}s...")
                await asyncio.sleep(settings.batch_cool_down_seconds)
        except ImportError:
            logger.warning("psutil not found, thermal guard skipped")

    async def _run_ai_analysis(self, document_text: str, filename: str, document_id: str, session_id: str) -> ComplianceResults:
        """Execute real AI analysis using LiteLLM (Ollama/Llama3.2)."""
        if self._graph:
            try:
                initial_state = {
                    "document_text": document_text,
                    "filename": filename,
                    "document_id": document_id,
                    "session_id": session_id,
                    "findings": [],
                    "status": "starting"
                }
                
                logger.info(f"Invoking multi-agent LangGraph for session {session_id}...")
                final_state = await self._graph.ainvoke(initial_state)
                
                # Reconstruct ComplianceResults from graph findings
                return self._process_graph_findings(final_state, document_id, session_id)
            except Exception as e:
                logger.error(f"LangGraph analysis failed: {e}")
                if not settings.use_simulated_data:
                    raise
        
        # Fallback to direct single-prompt AI if graph disabled or failed
        from agent_personas import get_unified_compliance_prompt
        prompt = get_unified_compliance_prompt(document_text=document_text[:8000], filename=filename)
        
        logger.info(f"Calling local LLM ({settings.local_llm_model}) via direct LiteLLM fallback...")
        
        response = await litellm.acompletion(
            model=f"ollama/{settings.local_llm_model}",
            messages=[{"role": "user", "content": prompt}],
            api_base=settings.local_llm_url,
            temperature=0.1,
            response_format={"type": "json_object"}
        )
        
        content = response.choices[0].message.content
        logger.debug(f"Local AI direct response: {content}")
        
        return self._parse_local_response(content, document_id, session_id)

    def _process_graph_findings(self, state: Dict[str, Any], document_id: str, session_id: str) -> ComplianceResults:
        """Convert accumulated graph findings into ComplianceResults."""
        issues = []
        critical_count = 0
        warning_count = 0
        info_count = 0
        
        for i, issue_data in enumerate(state.get("findings", [])):
            reg_data = issue_data.get("regulation", {})
            regulation = RegulatoryReference(
                regulation=reg_data.get("regulation", "N/A"),
                section=reg_data.get("section", "N/A"),
                title=reg_data.get("title", "N/A"),
                url=reg_data.get("url")
            )
            
            severity = issue_data.get("severity", "info").lower()
            if severity == "critical": critical_count += 1
            elif severity == "warning": warning_count += 1
            else: info_count += 1
            
            issues.append(ComplianceIssue(
                id=f"graph_{document_id}_{i}",
                severity=severity,
                title=issue_data.get("title", "Issue"),
                description=issue_data.get("description", ""),
                regulation=regulation,
                confidence=issue_data.get("confidence", 0.5),
                remediation=issue_data.get("remediation")
            ))
            
        summary = ComplianceSummary(
            total_issues=len(issues),
            critical_count=critical_count,
            warning_count=warning_count,
            info_count=info_count,
            overall_score=80.0  # Simplified calculation for now
        )
        
        return ComplianceResults(
            id=f"graph_{document_id}_{int(datetime.utcnow().timestamp())}",
            session_id=session_id,
            document_id=document_id,
            status="warning" if critical_count > 0 or warning_count > 0 else "pass",
            issues=issues,
            summary=summary,
            generated_at=datetime.utcnow(),
            ai_model=settings.local_llm_model,
            processing_time=0.0,
            metadata={
                "analysis_type": "langgraph_multi_agent",
                "agents": ["far", "eo", "technical"],
                "air_spec": settings.air_spec_mode
            }
        )

    def _build_analysis_graph(self):
        """Build the specialized multi-agent LangGraph for local analysis."""
        try:
            from langgraph.graph import StateGraph, END
            from typing import TypedDict, List, Annotated
            import operator
            
            class AgentState(TypedDict):
                document_text: str
                filename: str
                document_id: str
                session_id: str
                findings: Annotated[List[Dict[str, Any]], operator.add]
                status: str

            async def far_agent_node(state: AgentState):
                logger.info(">>> [DEBUG] Entering FAR Agent Node... <<<")
                # In a real impl, we'd slice document_text or use RAG
                results = await self._call_specialized_agent("far", state["document_text"], state["filename"])
                return {"findings": results.get("issues", []), "status": "far_complete"}

            async def eo_agent_node(state: AgentState):
                logger.info(">>> [DEBUG] Entering EO Agent Node... <<<")
                results = await self._call_specialized_agent("eo", state["document_text"], state["filename"])
                return {"findings": results.get("issues", []), "status": "eo_complete"}

            async def technical_agent_node(state: AgentState):
                logger.info(">>> [DEBUG] Entering Technical Agent Node... <<<")
                results = await self._call_specialized_agent("technical", state["document_text"], state["filename"])
                return {"findings": results.get("issues", []), "status": "technical_complete"}

            workflow = StateGraph(AgentState)
            
            workflow.add_node("far_agent", far_agent_node)
            workflow.add_node("eo_agent", eo_agent_node)
            workflow.add_node("technical_agent", technical_agent_node)
            
            workflow.set_entry_point("far_agent")
            workflow.add_edge("far_agent", "eo_agent")
            workflow.add_edge("eo_agent", "technical_agent")
            workflow.add_edge("technical_agent", END)
            
            return workflow.compile()
        except ImportError:
            logger.warning("langgraph not found, agent graph will be disabled")
            return None

    async def _call_specialized_agent(self, agent_type: str, document_text: str, filename: str) -> Dict[str, Any]:
        """Helper to call LiteLLM with a specific agent persona."""
        import litellm
        import json
        from agent_personas import get_persona_prompt, get_unified_compliance_prompt
        
        persona_sop = get_persona_prompt(agent_type)
        # We use a condensed version of the unified prompt for individual nodes
        prompt = f"""{persona_sop}
        
Analyze the following document for compliance based on your specialty.
Document: {filename}
Content: {document_text[:4000]}

IMPORTANT: Return VALID JSON only.
JSON Format:
{{
    "issues": [
        {{
            "severity": "critical|warning|info",
            "title": "string",
            "description": "string",
            "regulation": {{"regulation": "FAR|EO|Technical", "section": "string", "title": "string"}},
            "confidence": 0-1
        }}
    ]
}}
"""
        try:
            response = await litellm.acompletion(
                model=f"ollama/{settings.local_llm_model}",
                messages=[{"role": "user", "content": prompt}],
                api_base=settings.local_llm_url,
                temperature=0.1,
                response_format={"type": "json_object"}
            )
            content = response.choices[0].message.content
            
            data = parse_llm_json(content)
            return data
        except Exception as e:
            logger.error(f"Agent {agent_type} failed: {e}")
            return {"issues": []}

    def _parse_local_response(self, content: str, document_id: str, session_id: str) -> ComplianceResults:
        """Parse structured JSON from local LLM."""
        import json
        from datetime import datetime
        
        try:
            data = parse_llm_json(content)
            
            issues = []
            critical_count = 0
            warning_count = 0
            info_count = 0
            
            for i, issue_data in enumerate(data.get("issues", [])):
                issue = map_issue_data(issue_data, document_id, i, prefix="local_")
                issues.append(issue)
                
                severity = issue.severity.lower()
                if severity == "critical": critical_count += 1
                elif severity == "warning": warning_count += 1
                else: info_count += 1
            
            summary = ComplianceSummary(
                total_issues=len(issues),
                critical_count=critical_count,
                warning_count=warning_count,
                info_count=info_count,
                overall_score=data.get("overall_score", 0.0)
            )
            
            return ComplianceResults(
                id=f"local_{document_id}_{int(datetime.utcnow().timestamp())}",
                session_id=session_id,
                document_id=document_id,
                status=data.get("overall_status", "warning"),
                issues=issues,
                summary=summary,
                generated_at=datetime.utcnow(),
                ai_model=settings.local_llm_model,
                processing_time=0.0, # Set by main.py
                metadata={
                    "analysis_type": "local_ai",
                    "model": settings.local_llm_model,
                    "air_spec": settings.air_spec_mode
                }
            )
        except Exception as e:
            logger.error(f"Failed to parse local AI response: {e}")
            raise ValueError(f"Invalid JSON from Local LLM: {str(e)}")

    async def _generate_simulated_analysis(
        self,
        document_text: str,
        filename: str,
        document_id: str,
        session_id: str
    ) -> ComplianceResults:
        """Consolidated simulation logic (formerly in fallback_analysis.py)."""
        text_length = len(document_text)
        word_count = len(document_text.split())
        num_issues = min(max(2, word_count // 1000), 6)
        
        selected_templates = random.sample(self.mock_issues_templates, num_issues)
        
        issues = []
        critical_count = 0
        warning_count = 0
        info_count = 0
        
        for i, template in enumerate(selected_templates):
            regulation = RegulatoryReference(
                regulation=template["regulation"]["regulation"],
                section=template["regulation"]["section"],
                title=template["regulation"]["title"],
                url=template["regulation"]["url"]
            )
            
            issue = ComplianceIssue(
                id=f"local_{document_id}_{i}",
                severity=template["severity"],
                title=template["title"],
                description=template["description"],
                regulation=regulation,
                confidence=template["confidence"],
                remediation=template.get("remediation")
            )
            issues.append(issue)
            
            if template["severity"] == "critical": critical_count += 1
            elif template["severity"] == "warning": warning_count += 1
            else: info_count += 1
        
        base_score = 85.0
        score_penalty = (critical_count * 15) + (warning_count * 8) + (info_count * 2)
        overall_score = max(20.0, base_score - score_penalty)
        
        if critical_count > 0 or overall_score < 60: status = "fail"
        elif warning_count > 0 or overall_score < 80: status = "warning"
        else: status = "pass"
        
        summary = ComplianceSummary(
            total_issues=len(issues),
            critical_count=critical_count,
            warning_count=warning_count,
            info_count=info_count,
            overall_score=overall_score
        )
        
        return ComplianceResults(
            id=f"local_{document_id}_{int(datetime.utcnow().timestamp())}",
            session_id=session_id,
            document_id=document_id,
            status=status,
            issues=issues,
            summary=summary,
            generated_at=datetime.utcnow(),
            ai_model="local-simulated-provider",
            processing_time=random.uniform(1.0, 4.0),
            metadata={
                "analysis_type": "local_simulated",
                "document_filename": filename,
                "local_mode": True
            }
        )

    def _initialize_mock_templates(self) -> List[Dict[str, Any]]:
        """Templates for generating realistic local compliance findings."""
        return [
            {
                "severity": "warning",
                "title": "Missing Cost Breakdown Section",
                "description": "The proposal lacks a detailed cost breakdown as required by FAR 15.408.",
                "regulation": {
                    "regulation": "FAR", "section": "15.408", 
                    "title": "Solicitation provisions and contract clauses",
                    "url": "https://www.acquisition.gov/far/15.408"
                },
                "confidence": 0.85,
                "remediation": "Add a detailed cost breakdown section."
            },
            {
                "severity": "critical",
                "title": "Missing Small Business Subcontracting Plan",
                "description": "Proposals over $750,000 must include a small business subcontracting plan per FAR 19.702.",
                "regulation": {
                    "regulation": "FAR", "section": "19.702",
                    "title": "Statutory requirements for subcontracting plans",
                    "url": "https://www.acquisition.gov/far/19.702"
                },
                "confidence": 0.92,
                "remediation": "Include a comprehensive small business subcontracting plan."
            },
            {
                "severity": "info",
                "title": "Technical Approach Well Documented",
                "description": "The technical approach section meets DFARS requirements.",
                "regulation": {
                    "regulation": "DFARS", "section": "252.235-7010",
                    "title": "Technical Data - General",
                    "url": "https://www.acquisition.gov/dfars/252.235-7010-technical-data-general"
                },
                "confidence": 0.88
            },
            {
                "severity": "warning",
                "title": "Incomplete Past Performance Documentation",
                "description": "Past performance section lacks sufficient detail required by FAR 15.305(a)(2)(i).",
                "regulation": {
                    "regulation": "FAR", "section": "15.305",
                    "title": "Proposal evaluation", "url": "https://www.acquisition.gov/far/15.305"
                },
                "confidence": 0.78,
                "remediation": "Provide detailed past performance information."
            },
            {
                "severity": "critical",
                "title": "Missing Security Clearance Requirements",
                "description": "The proposal does not address requirements specified in DFARS 252.204-7012.",
                "regulation": {
                    "regulation": "DFARS", "section": "252.204-7012",
                    "title": "Safeguarding Covered Defense Information",
                    "url": "https://www.acquisition.gov/dfars/252.204-7012"
                },
                "confidence": 0.95,
                "remediation": "Include detailed security clearance plan."
            }
        ]

# Register the provider
AnalysisRouter.register_provider(ProviderType.LOCAL, LocalAnalysisProvider)

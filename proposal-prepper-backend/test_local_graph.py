# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import pytest
import asyncio
from unittest.mock import MagicMock, patch, AsyncMock
from local_provider import LocalAnalysisProvider
from models import ComplianceResults

@pytest.mark.asyncio
async def test_local_graph_orchestration():
    """Verify that the LangGraph in LocalAnalysisProvider correctly sequences agents."""
    provider = LocalAnalysisProvider()
    
    # Mock specialized agent calls to return different findings
    async def mock_call(agent_type, text, filename):
        if agent_type == "far":
            return {"issues": [{"title": "FAR Issue", "severity": "critical", "regulation": {"regulation": "FAR", "section": "1.1", "title": "T"}}]}
        if agent_type == "eo":
            return {"issues": [{"title": "EO Issue", "severity": "warning", "regulation": {"regulation": "EO", "section": "2.2", "title": "T"}}]}
        if agent_type == "technical":
            return {"issues": [{"title": "Tech Issue", "severity": "info", "regulation": {"regulation": "Technical", "section": "3.3", "title": "T"}}]}
        return {"issues": []}

    with patch.object(provider, '_call_specialized_agent', side_effect=mock_call):
        # We need to ensure settings allow graph usage if applicable
        # but the graph is initialized in __init__
        
        results = await provider._run_ai_analysis(
            document_text="Test content",
            filename="test.pdf",
            document_id="doc123",
            session_id="sess123"
        )
        
        assert isinstance(results, ComplianceResults)
        assert results.metadata["analysis_type"] == "langgraph_multi_agent"
        assert len(results.issues) == 3
        
        titles = [issue.title for issue in results.issues]
        assert "FAR Issue" in titles
        assert "EO Issue" in titles
        assert "Tech Issue" in titles
        
        assert results.summary.critical_count == 1
        assert results.summary.warning_count == 1
        assert results.summary.info_count == 1

if __name__ == "__main__":
    asyncio.run(test_local_graph_orchestration())

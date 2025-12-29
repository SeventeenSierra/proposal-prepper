# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import pytest
import json
from local_provider import LocalAnalysisProvider
from models import ComplianceResults

from parser_utils import extract_json_from_text, map_issue_data, parse_llm_json

class TestParserRobustness:
    """Tests the robustness of LLM response parsing logic."""
    
    def test_extract_pure_json(self):
        """Test extraction of clean JSON string."""
        content = '{"issues": [], "overall_status": "pass", "overall_score": 100}'
        extracted = extract_json_from_text(content)
        assert extracted == content

    def test_extract_markdown_wrapped_json(self):
        """Test extraction of JSON wrapped in markdown backticks."""
        content = '```json\n{"issues": []}\n```'
        extracted = extract_json_from_text(content)
        assert extracted == '{"issues": []}'

    def test_extract_json_with_text_prefix_suffix(self):
        """Test extraction of JSON embedded in other text."""
        content = 'The results are: {"issues": []} - enjoy!'
        extracted = extract_json_from_text(content)
        assert extracted == '{"issues": []}'

    def test_parse_malformed_json_raises_error(self):
        """Test that malformed JSON raises a ValueError."""
        content = '{"issues": ['
        with pytest.raises(ValueError):
            parse_llm_json(content)

    def test_map_issue_data_defaults(self):
        """Test that mapping raw dict into model uses defaults."""
        issue_data = {"title": "Test Issue"}
        issue = map_issue_data(issue_data, "doc123", 0)
        assert issue.severity == "info"
        assert issue.confidence == 0.5
        assert issue.id == "doc123_0"

if __name__ == "__main__":
    pytest.main([__file__, "-v"])

# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import pytest
import io
from pathlib import Path
from pdf_processor import PDFProcessor

def get_seed_pdf_path():
    """Utility to find the first available seed PDF."""
    seed_dir = Path("../proposal-prepper-web/src/seed-data")
    pdfs = list(seed_dir.glob("*.pdf"))
    if not pdfs:
        pytest.skip("No seed PDFs found for functional testing")
    return pdfs[0]

class TestPDFProcessorFunctional:
    """Functional tests for PDFProcessor using real document data."""
    
    @pytest.fixture
    def processor(self):
        return PDFProcessor()

    def test_extract_text_from_real_pdf(self, processor):
        """Verify that basic extraction works on a real seed PDF."""
        pdf_path = get_seed_pdf_path()
        with open(pdf_path, "rb") as f:
            pdf_bytes = f.read()
            
        text, metadata = processor._extract_text_from_bytes(pdf_bytes)
        
        # Verify basic results
        assert len(text) > 500  # Expect significant text
        assert metadata["extraction_successful"] is True
        assert metadata["page_count"] > 0
        assert metadata["text_length"] == len(text)
        
        # Verify page markers
        # The first page should have a marker if extraction succeeded
        assert "--- Page 1 ---" in text
        
        # Verify metadata extraction (may be empty but should be a dict)
        assert isinstance(metadata, dict)
        assert "is_encrypted" in metadata
        assert metadata["is_encrypted"] is False

    def test_clean_extracted_text_logic(self, processor):
        """Verify text cleaning logic (multiple spaces, newlines)."""
        raw_text = "Page 1\n\n\nSome    indented    text.\n\n\n\n--- Page 2 ---\nMore text."
        cleaned = processor._clean_extracted_text(raw_text)
        
        assert "Some indented text." in cleaned
        assert "\n\n\n" not in cleaned  # Should handle triple newlines
        assert "    " not in cleaned  # Should collapse multiple spaces (except newlines)

    def test_page_marker_presence(self, processor):
        """Verify that multiple pages result in multiple markers."""
        # Find a PDF that likely has >1 page
        seed_dir = Path("../proposal-prepper-web/src/seed-data")
        # Try to find 'baecher_joseph_2023' which we know is a multi-page proposal
        pdf_path = seed_dir / "baecher_joseph_2023_d1f8a239-27c0-4a38-a333-ea4e82533d1b_PROPOSAL_1.pdf"
        
        if not pdf_path.exists():
            # Fallback to any PDF
            pdf_path = get_seed_pdf_path()
            
        with open(pdf_path, "rb") as f:
            pdf_bytes = f.read()
            
        text, metadata = processor._extract_text_from_bytes(pdf_bytes)
        
        if metadata["page_count"] > 1:
            assert "--- Page 1 ---" in text
            assert "--- Page 2 ---" in text
        else:
            assert "--- Page 1 ---" in text

if __name__ == "__main__":
    pytest.main([__file__, "-v"])

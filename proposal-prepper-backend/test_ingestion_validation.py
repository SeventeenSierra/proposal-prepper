# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import pytest
from unittest.mock import MagicMock, patch, AsyncMock
from main import process_analysis
from db_models import AnalysisStatus

@pytest.mark.asyncio
class TestIngestionValidation:
    """Tests for Step 1: Ingestion & Validation logic in main.py."""

    async def test_step_1_success(self):
        """Test that process_analysis proceeds when metadata and S3 file exist."""
        session_id = "sess_123"
        session_data = {
            "id": session_id,
            "document_id": "doc_456",
            "s3_key": "uploads/doc_456/test.pdf",
            "filename": "test.pdf",
            "status": "queued",
            "progress": 0.0
        }

        # Mock database operations
        with patch("main.get_analysis_session", return_value=session_data), \
             patch("main.get_pdf_processor") as mock_get_processor, \
             patch("main.DocumentMetadataOperations.get_document_metadata", return_value={"id": "meta_1"}), \
             patch("main.update_analysis_progress", new_callable=AsyncMock) as mock_update, \
             patch("main.manager.broadcast", new_callable=AsyncMock) as mock_broadcast, \
             patch("main.router.get_provider") as mock_get_provider:
            
            # Mock PDF Processor
            mock_processor = MagicMock()
            mock_processor.check_file_exists_in_s3.return_value = True
            mock_processor.extract_text_from_s3 = AsyncMock(return_value=("Extracted Text", {}))
            mock_get_processor.return_value = mock_processor
            
            # Mock Provider
            mock_provider = AsyncMock()
            mock_provider.analyze_document.return_value = MagicMock(issues=[], summary=MagicMock(), id="res_1", metadata={})
            mock_get_provider.return_value = mock_provider

            # Execute Step 1 (+ Step 2 briefly before failing on result storage mock if not careful, 
            # but we just want to see Step 1 pass)
            try:
                await process_analysis(session_id)
            except Exception:
                pass # We don't care about subsequent steps failing for this test

            # Verify Step 1: Validation progress was called
            # It should have called update_analysis_progress with progress=5.0
            mock_update.assert_any_call(
                session_id=session_id,
                status=AnalysisStatus.QUEUED,
                progress=5.0,
                current_step="Validating document ingestion and storage reachability"
            )

    async def test_step_1_missing_metadata(self):
        """Test that Step 1 fails when metadata is missing."""
        session_id = "sess_123"
        session_data = {
            "document_id": "doc_missing",
            "s3_key": "any",
            "filename": "test.pdf"
        }

        with patch("main.get_analysis_session", return_value=session_data), \
             patch("main.DocumentMetadataOperations.get_document_metadata", return_value=None), \
             patch("main.update_analysis_progress", new_callable=AsyncMock) as mock_update:
            
            await process_analysis(session_id)
            
            # Should have updated status to FAILED
            mock_update.assert_any_call(
                session_id=session_id,
                status=AnalysisStatus.FAILED,
                progress=0.0,
                current_step="Analysis failed",
                error_message="Document metadata record missing for doc_missing"
            )

    async def test_step_1_missing_s3_file(self):
        """Test that Step 1 fails when S3 file is missing."""
        session_id = "sess_123"
        session_data = {
            "document_id": "doc_456",
            "s3_key": "missing/file.pdf",
            "filename": "test.pdf"
        }

        with patch("main.get_analysis_session", return_value=session_data), \
             patch("main.DocumentMetadataOperations.get_document_metadata", return_value={"id": "meta_1"}), \
             patch("main.get_pdf_processor") as mock_get_processor, \
             patch("main.update_analysis_progress", new_callable=AsyncMock) as mock_update:
            
            mock_processor = MagicMock()
            mock_processor.check_file_exists_in_s3.return_value = False
            mock_get_processor.return_value = mock_processor
            
            await process_analysis(session_id)
            
            # Should have updated status to FAILED
            mock_update.assert_any_call(
                session_id=session_id,
                status=AnalysisStatus.FAILED,
                progress=0.0,
                current_step="Analysis failed",
                error_message="Document file missing in storage: missing/file.pdf"
            )

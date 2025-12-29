# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

"""
Strands Python service for AI-powered compliance analysis.

This FastAPI service provides document analysis capabilities using AWS Bedrock
for compliance checking against FAR/DFARS regulations.
"""

import os
import uuid
from contextlib import asynccontextmanager
from typing import Dict, Any
from datetime import datetime, timedelta

from fastapi import FastAPI, HTTPException, Path, BackgroundTasks, UploadFile, File, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

from analysis_provider import AnalysisRouter
import aws_bedrock
import local_provider

# Global Analysis Router
router = AnalysisRouter()

from config import get_settings
from logging_config import setup_logging, get_logger
from models import (
    AnalysisStartRequest,
    AnalysisStartResponse,
    AnalysisStatusResponse,
    AnalysisResultsResponse,
    ComplianceResults,
    ComplianceIssue,
    ComplianceSummary,
    RegulatoryReference,
    ErrorResponse,
    ErrorResponse,
    HealthCheckResponse,
    UploadSessionResponse,
    SimulateUploadRequest
)
from database import init_database, check_database_health, close_database_connections
from db_operations import (
    create_analysis_session,
    get_analysis_session,
    update_analysis_progress,
    store_compliance_results,
    store_compliance_results,
    get_compliance_results,
    DocumentMetadataOperations
)
from db_models import AnalysisStatus
from concurrent_processor import (
    get_processor, 
    processor_lifespan,
    submit_analysis_task,
    get_processing_status,
    cancel_analysis_task
)

# Initialize configuration and logging
settings = get_settings()
setup_logging()
from analysis_provider import AnalysisRouter
import aws_bedrock
import local_provider
logger = get_logger(__name__)


# WebSocket Connection Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"WebSocket client connected. Total: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            logger.info(f"WebSocket client disconnected. Total: {len(self.active_connections)}")

    async def broadcast(self, message: Dict[str, Any]):
        # Iterate over a copy to avoid modification during iteration issues, though simple append/remove is usually safe
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception as e:
                logger.warning(f"Failed to send WebSocket message: {e}")

manager = ConnectionManager()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager for startup and shutdown events."""
    mode_str = "AIR SPEC (LOCAL)" if settings.analysis_mode == "local" else "AWS BEDROCK"
    logger.info(f"Starting Strands service in {mode_str} mode...")
    
    # Startup logic
    try:
        # Validate environment configuration
        validate_environment()
        
        if settings.analysis_mode == "local":
            logger.info(f">>> AIR SPEC ACTIVATED: Using {settings.local_llm_model} @ {settings.local_llm_url} <<<")
            if settings.air_spec_mode:
                logger.info(f">>> THERMAL GUARD: On (Threshold: {settings.cpu_usage_threshold}%) <<<")
        
        logger.info("Environment validation completed")
        
        # Initialize database
        try:
            await init_database()
            logger.info("Database initialization completed")
        except Exception as e:
            logger.error(f"Database initialization failed: {e}")
            raise
        
        # Initialize database seeding
        # Seeding disabled for clean slate as per user request
        # try:
        #     from seed_manager import initialize_seeding
        #     await initialize_seeding()
        #     logger.info("Database seeding initialization completed")
        # except Exception as e:
        #     logger.error(f"Database seeding initialization failed: {e}")
        #     # Don't fail startup - seeding is not critical for service operation
        #     logger.warning("Continuing without seeding initialization")
        
        # Initialize AWS Bedrock and PDF processing services
        try:
            from aws_bedrock import get_bedrock_client
            from local_llm import get_local_llm_client
            from pdf_processor import get_pdf_processor
            # Initialize services
            bedrock_client = get_bedrock_client()
            local_llm_client = get_local_llm_client()
            pdf_processor = get_pdf_processor()
            
            # Log service availability
            if settings.use_local_llm:
                if local_llm_client.is_available():
                    logger.info(f"Local LLM client ({settings.local_llm_model}) initialized and available at {settings.local_llm_url}")
                else:
                    logger.warning(f"Local LLM client ({settings.local_llm_model}) not available at {settings.local_llm_url} - using fallback")
            elif bedrock_client.is_available():
                logger.info("AWS Bedrock client initialized and available")
            else:
                logger.warning("AWS Bedrock client not available")
            
            if pdf_processor._s3_client:
                logger.info("PDF processor with S3 client initialized")
            else:
                logger.warning("PDF processor S3 client not available")
            
            logger.info("All analysis services initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize analysis services: {e}")
            # Don't fail startup - services can still work with fallback
            logger.warning("Continuing with limited functionality")
        
        # Initialize concurrent processor
        try:
            async with processor_lifespan() as processor:
                logger.info("Concurrent processor initialized successfully")
                yield
        except Exception as e:
            logger.error(f"Failed to initialize concurrent processor: {e}")
            raise
        
    except Exception as e:
        logger.error(f"Failed to start Strands service: {e}")
        raise
    finally:
        # Shutdown logic
        logger.info("Shutting down Strands service...")
        try:
            await close_database_connections()
        except Exception as e:
            logger.error(f"Error during shutdown: {e}")


async def process_analysis(session_id: str) -> None:
    """
    Background task to process document analysis using AWS Bedrock AI.
    
    This function orchestrates the complete analysis pipeline:
    1. Extract text from PDF document stored in S3/MinIO
    2. Analyze document using AWS Bedrock AI services
    3. Fall back to mock analysis if AI services are unavailable
    4. Store results and update session status
    
    Args:
        session_id: Unique identifier for the analysis session
    """
    from pdf_processor import get_pdf_processor
    from aws_bedrock import get_bedrock_client
    from analysis_provider import AnalysisRouter
    import asyncio
    import time
    
    start_time = time.time()
    
    # Get session data from database
    session_data = await get_analysis_session(session_id)
    if not session_data:
        logger.error(f"Analysis session {session_id} not found in database")
        return
    
    try:
        logger.info(f"Starting analysis process for session: {session_id[:12]}...")
        
        # Step 2: Extraction
        logger.debug(f"Step 2: Extraction for session {session_id}")
        await update_analysis_progress(
            session_id=session_id,
            status=AnalysisStatus.EXTRACTING,
            progress=15.0,
            current_step="Extracting text from PDF document"
        )
        
        # Broadcast progress
        await manager.broadcast({
            "type": "analysis_progress",
            "sessionId": session_id,
            "data": {
                "status": "extracting",
                "progress": 15.0,
                "currentStep": "Extraction"
            }
        })

        
        pdf_processor = get_pdf_processor()
        document_text, pdf_metadata = await pdf_processor.extract_text_from_s3(
            s3_key=session_data["s3_key"]
        )
        
        logger.info(f"Extracted {len(document_text)} characters from document {session_data['document_id'][:12]}...")
        
        # Update progress
        await update_analysis_progress(
            session_id=session_id,
            status=AnalysisStatus.EXTRACTING,
            progress=30.0,
            current_step="Extraction complete"
        )
        
        # Broadcast progress
        await manager.broadcast({
            "type": "analysis_progress",
            "sessionId": session_id,
            "data": {
                "status": "extracting",
                "progress": 30.0,
                "currentStep": "Extraction"
            }
        })

        await asyncio.sleep(0.5)  # Brief pause for progress update
        
        # Step 3: FAR Scan
        await update_analysis_progress(
            session_id=session_id,
            status=AnalysisStatus.ANALYZING,
            progress=45.0,
            current_step="Analyzing document for FAR compliance"
        )
        
        # Broadcast progress
        await manager.broadcast({
            "type": "analysis_progress",
            "sessionId": session_id,
            "data": {
                "status": "analyzing",
                "progress": 45.0,
                "currentStep": "FAR Scan"
            }
        })

        
        # Use Analysis Router to get the configured provider
        try:
            provider = router.get_provider()
            
            logger.info(f"Using analysis provider: {provider.__class__.__name__} for document {session_data['document_id'][:12]}...")
            
            # Step 4: DFARS Audit (Integrated into provider logic)
            await update_analysis_progress(
                session_id=session_id,
                status=AnalysisStatus.ANALYZING,
                progress=55.0,
                current_step="Performing DFARS regulatory audit"
            )
            
            # Broadcast progress
            await manager.broadcast({
                "type": "analysis_progress",
                "sessionId": session_id,
                "data": {
                    "status": "analyzing",
                    "progress": 55.0,
                    "currentStep": "DFARS Audit"
                }
            })

            results = await provider.analyze_document(
                document_text=document_text,
                filename=session_data["filename"],
                document_id=session_data["document_id"],
                session_id=session_id
            )
            
            logger.info(f"Analysis completed for document {session_data['document_id'][:12]}")
            
        except Exception as provider_error:
            logger.error(f"Analysis provider failed for document {session_data['document_id'][:12]}: {provider_error}")
            raise
        
        # Step 5: Security Review
        await update_analysis_progress(
            session_id=session_id,
            status=AnalysisStatus.VALIDATING,
            progress=65.0,
            current_step="Conducting security review of compliance findings"
        )
        
        # Broadcast progress
        await manager.broadcast({
            "type": "analysis_progress",
            "sessionId": session_id,
            "data": {
                "status": "validating",
                "progress": 65.0,
                "currentStep": "Security Review"
            }
        })

        await asyncio.sleep(0.5)

        # Step 6: Policy Check
        await update_analysis_progress(
            session_id=session_id,
            status=AnalysisStatus.VALIDATING,
            progress=80.0,
            current_step="Cross-referencing organizational policies"
        )

        # Broadcast progress
        await manager.broadcast({
            "type": "analysis_progress",
            "sessionId": session_id,
            "data": {
                "status": "validating",
                "progress": 80.0,
                "currentStep": "Policy Check"
            }
        })

        await asyncio.sleep(0.5)

        # Step 7: Generation
        await update_analysis_progress(
            session_id=session_id,
            status=AnalysisStatus.COMPLETED,
            progress=95.0,
            current_step="Generating final compliance synthesis"
        )
            await update_analysis_progress(
                session_id=session_id,
                status=AnalysisStatus.ANALYZING,
                progress=55.0,
                current_step="Performing DFARS regulatory audit"
            )
            
            # Broadcast progress
            await manager.broadcast({
                "type": "analysis_progress",
                "sessionId": session_id,
                "data": {
                    "status": "analyzing",
                    "progress": 55.0,
                    "currentStep": "DFARS Audit"
                }
            })

            results = await provider.analyze_document(
                document_text=document_text,
                filename=session_data["filename"],
                document_id=session_data["document_id"],
                session_id=session_id
            )
            
            logger.info(f"Analysis completed for document {session_data['document_id']}")
            
        except Exception as provider_error:
            logger.error(f"Analysis provider failed for document {session_data['document_id']}: {provider_error}")
            raise
        
        # Step 5: Security Review
        await update_analysis_progress(
            session_id=session_id,
            status=AnalysisStatus.VALIDATING,
            progress=65.0,
            current_step="Conducting security review of compliance findings"
        )
        
        # Broadcast progress
        await manager.broadcast({
            "type": "analysis_progress",
            "sessionId": session_id,
            "data": {
                "status": "validating",
                "progress": 65.0,
                "currentStep": "Security Review"
            }
        })

        await asyncio.sleep(0.5)

        # Step 6: Policy Check
        await update_analysis_progress(
            session_id=session_id,
            status=AnalysisStatus.VALIDATING,
            progress=75.0,
            current_step="Verifying against regulatory policy guidelines"
        )
        
        # Broadcast progress
        await manager.broadcast({
            "type": "analysis_progress",
            "sessionId": session_id,
            "data": {
                "status": "validating",
                "progress": 75.0,
                "currentStep": "Policy Check"
            }
        })

        await asyncio.sleep(0.5)

        # Step 7: Generation
        await update_analysis_progress(
            session_id=session_id,
            status=AnalysisStatus.GENERATING,
            progress=90.0,
            current_step="Generating final compliance report"
        )
        
        # Broadcast progress
        await manager.broadcast({
            "type": "analysis_progress",
            "sessionId": session_id,
            "data": {
                "status": "generating",
                "progress": 90.0,
                "currentStep": "Generation"
            }
        })

        
        # Calculate processing time
        processing_time = time.time() - start_time
        results.processing_time = processing_time
        results.session_id = session_id
        
        # Add PDF metadata to results
        results.metadata.update({
            "pdf_metadata": pdf_metadata,
            "text_extraction_successful": True,
            "document_text_length": len(document_text)
        })
        
        # Store results in database
        await store_compliance_results(results)
        
        # Update session as completed
        await update_analysis_progress(
            session_id=session_id,
            status=AnalysisStatus.COMPLETED,
            progress=100.0,
            current_step="Analysis completed successfully"
        )
        
        # Broadcast completion
        await manager.broadcast({
            "type": "analysis_complete",
            "sessionId": session_id,
            "data": {
                "status": "completed",
                "progress": 100.0,
                "currentStep": "Analysis completed successfully",
                "resultsId": results.id
            }
        })

        
        logger.info(f"Completed analysis for session {session_id[:12]}... in {processing_time:.2f} seconds")
        
    except Exception as e:
        logger.error(f"Analysis failed for session {session_id}: {e}", exc_info=True)
        
        # Update session with error information
        await update_analysis_progress(
            session_id=session_id,
            status=AnalysisStatus.FAILED,
            progress=0.0,
            current_step="Analysis failed",
            error_message=str(e)
        )
        
        # Broadcast failure
        await manager.broadcast({
            "type": "error",
            "sessionId": session_id,
            "data": {
                "error": str(e),
                "status": "failed"
            }
        })

        
        # Create error results for consistency
        error_results = ComplianceResults(
            id=f"error_{session_id}_{int(datetime.utcnow().timestamp())}",
            session_id=session_id,
            document_id=session_data.get("document_id", "unknown"),
            status="fail",
            issues=[],
            summary=ComplianceSummary(
                total_issues=0,
                critical_count=0,
                warning_count=0,
                info_count=0,
                overall_score=0.0
            ),
            generated_at=datetime.utcnow(),
            ai_model="error",
            processing_time=time.time() - start_time,
            metadata={
                "error": str(e),
                "analysis_failed": True
            }
        )
        
        # Store error results in database
        try:
            await store_compliance_results(error_results)
        except Exception as store_error:
            logger.error(f"Failed to store error results for session {session_id}: {store_error}")


def validate_environment() -> None:
    """Validate required environment variables and configuration."""
    logger.info(f"Validating environment configuration for: {settings.environment}")
    
    # Log current configuration (without sensitive data)
    logger.info(f"Service will run on {settings.host}:{settings.port}")
    logger.info(f"AWS Region: {settings.aws_region}")
    logger.info(f"Bedrock Model ID: {settings.bedrock_model_id}")
    logger.info(f"Database URL configured: {bool(settings.database_url)}")
    logger.info(f"Redis URL configured: {bool(settings.redis_url)}")
    logger.info(f"S3 Endpoint: {settings.s3_endpoint_url}")
    logger.info(f"S3 Bucket: {settings.s3_bucket_name}")
    
    # Check for AWS credentials in production
    if settings.environment == "production":
        if not settings.aws_access_key_id or not settings.aws_secret_access_key:
            logger.warning("AWS credentials not found - will use fallback analysis only")
        else:
            logger.info("AWS credentials configured for Bedrock access")
    else:
        # In development, AWS credentials are optional
        if settings.aws_access_key_id and settings.aws_secret_access_key:
            logger.info("AWS credentials configured for development")
        else:
            logger.info("No AWS credentials - will use fallback analysis only")
    
    # Validate S3 configuration
    if not settings.s3_endpoint_url:
        logger.warning("S3 endpoint not configured - document retrieval may fail")
    
    logger.info("Environment validation completed successfully")


# Create FastAPI application
app = FastAPI(
    title="Strands Compliance Analysis Service",
    description="AI-powered document analysis for regulatory compliance",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://web:3000",
        settings.web_service_url
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time updates."""
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection open and listen for client messages
            # In this implementation, communication is one-way (server -> client)
            # but we need to receive to keep the connection alive/detect disconnects
            data = await websocket.receive_text()
            # Could handle ping/pong here if needed
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        logger.error(f"WebSocket connection error: {e}")
        manager.disconnect(websocket)



@app.get("/api/health", response_model=HealthCheckResponse)
async def health_check() -> HealthCheckResponse:
    """
    Health check endpoint for container orchestration.
    
    Returns:
        HealthCheckResponse containing service status and system information
    """
    try:
        checks = {
            "service": "ok",
            "logging": "ok",
            "configuration": "ok"
        }
        
        # Add database check
        try:
            db_health = await check_database_health()
            checks.update(db_health)
        except Exception as e:
            logger.warning(f"Database health check failed: {e}")
            checks["database"] = "error"
            
        # Add Local LLM check
        try:
            from local_llm import get_local_llm_client
            local_llm_client = get_local_llm_client()
            if settings.use_local_llm:
                if local_llm_client.is_available():
                    checks["local_llm"] = "ok"
                else:
                    checks["local_llm"] = "warning"
                    logger.warning("Local LLM not available")
            else:
                checks["local_llm"] = "disabled"
        except Exception as e:
            logger.warning(f"Local LLM health check failed: {e}")
            checks["local_llm"] = "warning"

        # Add AWS services check
        try:
            from aws_bedrock import get_bedrock_client
            bedrock_client = get_bedrock_client()
            if bedrock_client.is_available():
                checks["aws_bedrock"] = "ok"
            else:
                checks["aws_bedrock"] = "warning"
                logger.warning("AWS Bedrock client not available")
        except Exception as e:
            logger.warning(f"AWS Bedrock health check failed: {e}")
            checks["aws_bedrock"] = "warning"
        
        # Add analysis provider info
        provider = router.get_provider()
        checks["analysis_provider"] = settings.analysis_mode
        checks["provider_name"] = provider.get_name()
        checks["air_spec_mode"] = settings.air_spec_mode

        # Add local LLM check if applicable
        if settings.analysis_mode == "local" and settings.use_local_llm:
            try:
                import httpx
                # Quick probe to see if Ollama/LiteLLM is alive
                async with httpx.AsyncClient() as client:
                    resp = await client.get(f"{settings.local_llm_url}/api/tags", timeout=1.0)
                    if resp.status_code == 200:
                        checks["local_llm"] = "ok"
                    else:
                        checks["local_llm"] = "degraded"
            except Exception:
                checks["local_llm"] = "error"
                logger.warning("Local LLM service not reachable")
        
        # Add concurrent processor check
        try:
            processor_status = await get_processing_status()
            if processor_status["max_workers"] > 0:
                checks["concurrent_processor"] = "ok"
                checks["queue_size"] = processor_status["queue_size"]
                checks["active_tasks"] = processor_status["active_tasks"]
            else:
                checks["concurrent_processor"] = "warning"
        except Exception as e:
            logger.warning(f"Concurrent processor health check failed: {e}")
            checks["concurrent_processor"] = "warning"
        
        # Determine overall status
        status = "healthy"
        if any(check == "warning" for check in checks.values()):
            status = "degraded"
        elif any(check == "error" for check in checks.values()):
            status = "unhealthy"
            
        logger.info("Health check completed successfully")
        return HealthCheckResponse(
            status=status,
            version="1.0.0",
            environment=settings.environment,
            checks=checks
        )
        
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Service unhealthy")



@app.post("/api/documents/upload", response_model=UploadSessionResponse)
async def upload_document(
    file: UploadFile = File(...)
) -> UploadSessionResponse:
    """
    Upload a document file to S3 and create metadata record.
    
    Args:
        file: The file to upload
        
    Returns:
        UploadSessionResponse with document details
    """
    try:
        from pdf_processor import get_pdf_processor
        
        # Validate file type
        if file.content_type != "application/pdf":
             raise HTTPException(status_code=400, detail="Only PDF files are accepted")
             
        # Generate IDs
        doc_id = str(uuid.uuid4())
        timestamp = datetime.utcnow()
        
        # Read file content
        content = await file.read()
        file_size = len(content)
        
        # Sanitize filename to prevent path injection
        safe_filename = os.path.basename(file.filename)
        
        # S3 Upload
        processor = get_pdf_processor()
        s3_key = f"uploads/{doc_id}/{safe_filename}"
        bucket = settings.s3_bucket_name
        
        if processor._s3_client:
            processor._s3_client.put_object(
                Bucket=bucket,
                Key=s3_key,
                Body=content,
                ContentType="application/pdf"
            )
            logger.info(f"Uploaded file {safe_filename} to S3: {bucket}/{s3_key}")
        else:
            logger.warning("S3 client not available - upload skipped in development fallback")
            # In real app, this should probably fail or use local storage
            
        # Store metadata
        await DocumentMetadataOperations.store_document_metadata(
            document_id=doc_id,
            filename=safe_filename,
            original_filename=safe_filename,
            file_size=file_size,
            mime_type=file.content_type,
            s3_key=s3_key,
            pdf_metadata={}
        )
        
        return UploadSessionResponse(
            id=doc_id,
            filename=safe_filename,
            fileSize=file_size,
            mimeType=file.content_type,
            status="completed",
            progress=100.0,
            startedAt=timestamp,
            completedAt=datetime.utcnow(),
            s3Key=s3_key
        )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Upload failed: {e}")
        raise HTTPException(status_code=500, detail="Upload failed")



@app.post("/api/documents/simulate-upload", response_model=UploadSessionResponse)
async def simulate_upload(
    request: SimulateUploadRequest
) -> UploadSessionResponse:
    """
    Simulate a document upload using a file from the seed data directory.
    
    Args:
        request: Request containing the filename to simulate
        
    Returns:
        UploadSessionResponse with simulated document details
    """
    try:
        from pdf_processor import get_pdf_processor
        import shutil
        from pathlib import Path
        
        # Sanitize filename to prevent path injection
        safe_filename = os.path.basename(request.filename)
        
        # Verify seed file exists
        seed_dir = Path("/app/src/seed-data")
        source_path = seed_dir / safe_filename
        
        if not source_path.exists():
            # Fallback for local dev if not using container paths exactly as expected
            # Try searching in known locations
            alt_paths = [
                Path("services/strands/src/seed-data") / safe_filename,
                Path("src/seed-data") / safe_filename,
                Path("seed_data") / safe_filename
            ]
            for path in alt_paths:
                if path.exists():
                    source_path = path
                    break
        
        if not source_path.exists():
            raise HTTPException(status_code=404, detail=f"Seed file '{request.filename}' not found.")

        # Check if file already exists in metadata to avoid duplication
        # This implementation requires get_document_metadata_by_filename to be added to db_operations
        try:
            existing_metadata = await DocumentMetadataOperations.get_document_metadata_by_filename(safe_filename)
            if existing_metadata:
                logger.info(f"Found existing metadata for {safe_filename}, skipping upload")
                return UploadSessionResponse(
                    id=existing_metadata["document_id"],
                    filename=existing_metadata["filename"],
                    fileSize=existing_metadata["file_size"],
                    mimeType=existing_metadata["mime_type"],
                    status="completed",
                    progress=100.0,
                    startedAt=existing_metadata["uploaded_at"] if isinstance(existing_metadata["uploaded_at"], datetime) else datetime.fromisoformat(str(existing_metadata["uploaded_at"])),
                    completedAt=existing_metadata["uploaded_at"] if isinstance(existing_metadata["uploaded_at"], datetime) else datetime.fromisoformat(str(existing_metadata["uploaded_at"])),
                    s3Key=existing_metadata["s3_key"]
                )
        except Exception as e:
            logger.warning(f"Error checking for existing metadata: {e}")
            # Continue with new upload if check fails
            pass
            
        # Generate IDs
        doc_id = str(uuid.uuid4())

        timestamp = datetime.utcnow()
        
        # Read file stats
        file_size = source_path.stat().st_size
        mime_type = "application/pdf"
        
        # S3 Upload (Simulated by putting object)
        processor = get_pdf_processor()
        s3_key = f"uploads/{doc_id}/{safe_filename}"
        bucket = settings.s3_bucket_name
        
        if processor._s3_client:
            with open(source_path, "rb") as f:
                content = f.read()
                
            processor._s3_client.put_object(
                Bucket=bucket,
                Key=s3_key,
                Body=content,
                ContentType=mime_type
            )
            logger.info(f"Simulated upload of {safe_filename} to S3: {bucket}/{s3_key}")
        else:
            logger.warning("S3 client not available - simulation skipped S3 upload")

        # Store metadata
        await DocumentMetadataOperations.store_document_metadata(
            document_id=doc_id,
            filename=safe_filename,
            original_filename=safe_filename,
            file_size=file_size,
            mime_type=mime_type,
            s3_key=s3_key,
            pdf_metadata={"simulated": True, "source": "seed_data"}
        )
        
        return UploadSessionResponse(
            id=doc_id,
            filename=safe_filename,
            fileSize=file_size,
            mimeType=mime_type,
            status="completed",
            progress=100.0,
            startedAt=timestamp,
            completedAt=datetime.utcnow(),
            s3Key=s3_key
        )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Simulation failed: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")


@app.post("/api/analysis/start", response_model=AnalysisStartResponse)
async def start_analysis(
    request: AnalysisStartRequest
) -> AnalysisStartResponse:
    """
    Start document analysis for compliance checking using concurrent processing.
    
    Args:
        request: Analysis request containing document information
        
    Returns:
        AnalysisStartResponse with session ID and initial status
    """
    try:
        logger.info("Received analysis start request")
        
        # Create analysis session in database
        session_id = await create_analysis_session(request)
        logger.info(f"Created analysis session: {session_id[:12]}...")
        
        # Submit task to concurrent processor
        queued = await submit_analysis_task(session_id, request)
        
        if not queued:
            logger.error(f"Failed to queue analysis task for session {session_id}")
            raise HTTPException(
                status_code=503,
                detail="Analysis queue is full, please try again later"
            )
        
        logger.info(f"Successfully queued analysis session {session_id}")
        
        return AnalysisStartResponse(
            success=True,
            session_id=session_id,
            proposal_id=request.proposal_id,
            status="queued",
            estimated_completion=datetime.utcnow() + timedelta(minutes=5),
            message=f"Analysis queued for document {request.filename}"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to start analysis: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to start analysis"
        )


@app.get("/api/analysis/{session_id}", response_model=AnalysisStatusResponse)
async def get_analysis_status(
    session_id: str = Path(..., description="Analysis session ID")
) -> AnalysisStatusResponse:
    """
    Get the current status of an analysis session.
    
    Args:
        session_id: Unique identifier for the analysis session
        
    Returns:
        AnalysisStatusResponse with current status and progress
    """
    try:
        # Get session from database
        session_data = await get_analysis_session(session_id)
        
        if not session_data:
            raise HTTPException(
                status_code=404,
                detail="Analysis session not found"
            )
        
        logger.info(f"Retrieved status for analysis session {session_id}")
        
        return AnalysisStatusResponse(
            success=True,
            session_id=session_id,
            status=session_data["status"],
            progress=session_data["progress"],
            current_step=session_data["current_step"],
            started_at=session_data["started_at"],
            completed_at=session_data["completed_at"],
            estimated_completion=session_data["estimated_completion"],
            error_message=session_data["error_message"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get analysis status: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to get analysis status"
        )


@app.get("/api/analysis/{session_id}/results", response_model=AnalysisResultsResponse)
async def get_analysis_results(
    session_id: str = Path(..., description="Analysis session ID")
) -> AnalysisResultsResponse:
    """
    Get the results of a completed analysis session.
    
    Args:
        session_id: Unique identifier for the analysis session
        
    Returns:
        AnalysisResultsResponse with compliance analysis results
    """
    try:
        # Check if session exists
        session_data = await get_analysis_session(session_id)
        
        if not session_data:
            raise HTTPException(
                status_code=404,
                detail="Analysis session not found"
            )
        
        # Check if analysis is completed
        if session_data["status"] != "completed":
            return AnalysisResultsResponse(
                success=False,
                results=None,
                message="Analysis is not yet completed"
            )
        
        # Get results from database
        results = await get_compliance_results(session_id)
        
        if not results:
            return AnalysisResultsResponse(
                success=False,
                results=None,
                message="Analysis completed but results not found"
            )
        
        logger.info(f"Retrieved results for analysis session {session_id}")
        
        return AnalysisResultsResponse(
            success=True,
            results=results,
            message="Analysis results retrieved successfully"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get analysis results: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to get analysis results"
        )


@app.get("/api/processing/status")
async def get_processing_status_endpoint() -> Dict[str, Any]:
    """
    Get current processing queue and worker status.
    
    Returns:
        Dict containing processing statistics and worker information
    """
    try:
        status = await get_processing_status()
        logger.debug("Retrieved processing status")
        return {
            "success": True,
            "status": status,
            "timestamp": datetime.utcnow()
        }
    except Exception as e:
        logger.error(f"Failed to get processing status: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to get processing status"
        )


@app.post("/api/analysis/{session_id}/cancel")
async def cancel_analysis_endpoint(
    session_id: str = Path(..., description="Analysis session ID to cancel")
) -> Dict[str, Any]:
    """
    Cancel a queued or active analysis session.
    
    Args:
        session_id: Session ID to cancel
        
    Returns:
        Dict containing cancellation result
    """
    try:
        cancelled = await cancel_analysis_task(session_id)
        
        if cancelled:
            logger.info(f"Cancelled analysis session {session_id}")
            return {
                "success": True,
                "message": "Analysis session cancelled successfully"
            }
        else:
            return {
                "success": False,
                "message": "Analysis session could not be cancelled"
            }
            
    except Exception as e:
        logger.error(f"Failed to cancel analysis session {session_id}: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to cancel analysis"
        )


@app.get("/api/seed/status")
async def get_seeding_status() -> Dict[str, Any]:
    """
    Get current database seeding status.
    
    Returns:
        Dict containing seeding status and document counts
    """
    try:
        from seed_manager import seed_manager
        status = await seed_manager.check_seeding_status()
        
        logger.debug("Retrieved seeding status")
        return {
            "success": True,
            "seeding_status": status,
            "timestamp": datetime.utcnow()
        }
    except Exception as e:
        logger.error(f"Failed to get seeding status: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to get seeding status"
        )


@app.get("/api/seed/documents")
async def get_seeded_documents() -> Dict[str, Any]:
    """
    Get list of all seeded documents.
    
    Returns:
        Dict containing list of seeded documents with metadata
    """
    try:
        from seed_manager import seed_manager
        documents = await seed_manager.get_seeded_documents()
        
        logger.debug(f"Retrieved {len(documents)} seeded documents")
        return {
            "success": True,
            "documents": documents,
            "count": len(documents),
            "timestamp": datetime.utcnow()
        }
    except Exception as e:
        logger.error(f"Failed to get seeded documents: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to get seeded documents"
        )


@app.post("/api/seed/reseed")
async def reseed_database() -> Dict[str, Any]:
    """
    Force reseed the database with document metadata.
    
    Returns:
        Dict containing reseeding results
    """
    try:
        from seed_manager import seed_manager
        result = await seed_manager.seed_database(force_reseed=True)
        
        logger.info("Database reseeding completed")
        return {
            "success": True,
            "result": result,
            "timestamp": datetime.utcnow()
        }
    except Exception as e:
        logger.error(f"Failed to reseed database: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to reseed database"
        )


@app.get("/api/seed/verify")
async def verify_seeded_files() -> Dict[str, Any]:
    """
    Verify that all seeded documents have corresponding files.
    
    Returns:
        Dict containing file verification results
    """
    try:
        from seed_manager import seed_manager
        verification = await seed_manager.verify_seeded_files()
        
        logger.debug("File verification completed")
        return {
            "success": True,
            "verification": verification,
            "timestamp": datetime.utcnow()
        }
    except Exception as e:
        logger.error(f"Failed to verify seeded files: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to verify seeded files"
        )


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler for consistent error responses."""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    
    error_response = ErrorResponse(
        error="Internal server error",
        code="INTERNAL_ERROR",
        request_id=getattr(request.state, 'request_id', 'unknown')
    )
    
    return JSONResponse(
        status_code=500,
        content=error_response.dict()
    )


if __name__ == "__main__":
    logger.info(f"Starting Strands service on {settings.host}:{settings.port}")
    logger.info(f"Environment: {settings.environment}")
    logger.info(f"Reload enabled: {settings.environment != 'production'}")
    
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.environment != "production",
        log_level=settings.log_level.lower()
    )
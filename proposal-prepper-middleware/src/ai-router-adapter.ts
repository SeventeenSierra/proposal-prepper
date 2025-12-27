/*
 * SPDX-License-Identifier: UNLICENSED
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

import { type NextRequest, NextResponse } from 'next/server';
import { mockApiServer } from '@/services/mock-api-server';
import type { ApiResponse } from '@/services/ai-router-client';
import { aiRouterClient } from '@/services/ai-router-client';
import { aiRouterIntegration } from '@/services/ai-router-integration';
import { apiConfig, apiConfig as serviceApiConfig, validationConfig } from '@/services/config/app';

/**
 * AI Router Adapter
 *
 * Adapts the AI Router integration for use in Next.js API routes or Express middleware.
 * Renamed from StrandsIntegrationAdapter.
 */

/**
 * Utility to extract file from Next.js FormData
 */
async function extractFileFromRequest(request: NextRequest): Promise<File | null> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    return file || null;
  } catch (error) {
    console.error('Error extracting file from request:', error);
    return null;
  }
}

/**
 * Utility to extract JSON body from Next.js request
 */
// biome-ignore lint/suspicious/noExplicitAny: Generic utility
async function extractJsonFromRequest<T = any>(request: NextRequest): Promise<T | null> {
  try {
    const body = await request.json();
    return body as T;
  } catch (error) {
    console.error('Error extracting JSON from request:', error);
    return null;
  }
}

/**
 * Convert API response to Next.js response
 */
function toNextResponse<T>(apiResponse: ApiResponse<T>, successStatus = 200): NextResponse {
  if (apiResponse.success) {
    return NextResponse.json(
      {
        success: true,
        data: apiResponse.data,
      },
      { status: successStatus }
    );
  } else {
    // Map error codes to HTTP status codes
    let status = 500; // Default server error

    switch (apiResponse.code) {
      case 'MISSING_FILE':
      case 'MISSING_PROPOSAL_ID':
      case 'MISSING_SESSION_ID':
      case 'MISSING_ISSUE_ID':
        status = 400; // Bad Request
        break;
      case 'INVALID_FILE_TYPE':
      case 'FILE_TOO_LARGE':
      case 'VALIDATION_FAILED':
        status = 400; // Bad Request
        break;
      case 'SERVICE_UNAVAILABLE':
        status = 503; // Service Unavailable
        break;
      case 'UPLOAD_FAILED':
      case 'ANALYSIS_START_FAILED':
      case 'RESULTS_RETRIEVAL_FAILED':
      case 'UPLOAD_STATUS_FAILED':
      case 'ANALYSIS_STATUS_FAILED':
      case 'ISSUE_DETAILS_FAILED':
        status = 500; // Internal Server Error
        break;
    }

    return NextResponse.json(
      {
        success: false,
        error: apiResponse.error,
        code: apiResponse.code,
      },
      { status }
    );
  }
}

/**
 * Check if we should use the mock service based on configuration
 */
function shouldUseMock(): boolean {
  // Use explicit configuration
  if (serviceApiConfig.useMockApis) {
    return true;
  }

  const baseUrl = aiRouterClient.getBaseUrl();
  // If client points to localhost:3000 (Next.js default), we are self-referencing in dev mode.
  // In this case, we MUST use the internal MockApiServer to avoid infinite recursion.
  if (baseUrl.includes('localhost:3000')) {
    return true;
  }

  return false;
}

/**
 * AI Router Integration Handlers
 *
 * Static handlers for use in API routes
 */
export class AIRouterHandlers {
  /**
   * Document upload handler with AI Router integration
   */
  static async handleDocumentUpload(request: NextRequest): Promise<NextResponse> {
    const file = await extractFileFromRequest(request);

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided', code: 'MISSING_FILE' },
        { status: 400 }
      );
    }

    // Sanitize filename for security (Path Traversal prevention)
    const sanitizedFilename = file.name
      .replace(/[/\\]/g, '_')
      .slice(0, validationConfig.maxFilenameLength);

    console.log(`Processing upload for file: ${sanitizedFilename} (${file.size} bytes)`);

    try {
      const useMock = shouldUseMock();

      if (!useMock) {
        console.log('Using real AI Router service for upload and analysis');

        const uploadResult = await aiRouterClient.uploadDocument(file);

        if (uploadResult.success && uploadResult.data) {
          // Redact session ID for privacy/security if needed (Information Exposure)
          console.log(`Upload successful, session ID: ${uploadResult.data.id.substring(0, 12)}...`);

          const analysisResult = await aiRouterClient.startAnalysis(
            uploadResult.data.id,
            uploadResult.data.id, // Use proposalId as documentId
            uploadResult.data.filename,
            uploadResult.data.s3Key
          );

          if (analysisResult.success && analysisResult.data) {
            console.log(`Analysis started, session ID: ${analysisResult.data.id.substring(0, 12)}...`);

            return NextResponse.json(
              {
                success: true,
                data: {
                  ...uploadResult.data,
                  analysisSessionId: analysisResult.data.id,
                  analysisStatus: analysisResult.data.status,
                  message: 'Upload completed and analysis started',
                },
              },
              { status: 201 }
            );
          }

          console.warn('Analysis start failed, returning upload result only');
          return toNextResponse(uploadResult, 201);
        }

        console.error('Upload failed:', uploadResult.error);
        return toNextResponse(uploadResult);
      }

      console.log('Using internal MockApiServer for upload');
      const result = await mockApiServer.handleDocumentUpload(file);
      return toNextResponse(result, 201);
    } catch (error) {
      console.error('Upload error:', error);
      return NextResponse.json(
        {
          success: false,
          error: error instanceof Error ? error.message : 'Upload failed',
          code: 'UPLOAD_FAILED',
        },
        { status: 500 }
      );
    }
  }

  /**
   * Handle analysis start
   */
  static async handleAnalysisStart(request: NextRequest): Promise<NextResponse> {
    const body = await extractJsonFromRequest<{
      proposalId?: string;
      proposal_id?: string;
      documentId?: string;
      document_id?: string;
      filename?: string;
    }>(request);

    console.log('Analysis Start Request Body:', JSON.stringify(body));

    const proposalId = body?.proposalId || body?.proposal_id;
    const documentId = body?.documentId || body?.document_id;
    const filename = body?.filename;

    console.log(`Extracted proposalId: ${proposalId?.substring(0, 12)}...`);

    if (!proposalId) {
      return NextResponse.json(
        { success: false, error: 'Proposal ID is required', code: 'MISSING_PROPOSAL_ID' },
        { status: 400 }
      );
    }

    try {
      const useMock = shouldUseMock();

      if (!useMock) {
        console.log('Using real AI Router service for analysis');

        const result = await aiRouterClient.startAnalysis(
          proposalId,
          documentId,
          filename
        );

        return toNextResponse(result, 201);
      }

      console.log('Using internal MockApiServer for analysis');
      const result = await mockApiServer.handleAnalysisStart(proposalId);
      return toNextResponse(result, 201);
    } catch (error) {
      console.error('Analysis start error:', error);
      return NextResponse.json(
        {
          success: false,
          error: error instanceof Error ? error.message : 'Analysis start failed',
          code: 'ANALYSIS_START_FAILED',
        },
        { status: 500 }
      );
    }
  }

  /**
   * Handle analysis results
   */
  static async handleAnalysisResults(
    _request: NextRequest,
    { params }: { params: Promise<{ sessionId: string }> }
  ): Promise<NextResponse> {
    const { sessionId } = await params;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required', code: 'MISSING_SESSION_ID' },
        { status: 400 }
      );
    }

    try {
      const useMock = shouldUseMock();

      if (!useMock) {
        const result = await aiRouterClient.getResults(sessionId);
        return toNextResponse(result);
      } else {
        const result = await mockApiServer.handleAnalysisResults(sessionId);
        return toNextResponse(result);
      }
    } catch (error) {
      console.error('Results retrieval error:', error);
      try {
        const fallbackResult = await mockApiServer.handleAnalysisResults(sessionId);
        return toNextResponse(fallbackResult);
      } catch (fallbackError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Results retrieval failed and fallback unavailable',
            code: 'RESULTS_RETRIEVAL_FAILED',
          },
          { status: 500 }
        );
      }
    }
  }

  /**
   * Handle analysis status
   */
  static async handleAnalysisStatus(
    _request: NextRequest,
    { params }: { params: Promise<{ sessionId: string }> }
  ): Promise<NextResponse> {
    const { sessionId } = await params;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required', code: 'MISSING_SESSION_ID' },
        { status: 400 }
      );
    }

    try {
      const useMock = shouldUseMock();

      if (!useMock) {
        const result = await aiRouterClient.getAnalysisStatus(sessionId);
        return toNextResponse(result);
      } else {
        const result = await mockApiServer.handleAnalysisStatus(sessionId);
        return toNextResponse(result);
      }
    } catch (error) {
      console.error('Status error:', error);
      try {
        const fallbackResult = await mockApiServer.handleAnalysisStatus(sessionId);
        return toNextResponse(fallbackResult);
      } catch (_fallbackError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Status retrieval failed and fallback unavailable',
            code: 'ANALYSIS_STATUS_FAILED',
          },
          { status: 500 }
        );
      }
    }
  }

  /**
   * Handle service status check
   */
  static async handleServiceStatus(_req: Request) {
    // Force a fresh check if requested
    const url = new URL(_req.url);
    if (url.searchParams.get('refresh') === 'true') {
      await aiRouterIntegration.checkServiceHealth();
    }

    const status = aiRouterIntegration.getStatus();

    // If we have no status but just refreshed, get the new one
    if (!status) {
      await aiRouterIntegration.checkServiceHealth();
    }

    const currentStatus = aiRouterIntegration.getStatus();

    if (!currentStatus) {
      return NextResponse.json({ success: false, error: 'Service unavailable' }, { status: 503 });
    }

    return NextResponse.json({
      success: true,
      data: {
        healthy: currentStatus.healthy,
        status: currentStatus.error ? 'degraded' : 'healthy',
        version: currentStatus.version,
        checks: currentStatus.checks,
        baseUrl: currentStatus.baseUrl
      }
    });
  }

  /**
   * Health check handler that checks both web and AI Router services
   */
  static async handleHealthCheck(_request: NextRequest): Promise<NextResponse> {
    try {
      const webHealth = await mockApiServer.handleHealthCheck();
      const useMock = shouldUseMock();

      let serviceHealth = null;
      if (!useMock) {
        const healthCheck = await aiRouterClient.healthCheck();
        serviceHealth = healthCheck.data;
      }

      return NextResponse.json({
        success: true,
        data: {
          web_service: webHealth.data,
          ai_router_service: serviceHealth || { status: 'mock_mode' },
          integration_status: useMock ? 'mock_mode' : 'connected',
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Health check error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Health check failed',
          code: 'HEALTH_CHECK_FAILED',
        },
        { status: 500 }
      );
    }
  }
}

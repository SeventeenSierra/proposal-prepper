/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

import { type NextRequest, NextResponse } from 'next/server';
import { mockApiServer } from '@/services/mock-api-server';
import type { ApiResponse } from '@/services/ai-router-client';
import { aiRouterClient } from '@/services/ai-router-client';
import { aiRouterIntegration } from '@/services/ai-router-integration';

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
 * Check if AI Router service is available
 */
async function isServiceAvailable(): Promise<boolean> {
  try {
    const healthCheck = await aiRouterClient.healthCheck();
    return (
      healthCheck.success &&
      (healthCheck.data?.status === 'healthy' || healthCheck.data?.status === 'degraded')
    );
  } catch (error) {
    console.log('AI Router service health check failed:', error);
    return false;
  }
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

    console.log(`Processing upload for file: ${file.name} (${file.size} bytes)`);

    try {
      const available = await isServiceAvailable();

      if (available) {
        console.log('Using real AI Router service for upload and analysis');

        const uploadResult = await aiRouterClient.uploadDocument(file);

        if (uploadResult.success && uploadResult.data) {
          console.log(`Upload successful, session ID: ${uploadResult.data.id}`);

          const analysisResult = await aiRouterClient.startAnalysis(
            uploadResult.data.id,
            uploadResult.data.filename,
            uploadResult.data.s3Key
          );

          if (analysisResult.success && analysisResult.data) {
            console.log(`Analysis started, session ID: ${analysisResult.data.id}`);

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
          } else {
            console.warn('Analysis start failed, returning upload result only');
            return toNextResponse(uploadResult, 201);
          }
        } else {
          console.error('Upload failed:', uploadResult.error);
          throw new Error(uploadResult.error || 'Upload failed');
        }
      } else {
        console.log('Service unavailable, using mock fallback');
        const result = await mockApiServer.handleDocumentUpload(file);
        return toNextResponse(result, 201);
      }
    } catch (error) {
      console.error('Upload error:', error);
      try {
        const fallbackResult = await mockApiServer.handleDocumentUpload(file);
        return toNextResponse(fallbackResult, 201);
      } catch (fallbackError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Upload failed and fallback unavailable',
            code: 'UPLOAD_FAILED',
          },
          { status: 500 }
        );
      }
    }
  }

  /**
   * Handle analysis start
   */
  static async handleAnalysisStart(request: NextRequest): Promise<NextResponse> {
    const body = await extractJsonFromRequest<{
      proposalId: string;
      documentId?: string;
      filename?: string;
    }>(request);

    if (!body?.proposalId) {
      return NextResponse.json(
        { success: false, error: 'Proposal ID is required', code: 'MISSING_PROPOSAL_ID' },
        { status: 400 }
      );
    }

    try {
      const available = await isServiceAvailable();

      if (available) {
        console.log('Using real AI Router service for analysis');

        const result = await aiRouterClient.startAnalysis(
          body.proposalId,
          body.documentId,
          body.filename
        );

        return toNextResponse(result, 201);
      } else {
        console.log('Service unavailable, using mock fallback');
        const result = await mockApiServer.handleAnalysisStart(body.proposalId);
        return toNextResponse(result, 201);
      }
    } catch (error) {
      console.error('Analysis start error:', error);
      try {
        const fallbackResult = await mockApiServer.handleAnalysisStart(body.proposalId);
        return toNextResponse(fallbackResult, 201);
      } catch (fallbackError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Analysis start failed and fallback unavailable',
            code: 'ANALYSIS_START_FAILED',
          },
          { status: 500 }
        );
      }
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
      const available = await isServiceAvailable();

      if (available) {
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
      const available = await isServiceAvailable();

      if (available) {
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
      const available = await isServiceAvailable();

      let serviceHealth = null;
      if (available) {
        const healthCheck = await aiRouterClient.healthCheck();
        serviceHealth = healthCheck.data;
      }

      return NextResponse.json({
        success: true,
        data: {
          web_service: webHealth.data,
          ai_router_service: serviceHealth || { status: 'unavailable' },
          integration_status: available ? 'connected' : 'fallback_mode',
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

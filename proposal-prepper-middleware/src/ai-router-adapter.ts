/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

import { type NextRequest, NextResponse } from 'next/server';
import { mockApiServer } from '@/services/mock-api-server';
import type { ApiResponse } from '@/services/ai-router-client';
import { aiRouterClient } from '@/services/ai-router-client';
import { aiRouterIntegration } from '@/services/ai-router-integration';
import { apiConfigManager } from '@/services/config/api-config';

/**
 * AI Router Adapter
 * 
 * Adapts the AI Router integration for use in Next.js API routes or Express middleware.
 * Handles routing between real AI services and mock servers based on configuration.
 */
export class AiRouterAdapter {
  private static instance: AiRouterAdapter;

  private constructor() { }

  /**
   * Get singleton instance
   */
  public static getInstance(): AiRouterAdapter {
    if (!AiRouterAdapter.instance) {
      AiRouterAdapter.instance = new AiRouterAdapter();
    }
    return AiRouterAdapter.instance;
  }

  /**
   * Document upload handler
   */
  async handleDocumentUpload(req: NextRequest): Promise<NextResponse> {
    try {
      const useMock = isMockAllowed();
      const formData = await req.formData();
      const file = formData.get('file') as File;

      if (!file) {
        return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
      }

      if (useMock) {
        console.log('[AiRouterAdapter] Proxying upload to Mock API Server');
        const result = await mockApiServer.handleDocumentUpload(file);
        return NextResponse.json({ success: true, data: result.data }, { status: 201 });
      }

      console.log('[AiRouterAdapter] Proxying upload to Real AI Router');
      const result = await aiRouterClient.uploadDocument(file);
      return NextResponse.json(result, { status: result.success ? 201 : 400 });
    } catch (error) {
      console.error('[AiRouterAdapter] Upload handler error:', error);
      return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
    }
  }

  /**
   * Handle an analysis start request
   */
  async handleAnalysisStart(req: NextRequest): Promise<NextResponse> {
    try {
      const useMock = isMockAllowed();
      const body = await req.json();

      if (useMock) {
        console.log('[AiRouterAdapter] Proxying analysis start to Mock API Server');
        const result = await mockApiServer.handleAnalysisStart(body.proposalId || body.proposal_id);
        return NextResponse.json(result, { status: result.success ? 200 : 400 });
      }

      console.log('[AiRouterAdapter] Proxying analysis start to Real AI Router');
      const result = await aiRouterClient.startAnalysis(
        body.proposalId || body.proposal_id,
        body.documentId || body.document_id,
        body.filename,
        body.s3Key || body.s3_key,
        body.provider
      );
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    } catch (error) {
      console.error('[AiRouterAdapter] Analysis start handler error:', error);
      return NextResponse.json(
        { success: false, error: 'Analysis start failed' },
        { status: 500 }
      );
    }
  }

  /**
   * Handle analysis status request
   */
  async handleAnalysisStatus(req: NextRequest, { params }: { params: { sessionId: string } | Promise<{ sessionId: string }> }): Promise<NextResponse> {
    try {
      const { sessionId } = await params;
      const useMock = isMockAllowed();

      if (useMock) {
        const result = await mockApiServer.handleAnalysisStatus(sessionId);
        return NextResponse.json(result, { status: result.success ? 200 : 404 });
      }

      const result = await aiRouterClient.getAnalysisStatus(sessionId);
      return NextResponse.json(result, { status: result.success ? 200 : 404 });
    } catch (error) {
      console.error('[AiRouterAdapter] Status handler error:', error);
      return NextResponse.json({ success: false, error: 'Status retrieval failed' }, { status: 500 });
    }
  }

  /**
   * Handle result fetching
   */
  async handleAnalysisResults(req: NextRequest, { params }: { params: { sessionId: string } | Promise<{ sessionId: string }> }): Promise<NextResponse> {
    try {
      const { sessionId } = await params;
      const useMock = isMockAllowed();

      if (useMock) {
        const result = await mockApiServer.handleAnalysisResults(sessionId);
        return NextResponse.json(result, { status: result.success ? 200 : 404 });
      }

      const result = await aiRouterClient.getResults(sessionId);
      return NextResponse.json(result, { status: result.success ? 200 : 404 });
    } catch (error) {
      console.error('[AiRouterAdapter] Results handler error:', error);
      return NextResponse.json(
        { success: false, error: 'Results retrieval failed' },
        { status: 500 }
      );
    }
  }

  /**
   * Handle service status check
   */
  async handleServiceStatus(_req?: NextRequest): Promise<NextResponse> {
    return this.handleHealthCheck();
  }

  /**
   * Handle health check
   */
  async handleHealthCheck(): Promise<NextResponse> {
    try {
      const mockAllowed = isMockAllowed();
      const webHealth = await aiRouterIntegration.checkServiceHealth();

      let serviceHealth = null;
      let available = false;

      if (!mockAllowed) {
        try {
          const healthCheck = await aiRouterClient.healthCheck();
          serviceHealth = healthCheck.data;
          available = healthCheck.success;
        } catch (e) {
          console.warn('[AiRouterAdapter] Real AI Service health check failed');
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          web_service: webHealth,
          ai_router_service: serviceHealth || { status: mockAllowed ? 'mock_mode' : 'unavailable' },
          integration_status: available ? 'connected' : (mockAllowed ? 'fallback_mode' : 'unavailable'),
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('[AiRouterAdapter] Health check error:', error);
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

/**
 * Check if mock API is allowed for the current request
 */
function isMockAllowed(): boolean {
  try {
    const config = apiConfigManager.getConfiguration();
    return config.useMock;
  } catch (e) {
    return true; // Fallback to mock if config fails
  }
}

export const aiRouterAdapter = AiRouterAdapter.getInstance();
export const AIRouterHandlers = aiRouterAdapter;

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
   * Handle an analysis request
   */
  async handleAnalysis(req: NextRequest): Promise<NextResponse> {
    try {
      const useMock = !isMockAllowed();
      const body = await req.json();

      if (useMock) {
        console.log('[AiRouterAdapter] Proxying analysis request to Mock API Server');
        const result = await mockApiServer.handleAnalysisStart(body);
        return NextResponse.json(result, { status: result.success ? 200 : 400 });
      }

      console.log('[AiRouterAdapter] Proxying analysis request to Real AI Router');
      const result = await aiRouterClient.startAnalysis(body);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    } catch (error) {
      console.error('[AiRouterAdapter] Analysis handler error:', error);
      return NextResponse.json(
        { success: false, error: 'Internal server error during analysis orchestration' },
        { status: 500 }
      );
    }
  }

  /**
   * Handle result fetching
   */
  async handleResults(sessionId: string): Promise<NextResponse> {
    try {
      const useMock = !isMockAllowed();

      if (useMock) {
        const result = await mockApiServer.getResults(sessionId);
        return NextResponse.json(result, { status: result.success ? 200 : 404 });
      }

      const result = await aiRouterClient.getResults(sessionId);
      return NextResponse.json(result, { status: result.success ? 200 : 404 });
    } catch (error) {
      console.error('[AiRouterAdapter] Results handler error:', error);
      return NextResponse.json(
        { success: false, error: 'Internal server error while fetching results' },
        { status: 500 }
      );
    }
  }

  /**
   * Handle health check
   */
  async handleHealthCheck(): Promise<NextResponse> {
    try {
      const mockAllowed = isMockAllowed();
      const webHealth = await aiRouterIntegration.checkConnectivity();

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
          web_service: webHealth.data,
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
  const config = apiConfigManager.getConfiguration();
  return config.useMock;
}

export const aiRouterAdapter = AiRouterAdapter.getInstance();

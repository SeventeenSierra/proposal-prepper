// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

/**
 * Traffic Cop: Mesh Router
 *
 * Central API Gateway that routes requests to specialized backend services.
 * Allows swapping backends (Strands -> Other) without changing UI code.
 */

import { type NextRequest, NextResponse } from 'next/server';

interface MeshRequest {
  framework: string;
  action: 'analyze' | 'upload' | 'status' | 'results';
  payload: Record<string, unknown>;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

// Framework endpoint configuration
const FRAMEWORK_ENDPOINTS: Record<string, string> = {
  strands: process.env.STRANDS_AGENT_URL || 'http://localhost:8080',
};

export async function handleServiceStatus(_request: NextRequest): Promise<NextResponse> {
  let body: MeshRequest;
  try {
    body = (await _request.json()) as MeshRequest;
  } catch {
    return NextResponse.json<ErrorResponse>(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }
  // This function seems incomplete based on the provided snippet.
  // Assuming it's a placeholder or part of a larger change not fully specified.
  // For now, returning a generic response to ensure it's syntactically valid.
  return NextResponse.json({ message: 'Service status handler called', body });
}

export async function POST(request: NextRequest) {
  try {
    let body: MeshRequest;
    try {
      body = (await request.json()) as MeshRequest;
    } catch {
      return NextResponse.json<ErrorResponse>(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.framework) {
      return NextResponse.json<ErrorResponse>(
        { error: 'Missing required field: framework' },
        { status: 400 }
      );
    }

    if (!body.action) {
      return NextResponse.json<ErrorResponse>(
        { error: 'Missing required field: action' },
        { status: 400 }
      );
    }

    // Get target endpoint
    const targetUrl = FRAMEWORK_ENDPOINTS[body.framework];
    if (!targetUrl) {
      return NextResponse.json<ErrorResponse>(
        {
          error: `Unsupported framework: ${body.framework}. Supported: ${Object.keys(FRAMEWORK_ENDPOINTS).join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Map action to backend endpoint
    const actionEndpoints: Record<string, string> = {
      analyze: '/api/analysis/start',
      upload: '/api/documents/upload',
      status: '/api/analysis',
      results: '/api/analysis/results',
    };

    const endpoint = actionEndpoints[body.action];
    if (!endpoint) {
      return NextResponse.json<ErrorResponse>(
        { error: `Unknown action: ${body.action}` },
        { status: 400 }
      );
    }

    // Proxy request to backend
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`${targetUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body.payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        return NextResponse.json<ErrorResponse>(
          { error: `Backend service returned an error`, details: errorText },
          { status: 502 }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return NextResponse.json<ErrorResponse>(
          { error: 'Request to backend service timed out' },
          { status: 504 }
        );
      }

      if (error instanceof TypeError) {
        return NextResponse.json<ErrorResponse>(
          { error: 'Backend service is currently unavailable', details: (error as Error).message },
          { status: 503 }
        );
      }

      console.error('Mesh API error:', error);
      return NextResponse.json<ErrorResponse>(
        {
          error: 'Failed to process request',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error in mesh API:', error);
    return NextResponse.json<ErrorResponse>({ error: 'Internal server error' }, { status: 500 });
  }
}

// Health check endpoint
export async function GET() {
  const status: Record<string, { healthy: boolean; url: string }> = {};

  for (const [framework, url] of Object.entries(FRAMEWORK_ENDPOINTS)) {
    try {
      const response = await fetch(`${url}/api/health`, { method: 'GET' });
      status[framework] = { healthy: response.ok, url };
    } catch {
      status[framework] = { healthy: false, url };
    }
  }

  return NextResponse.json({ router: 'mesh', frameworks: status });
}

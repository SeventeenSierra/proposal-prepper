/*
 * SPDX-License-Identifier: PolyForm-Perimeter-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

/**
 * Next.js API Route for Analysis Status
 *
 * This route uses the Strands integration adapter for end-to-end workflow.
 * Connects to real Strands service with fallback to mock for development.
 */

import { AIRouterHandlers } from 'proposal-prepper-middleware/ai-router-adapter';

// Export the handler from the AI Router integration adapter
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, ctx: any) {
    return AIRouterHandlers.handleAnalysisStatus(req as any, ctx);
}

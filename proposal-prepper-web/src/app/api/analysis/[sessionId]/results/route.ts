/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

/**
 * Next.js API Route for Analysis Results
 *
 * This route now uses the Analysis Engine integration adapter for end-to-end workflow.
 * Connects to real Analysis Engine service with fallback to mock for development.
 */

// Export the handler from the AI Router integration adapter
import type { NextRequest } from 'next/server';
import { AIRouterHandlers } from 'proposal-prepper-middleware/ai-router-adapter';

export async function GET(req: NextRequest, ctx: { params: Promise<{ sessionId: string }> }) {
  return AIRouterHandlers.handleAnalysisResults(req, ctx);
}

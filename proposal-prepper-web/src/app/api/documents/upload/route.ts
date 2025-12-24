/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

/**
 * Next.js API Route for Document Upload
 *
 * This route now uses the Strands integration adapter for end-to-end workflow.
 * Connects to real Strands service with fallback to mock for development.
 */

// Export the handler from the AI Router integration adapter
import type { NextRequest } from 'next/server';
import { AIRouterHandlers } from 'proposal-prepper-middleware/ai-router-adapter';

export async function POST(req: NextRequest) {
  return AIRouterHandlers.handleDocumentUpload(req as any);
}

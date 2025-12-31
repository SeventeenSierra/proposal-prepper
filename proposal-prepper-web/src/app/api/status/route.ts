/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

/**
 * Next.js API Route for Service Status
 *
 * Provides detailed status information for debugging the end-to-end workflow.
 */

// Export the handler from the AI Router integration adapter
import type { NextRequest } from 'next/server';
import { AIRouterHandlers } from 'proposal-prepper-middleware/ai-router-adapter';

export async function GET(req: NextRequest) {
  return AIRouterHandlers.handleServiceStatus(req);
}

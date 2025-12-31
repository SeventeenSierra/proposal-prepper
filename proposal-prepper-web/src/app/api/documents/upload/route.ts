/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

/**
 * Document Upload API Route
 *
 * This route handles document uploads and initiates processing in the Analysis Engine.
 * Requirements: 1.1, 1.2
 * Connects to real Analysis Engine service with fallback to mock for development.
 */

// Export the handler from the AI Router integration adapter
import type { NextRequest } from 'next/server';
import { AIRouterHandlers } from 'proposal-prepper-middleware/ai-router-adapter';

export async function POST(req: NextRequest) {
  return AIRouterHandlers.handleDocumentUpload(req);
}

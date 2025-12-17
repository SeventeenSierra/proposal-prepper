/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

/**
 * Next.js API Route for Service Status
 *
 * Provides detailed status information for debugging the end-to-end workflow.
 */

import { AIRouterHandlers } from 'proposal-prepper-middleware/ai-router-adapter';

// Export the handler from the AI Router integration adapter
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, ctx: any) {
    return AIRouterHandlers.handleServiceStatus(req as any);
}

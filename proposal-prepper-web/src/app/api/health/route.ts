/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

import { NextResponse } from 'next/server';

/**
 * Simple health check endpoint for container orchestration.
 * This endpoint responds immediately without checking external services.
 * For full service health including Strands, use /api/status instead.
 */
export async function GET() {
    return NextResponse.json({
        status: 'healthy',
        service: 'web',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    });
}

/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

import type { FARDocument } from '@/seed-data';

/**
 * Generate mock analysis result for FAR documents
 */
export function generateMockResult(farDoc: FARDocument) {
  return {
    overallScore: 85,
    status: 'pass' as const,
    issues: [
      {
        severity: 'warning' as const,
        regulation: { section: 'FAR 6.302-1', title: 'Only One Responsible Source' },
        location: { page: 2, section: 'Justification' },
        message: 'Market research documentation could be more comprehensive',
      },
      {
        severity: 'info' as const,
        regulation: { section: 'FAR 6.303', title: 'Justification Content' },
        location: { page: 3, section: 'Technical Requirements' },
        message: 'Consider adding more detail on technical specifications',
      },
    ],
  };
}

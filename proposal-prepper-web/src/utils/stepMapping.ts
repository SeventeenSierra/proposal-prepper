/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

import { AnalysisStatus } from '@/services/analysis-service';
import type { Step } from '@/types/agent-interface';

export const analysisSteps: Step[] = [
  {
    id: 1,
    message: 'Uploading and processing document...',
    status: 'pending',
    agent: 'coordinator',
    details: 'Step 1: Upload',
  },
  {
    id: 2,
    message: 'Extracting document structure and text...',
    status: 'pending',
    agent: 'rag',
    details: 'Step 2: Extraction',
  },
  {
    id: 3,
    message: 'Scanning FAR Part 52 Requirements...',
    status: 'pending',
    agent: 'compliance',
    details: 'Step 3: FAR Scan',
  },
  {
    id: 4,
    message: 'Auditing DFARS Supplements...',
    status: 'pending',
    agent: 'compliance',
    details: 'Step 4: DFARS Audit',
  },
  {
    id: 5,
    message: 'Performing Cybersecurity Audit (NIST)...',
    status: 'pending',
    agent: 'compliance',
    details: 'Step 5: Security Review',
  },
  {
    id: 6,
    message: 'Cross-referencing small business rules...',
    status: 'pending',
    agent: 'compliance',
    details: 'Step 6: Policy Check',
  },
  {
    id: 7,
    message: 'Synthesizing final compliance report...',
    status: 'pending',
    agent: 'writer',
    details: 'Step 7: Generation',
  },
];

/**
 * Map AnalysisStatus and progress/currentStep to step index
 */
export function getStepIndexFromStatus(
  status: AnalysisStatus,
  progress = 0,
  currentStep?: string
): number {
  if (status === AnalysisStatus.FAILED) return -1;
  if (status === AnalysisStatus.COMPLETED) return 6;

  // Primary mapping by Status
  switch (status) {
    case AnalysisStatus.QUEUED:
      return 0;
    case AnalysisStatus.EXTRACTING:
      return 1;
    case AnalysisStatus.ANALYZING:
      // Sub-stages of ANALYZING (Steps 3-4-5-6)
      if (currentStep?.includes('DFARS')) return 3;
      if (
        currentStep?.includes('Security') ||
        currentStep?.includes('NIST') ||
        currentStep?.includes('Cyber')
      )
        return 4;
      if (currentStep?.includes('Small Business') || currentStep?.includes('Policy')) return 5;

      // Fallback to progress based mapping for ANALYZING
      if (progress >= 80) return 5;
      if (progress >= 65) return 4;
      if (progress >= 50) return 3;
      return 2; // Default for ANALYZING
    case AnalysisStatus.VALIDATING:
      return 6;
    default:
      return 0;
  }
}

/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

'use client';

import { useState } from 'react';
import type { FARDocument } from '@/seed-data';
import type { AnalysisResults } from '@/services/results-service';
import { ComplianceStatus as ComplianceStatusEnum } from '@/services/results-service';
import type { Step } from '@/types/agent-interface';
import { generateUUID } from '@/utils/crypto';
import { generateMockResult } from '@/utils/mockResults';
import { analysisSteps } from '@/utils/stepMapping';

interface UseMockAnalysisReturn {
  simulateAnalysis: (farDoc: FARDocument) => Promise<void>;
  isSimulating: boolean;
}

export function useMockAnalysis(
  onAnalysisStart: (sessionId: string) => void,
  onAnalysisComplete: (results: AnalysisResults) => void,
  setSteps: (steps: Step[]) => void,
  setUploadProgress: (progress: number) => void,
  setIsUploading: (uploading: boolean) => void,
  setIsAnalysisComplete: (complete: boolean) => void
): UseMockAnalysisReturn {
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateAnalysis = async (farDoc: FARDocument) => {
    setIsSimulating(true);
    const mockResult = generateMockResult(farDoc);
    const sessionId = `demo_${generateUUID()}`;

    onAnalysisStart(sessionId);

    // Animate through each step with delays
    for (let i = 0; i < analysisSteps.length; i++) {
      setSteps(
        analysisSteps.map((step, idx) => {
          if (idx < i) return { ...step, status: 'complete' };
          if (idx === i) return { ...step, status: 'running' };
          return { ...step, status: 'pending' };
        })
      );
      setUploadProgress(Math.round(((i + 1) / analysisSteps.length) * 100));

      // Delay between steps (faster for demo)
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    // Mark all steps complete
    setSteps(analysisSteps.map((step) => ({ ...step, status: 'complete' })));
    setIsAnalysisComplete(true);
    setIsUploading(false);

    // Convert mock results to AnalysisResults format
    const results: AnalysisResults = {
      sessionId,
      proposalId: farDoc.id,
      overallScore: mockResult.overallScore,
      status:
        mockResult.status === 'pass'
          ? ComplianceStatusEnum.PASS
          : mockResult.status === 'fail'
            ? ComplianceStatusEnum.FAIL
            : ComplianceStatusEnum.WARNING,
      issues: mockResult.issues.map((issue, idx) => ({
        id: `issue-${idx}`,
        title: issue.regulation.title,
        description: issue.message,
        severity: issue.severity as any,
        regulation: `${issue.regulation.section} ${issue.regulation.title}`,
        location: {
          ...issue.location,
          lineNumber: 0,
        },
      })),
      metadata: {
        totalPages: 12, // Simulated for demo
        processingTime: 2400, // Simulated ms
        rulesChecked: ['FAR 15.204-5', 'FAR 19.3', 'DFARS 252.204-7012'],
        completedAt: new Date(),
        issueCounts: {
          critical: mockResult.issues.filter((i) => i.severity === 'warning').length, // Map warning to critical for display
          warning: mockResult.issues.filter((i) => i.severity === 'info').length,
          info: 0,
        },
      },
    };

    onAnalysisComplete(results);
    setIsSimulating(false);
  };

  return { simulateAnalysis, isSimulating };
}

/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

'use client';

import { useCallback, useState } from 'react';
import { analysisService } from '@/services/analysis-service';
import type { AnalysisResults } from '@/services/results-service';
import { resultsService } from '@/services/results-service';
import type { SeedPdfInfo, Step } from '@/types/agent-interface';
import { generateUUID } from '@/utils/crypto';
import { getStepIndexFromStatus } from '@/utils/stepMapping';

interface UseAnalysisFlowReturn {
  startAnalysis: (file: File | null, seedPdf: SeedPdfInfo | null) => Promise<void>;
  analysisSessionId: string | null;
}

export function useAnalysisFlow(
  onAnalysisStart: (sessionId: string) => void,
  onAnalysisComplete: (results: AnalysisResults) => void,
  onAnalysisError: (error: string) => void,
  setSteps: (updater: (prev: Step[]) => Step[]) => void,
  setUploadProgress: (progress: number) => void,
  setIsAnalysisComplete: (complete: boolean) => void,
  setIsUploading: (uploading: boolean) => void,
  setUploadError: (error: string | null) => void
): UseAnalysisFlowReturn {
  const [analysisSessionId, setAnalysisSessionId] = useState<string | null>(null);

  const startAnalysis = useCallback(
    async (file: File | null, seedPdf: SeedPdfInfo | null) => {
      try {
        const targetFile = file || undefined;

        // Real analysis flow
        const analysisResult = await analysisService.startAnalysis({
          proposalId: `proposal_${generateUUID().substring(0, 8)}`,
          file: targetFile,
          documentId: seedPdf?.id,
          onProgress: (progress) => setUploadProgress(progress),
        });

        if (!analysisResult.success) {
          throw new Error(analysisResult.error || 'Deep scan initiation failed');
        }

        const sessionId = analysisResult.sessionId;
        setAnalysisSessionId(sessionId);
        onAnalysisStart(sessionId);

        // Set up event handlers for progress updates
        analysisService.setEventHandlers({
          onProgress: (sId: string, progress: number, currentStep: string) => {
            if (sId !== sessionId) return;

            const session = analysisService.getActiveSessions().find((s) => s.id === sId);
            if (session) {
              const stepIndex = getStepIndexFromStatus(session.status, progress, currentStep);
              setSteps((prev) =>
                prev.map((step, idx) => {
                  if (idx < stepIndex) return { ...step, status: 'complete' };
                  if (idx === stepIndex) return { ...step, status: 'running' };
                  return { ...step, status: 'pending' };
                })
              );
            }
          },
          onComplete: async (sId: string, _session: any) => {
            if (sId !== sessionId) return;

            setSteps((prev) => prev.map((step) => ({ ...step, status: 'complete' })));
            setIsAnalysisComplete(true);
            setIsUploading(false);

            try {
              const resultsResponse = await resultsService.getResults(sId);
              if (resultsResponse.success && resultsResponse.results) {
                onAnalysisComplete(resultsResponse.results);
              }
            } catch (err) {
              console.error('Failed to fetch results:', err);
              onAnalysisError('Failed to fetch final report data');
            }
          },
          onError: (sId: string, error: string) => {
            if (sId !== sessionId) return;

            setSteps((prev) =>
              prev.map((step) => (step.status === 'running' ? { ...step, status: 'error' } : step))
            );
            setUploadError(error);
            setIsUploading(false);
            onAnalysisError(error);
          },
        });
      } catch (err: any) {
        console.error('Analysis failed:', err);
        setIsUploading(false);
        setUploadError(err.message || 'Workflow execution failed');
        onAnalysisError(err.message || 'Workflow execution failed');
      }
    },
    [
      onAnalysisStart,
      onAnalysisComplete,
      onAnalysisError,
      setSteps,
      setUploadProgress,
      setIsAnalysisComplete,
      setIsUploading,
      setUploadError,
    ]
  );

  return { startAnalysis, analysisSessionId };
}

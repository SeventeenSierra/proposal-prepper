/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

'use client';

import { AlertCircle, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import type React from 'react';
import type { Step } from '@/types/agent-interface';

interface AnalysisStepsProps {
  steps: Step[];
}

function getStepIcon(status: Step['status']) {
  switch (status) {
    case 'complete':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'running':
      return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
    case 'error':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Circle className="h-5 w-5 text-gray-400" />;
  }
}

export function AnalysisSteps({ steps }: AnalysisStepsProps): React.JSX.Element {
  return (
    <div className="space-y-3 pt-2">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex items-start space-x-3 p-3 rounded-xl border transition-all ${
            step.status === 'running'
              ? 'bg-primary/5 border-primary/20 shadow-sm'
              : step.status === 'complete'
                ? 'bg-green-50/30 border-green-100 dark:bg-green-900/10'
                : 'bg-muted/30 border-transparent opacity-60'
          }`}
        >
          <div className="mt-1">{getStepIcon(step.status)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p
                className={`text-sm font-semibold tracking-tight ${
                  step.status === 'running' ? 'text-primary' : ''
                }`}
              >
                {step.message}
              </p>
              <span className="text-[10px] uppercase font-bold text-muted-foreground px-1.5 py-0.5 bg-muted rounded">
                {step.agent}
              </span>
            </div>
            {step.details && (
              <p className="text-[11px] text-muted-foreground mt-1 font-medium opacity-80">
                {step.details}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

'use client';

import { CardDescription, CardHeader, CardTitle } from '@17sierra/ui';
import { AlertTriangle, Shield } from 'lucide-react';
import type React from 'react';

interface AnalysisHeaderProps {
  apiStatus: { isConnected: boolean; isMock: boolean };
}

export function AnalysisHeader({ apiStatus }: AnalysisHeaderProps): React.JSX.Element {
  return (
    <CardHeader className="py-4 px-6 border-b flex flex-row items-center justify-between space-y-0">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <CardTitle className="text-lg font-bold">Compliance Officer</CardTitle>
          <CardDescription className="text-xs">NSF PAPPG & FAR/DFARS Expert</CardDescription>
        </div>
      </div>
      <div
        className={`px-2 py-1 rounded text-[10px] font-medium flex items-center gap-1 ${
          apiStatus.isMock
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30'
            : 'bg-green-100 text-green-700 dark:bg-green-900/30'
        }`}
      >
        {apiStatus.isMock ? <AlertTriangle className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
        {apiStatus.isMock ? 'DEMO MODE' : 'REAL AI ACTIVATED'}
      </div>
    </CardHeader>
  );
}

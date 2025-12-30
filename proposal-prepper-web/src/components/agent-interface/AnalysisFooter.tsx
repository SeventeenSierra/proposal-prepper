/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

'use client';

import { CardFooter } from '@17sierra/ui';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  FileText,
  FileUp,
  Loader2,
  Send,
} from 'lucide-react';
import type React from 'react';
import { useRef } from 'react';
import type { FARDocument } from '@/seed-data';
import type { SeedPdfInfo } from '@/types/agent-interface';
import { SeedPdfSelector } from './SeedPdfSelector';

interface AnalysisFooterProps {
  isUploading: boolean;
  isComplete: boolean;
  uploadProgress: number;
  uploadError: string | null;
  selectedFile: File | null;
  selectedSeedPdf: SeedPdfInfo | null;
  activeSeeds: FARDocument[];
  isDemoMode: boolean;
  isMockMode: boolean;
  isLiveMode: boolean;
  isOfflineMode: boolean;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSeedSelect: (seed: SeedPdfInfo) => void;
  onStartAnalysis: () => void;
  onReset: () => void;
}

export function AnalysisFooter({
  isUploading,
  isComplete,
  uploadProgress,
  uploadError,
  selectedFile,
  selectedSeedPdf,
  activeSeeds,
  isDemoMode,
  isMockMode,
  isLiveMode,
  isOfflineMode,
  onFileSelect,
  onSeedSelect,
  onStartAnalysis,
  onReset,
}: AnalysisFooterProps): React.JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <CardFooter className="p-4 border-t flex flex-col gap-3">
      {uploadError && (
        <div className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg flex items-center gap-2 border border-red-100 dark:border-red-900/30 w-full mb-1">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span className="font-medium">{uploadError}</span>
        </div>
      )}

      {isUploading ? (
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin text-primary" />
              Scrutinizing Proposal...
            </span>
            <span className="text-primary">{uploadProgress}%</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-black/5">
            <div
              className="h-full bg-primary transition-all duration-300 relative overflow-hidden"
              style={{ width: `${uploadProgress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]" />
            </div>
          </div>
        </div>
      ) : isComplete ? (
        <div className="flex flex-col gap-3 w-full">
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg flex items-center gap-3 border border-green-100 dark:border-green-900/30">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-xs font-bold text-green-700 dark:text-green-400">
                Analysis Session Complete
              </p>
              <p className="text-[10px] text-green-600 dark:text-green-500">
                All compliance modules passed.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            Analyze Another Document
          </button>
          {/* Seed selection for Demo/Mock modes */}
          {isOfflineMode && (
            <div className="flex-1 max-w-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                {isDemoMode ? 'Select Presentation Scenario' : 'Select Validation Test Case'}
              </div>
              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                onChange={(e) => {
                  const seed = activeSeeds.find((s) => s.id === e.target.value);
                  if (seed) {
                    onSeedSelect({
                      id: seed.id,
                      name: seed.filename,
                      displayName: seed.title,
                    });
                  }
                }}
                value={selectedSeedPdf?.id || ''}
              >
                <option value="">-- Choose {isDemoMode ? 'Scenario' : 'Test Case'} --</option>
                {activeSeeds.map((seed) => (
                  <option key={seed.id} value={seed.id}>
                    {seed.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* File picker for Live mode */}
          {isLiveMode && (
            <div className="flex-1 max-w-sm">
              <input
                type="file"
                ref={fileInputRef}
                onChange={onFileSelect}
                accept=".pdf"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-between px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-600 text-white p-1.5 rounded shadow-sm group-hover:scale-110 transition-transform">
                    <FileUp size={14} />
                  </div>
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                    {selectedFile ? selectedFile.name : 'Select PDF for Analysis'}
                  </span>
                </div>
                <ChevronDown size={14} className="text-indigo-400" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2 w-full">
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileSelect}
            accept=".pdf"
            className="hidden"
          />
          {isOfflineMode ? (
            <SeedPdfSelector
              activeSeeds={activeSeeds}
              selectedSeedPdf={selectedSeedPdf}
              isDemoMode={isDemoMode}
              onSelect={onSeedSelect}
              className="flex-1"
            />
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-1.5 border border-primary/30 rounded-lg text-xs font-bold bg-muted/50 hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="h-4 w-4" />
              {selectedFile ? 'Change PDF' : 'Select PDF'}
            </button>
          )}
          <button
            type="button"
            disabled={(!selectedFile && !selectedSeedPdf) || isUploading}
            onClick={onStartAnalysis}
            className="flex-[1.5] py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:shadow-none active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Send className="h-4 w-4" />
            Start Analysis
          </button>
        </div>
      )}
    </CardFooter>
  );
}

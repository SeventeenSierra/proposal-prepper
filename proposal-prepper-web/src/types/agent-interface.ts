/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

import type { AnalysisResults } from '@/services/results-service';
import type { ConnectionMode } from '@/services/config/app';

export interface Message {
  role: 'user' | 'bot';
  content: string;
}

export interface Step {
  id: number;
  message: string;
  status: 'pending' | 'running' | 'complete' | 'error';
  agent: 'coordinator' | 'rag' | 'compliance' | 'writer';
  details?: string;
}

export interface AgentInterfaceProps {
  onAnalysisStart: (sessionId: string) => void;
  onAnalysisComplete: (results: AnalysisResults) => void;
  onAnalysisError: (error: string) => void;
  activeProject?: string | null;
  connectionMode?: ConnectionMode;
}

export interface SeedPdfInfo {
  id: string;
  name: string;
  displayName: string;
}

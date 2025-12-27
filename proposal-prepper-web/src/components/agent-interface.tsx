/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Send,
  CheckCircle2,
  Circle,
  Loader2,
  AlertCircle,
  Shield,
  Search,
  Lock,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Settings,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@17sierra/ui';
import { uploadService } from '@/services/upload-service';
import { analysisService, AnalysisStatus } from '@/services/analysis-service';
import { resultsService } from '@/services/results-service';
import { generateUUID } from '@/utils/crypto';
import type { ComplianceResults } from '@/services/ai-router-client';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

interface Step {
  id: number;
  message: string;
  status: 'pending' | 'running' | 'complete' | 'error';
  agent: 'coordinator' | 'rag' | 'compliance' | 'writer';
  details?: string;
}

interface AgentInterfaceProps {
  onAnalysisStart: (sessionId: string) => void;
  onAnalysisComplete: (results: ComplianceResults) => void;
  onAnalysisError: (error: string) => void;
}

const analysisSteps: Step[] = [
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

// Map AnalysisStatus and progress/currentStep to step index
function getStepIndexFromStatus(status: AnalysisStatus, progress = 0, currentStep?: string): number {
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
      if (currentStep?.includes('Security') || currentStep?.includes('NIST') || currentStep?.includes('Cyber')) return 4;
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

export const AgentInterface: React.FC<AgentInterfaceProps> = ({
  onAnalysisStart,
  onAnalysisComplete,
  onAnalysisError,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: 'Hello! I am your AI compliance officer. Upload a proposal PDF and I will check it against FAR and DFARS regulations.',
    },
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[]>(analysisSteps);
  const [analysisSessionId, setAnalysisSessionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'steps' | 'results'>('chat');
  const [apiStatus, setApiStatus] = useState<{ isConnected: boolean; isMock: boolean }>({ isConnected: true, isMock: true });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check API status on mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/health');
        if (response.ok) {
          const data = await response.json();
          setApiStatus({
            isConnected: data.status === 'healthy' || data.status === 'degraded',
            isMock: data.integration_status === 'fallback' || data.integration_status === 'unavailable'
          });
        }
      } catch (err) {
        console.warn('Could not fetch health status, using default mock state');
      }
    };
    checkStatus();
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validation = uploadService.validateFile(file);
      if (!validation.isValid) {
        setUploadError(validation.error || 'Invalid file selection');
        return;
      }
      setSelectedFile(file);
      setUploadError(null);
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: `Selected file: ${file.name}` },
        { role: 'bot', content: `Great! I've validated ${file.name}. Click "Start Analysis" when you're ready.` },
      ]);
    }
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadError(null);
    setSteps(analysisSteps);
    setActiveTab('steps');

    try {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: `Starting high-fidelity compliance scan on ${selectedFile.name}...` },
      ]);

      const proposalId = generateUUID();
      const analysisResult = await analysisService.startAnalysis({
        proposalId,
        file: selectedFile,
        onProgress: (progress) => {
          setUploadProgress(progress);
        },
      });

      if (!analysisResult.success) {
        throw new Error(analysisResult.error || 'Deep scan initiation failed');
      }

      const sessionId = analysisResult.sessionId;
      setAnalysisSessionId(sessionId);
      onAnalysisStart(sessionId);

      // Set up event handlers for progress updates
      analysisService.setEventHandlers({
        onProgress: (sId, progress, currentStep) => {
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
        onComplete: async (sId, _session) => {
          if (sId !== sessionId) return;

          setSteps((prev) => prev.map((step) => ({ ...step, status: 'complete' })));
          setIsAnalysisComplete(true);
          setIsUploading(false);

          try {
            const resultsResponse = await resultsService.getResults(sId);
            if (resultsResponse.success && resultsResponse.results) {
              const results = resultsResponse.results;
              const issueCount = results.issues.length;
              const criticalCount = results.issues.filter((i) => i.severity === 'critical').length;

              setMessages((prev) => [
                ...prev,
                {
                  role: 'bot',
                  content: `Analysis complete. I found ${issueCount} compliance issues (${criticalCount} critical). The proposal has an overall score of ${results.overallScore}%.`,
                },
              ]);
              onAnalysisComplete(results);
              setActiveTab('results');
            }
          } catch (err) {
            console.error('Failed to fetch results:', err);
            onAnalysisError('Failed to fetch final report data');
          }
        },
        onError: (sId, error) => {
          if (sId !== sessionId) return;

          setSteps((prev) =>
            prev.map((step) => step.status === 'running' ? { ...step, status: 'error' } : step)
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
  };

  const getStepIcon = (status: Step['status']) => {
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
  };

  return (
    <Card className="h-full flex flex-col shadow-lg border-opacity-50 overflow-hidden bg-background">
      <CardHeader className="py-4 px-6 border-b flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Compliance Officer</CardTitle>
            <CardDescription className="text-xs">
              NSF PAPPG & FAR/DFARS Expert
            </CardDescription>
          </div>
        </div>
        <div className={`px-2 py-1 rounded text-[10px] font-medium flex items-center gap-1 ${apiStatus.isMock ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' : 'bg-green-100 text-green-700 dark:bg-green-900/30'
          }`}>
          {apiStatus.isMock ? <AlertTriangle className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
          {apiStatus.isMock ? 'DEMO MODE' : 'REAL AI ACTIVATED'}
        </div>
      </CardHeader>

      <div className="flex border-b text-xs">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-3 font-medium transition-colors ${activeTab === 'chat' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-muted/50'
            }`}
        >
          Intelligence Feed
        </button>
        <button
          onClick={() => setActiveTab('steps')}
          className={`flex-1 py-3 font-medium transition-colors ${activeTab === 'steps' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-muted/50'
            }`}
        >
          Analysis Steps
        </button>
      </div>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'chat' && (
          <div className="space-y-4 h-full flex flex-col justify-end">
            <div className="flex-1 flex flex-col gap-3 py-2">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${m.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'bg-muted text-foreground rounded-tl-none border'
                      }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {activeTab === 'steps' && (
          <div className="space-y-3 pt-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-start space-x-3 p-3 rounded-xl border transition-all ${step.status === 'running'
                    ? 'bg-primary/5 border-primary/20 shadow-sm'
                    : step.status === 'complete'
                      ? 'bg-green-50/30 border-green-100 dark:bg-green-900/10'
                      : 'bg-muted/30 border-transparent opacity-60'
                  }`}
              >
                <div className="mt-1">{getStepIcon(step.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-semibold tracking-tight ${step.status === 'running' ? 'text-primary' : ''
                      }`}>
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
        )}
      </CardContent>

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
        ) : isAnalysisComplete ? (
          <div className="flex flex-col gap-3 w-full">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg flex items-center gap-3 border border-green-100 dark:border-green-900/30">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs font-bold text-green-700 dark:text-green-400">Analysis Session Complete</p>
                <p className="text-[10px] text-green-600 dark:text-green-500">All compliance modules passed.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedFile(null);
                setIsAnalysisComplete(false);
                setSteps(analysisSteps);
                setActiveTab('chat');
                setMessages([{
                  role: 'bot',
                  content: 'Ready for another round? Upload the next proposal whenever you are ready.',
                }]);
              }}
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
            >
              Analyze Another Document
            </button>
          </div>
        ) : (
          <div className="flex gap-2 w-full">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-1.5 border border-primary/30 rounded-lg text-xs font-bold bg-muted/50 hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="h-4 w-4" />
              {selectedFile ? 'Change PDF' : 'Select PDF'}
            </button>
            <button
              disabled={!selectedFile || isUploading}
              onClick={handleStartAnalysis}
              className="flex-[1.5] py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:shadow-none active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              Start Analysis
            </button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

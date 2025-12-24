'use client';

import {
  AlertCircle,
  Bot,
  CheckCircle2,
  FileCheck,
  Loader2,
  Send,
  Sparkles,
  Upload,
  Zap,
} from '@17sierra/ui';
import { Send as SendIcon, Upload as UploadIcon } from 'lucide-react'; // Fallback if not in ui package
import { analysisService } from 'proposal-prepper-services/analysis-service';
import { resultsService } from 'proposal-prepper-services/results-service';
import { uploadService } from 'proposal-prepper-services/upload-service';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnalysisStatus } from '@/components/analysis/types';
import type { AnalysisResults } from '@/components/results/types';
import { Button, Textarea } from '@17sierra/ui';

type Step = {
  id: number;
  message: string;
  status: 'pending' | 'running' | 'complete' | 'error';
  agent?: 'coordinator' | 'rag' | 'compliance' | 'writer';
  details?: string;
};

type Message = {
  role: 'user' | 'bot';
  content: string;
};

type AgentInterfaceProps = {
  activeProject: string | null;
  onAnalysisStart: () => void;
  onAnalysisComplete: (results: AnalysisResults) => void;
  onAnalysisError: (error: string) => void;
};

// Map analysis status to step information
const analysisSteps: Step[] = [
  {
    id: 1,
    message: 'Uploading and processing document...',
    status: 'pending',
    agent: 'coordinator',
    details: 'Document Upload',
  },
  {
    id: 2,
    message: 'Extracting document structure and text...',
    status: 'pending',
    agent: 'rag',
    details: 'Text Extraction',
  },
  {
    id: 3,
    message: 'Validating against FAR/DFARS requirements...',
    status: 'pending',
    agent: 'compliance',
    details: 'Compliance Analysis',
  },
  {
    id: 4,
    message: 'Checking regulatory clause compliance...',
    status: 'pending',
    agent: 'compliance',
    details: 'Validation Check',
  },
  {
    id: 5,
    message: 'Synthesizing compliance report...',
    status: 'pending',
    agent: 'writer',
    details: 'Report Generation',
  },
];

// Map AnalysisStatus to step index
function getStepIndexFromStatus(status: AnalysisStatus): number {
  switch (status) {
    case AnalysisStatus.QUEUED:
      return 0;
    case AnalysisStatus.EXTRACTING:
      return 1;
    case AnalysisStatus.ANALYZING:
      return 2;
    case AnalysisStatus.VALIDATING:
      return 3;
    case AnalysisStatus.COMPLETED:
      return 4;
    case AnalysisStatus.FAILED:
      return -1;
    default:
      return 0;
  }
}

const AgentInterface = ({
  activeProject,
  onAnalysisStart,
  onAnalysisComplete,
  onAnalysisError,
}: AgentInterfaceProps) => {
  const [activeTab, setActiveTab] = useState<'steps' | 'results'>('steps');
  const [steps, setSteps] = useState<Step[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [_analysisSessionId, setAnalysisSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file
      const validation = uploadService.validateFile(file);
      if (!validation.isValid) {
        setUploadError(validation.error || 'Invalid file');
        return;
      }
      setSelectedFile(file);
      setUploadError(null);
    }
  };

  // Handle upload and analysis
  const handleUploadAndAnalyze = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadError(null);
    setSteps(analysisSteps.map((step) => ({ ...step, status: 'pending' })));
    setIsAnalysisComplete(false);
    setMessages([]);

    // Notify parent that analysis is starting
    onAnalysisStart();

    try {
      // Step 1: Upload document
      setSteps((prev) =>
        prev.map((step, idx) => (idx === 0 ? { ...step, status: 'running' } : step))
      );

      const uploadResult = await uploadService.uploadDocument(selectedFile);

      console.log('Upload Result in AgentInterface:', JSON.stringify(uploadResult, null, 2));

      if (!uploadResult.success) {
        throw new Error(uploadResult.error || 'Upload failed');
      }

      // Mark upload complete, start analysis
      setSteps((prev) =>
        prev.map((step, idx) =>
          idx === 0
            ? { ...step, status: 'complete' }
            : idx === 1
              ? { ...step, status: 'running' }
              : step
        )
      );

      console.log('Starting Analysis with Proposal ID:', uploadResult.sessionId);

      // Step 2-5: Start analysis
      const analysisResult = await analysisService.startAnalysis({
        proposalId: uploadResult.sessionId,
        documentId: uploadResult.sessionId,
        frameworks: ['FAR', 'DFARS'],
      });

      if (!analysisResult.success) {
        throw new Error(analysisResult.error || 'Analysis failed to start');
      }

      setAnalysisSessionId(analysisResult.sessionId);

      // Set up event handlers for progress updates
      analysisService.setEventHandlers({
        onProgress: (sessionId, _progress, _currentStep) => {
          // Update steps based on current step info
          const session = analysisService.getActiveSessions().find((s) => s.id === sessionId);
          if (session) {
            const stepIndex = getStepIndexFromStatus(session.status);
            setSteps((prev) =>
              prev.map((step, idx) => {
                if (idx < stepIndex) return { ...step, status: 'complete' };
                if (idx === stepIndex) return { ...step, status: 'running' };
                return step;
              })
            );
          }
        },
        onComplete: async (sessionId, _session) => {
          // Mark all steps complete
          setSteps((prev) => prev.map((step) => ({ ...step, status: 'complete' })));
          setIsAnalysisComplete(true);
          setIsUploading(false);

          // Fetch results
          try {
            // Use sessionId (Analysis Session ID) not proposalId
            const resultsResponse = await resultsService.getResults(sessionId);
            if (resultsResponse.success && resultsResponse.results) {
              const results = resultsResponse.results;
              const issueCount = results.issues.length;
              const criticalCount = results.issues.filter((i) => i.severity === 'critical').length;

              setMessages([
                {
                  role: 'bot',
                  content: `Analysis complete. I found ${issueCount} compliance issue${issueCount !== 1 ? 's' : ''} (${criticalCount} critical). The proposal has a ${results.overallScore}% compliance score. You can view the full details in the report panel.`,
                },
              ]);
              setActiveTab('results');

              // Notify parent with the results
              onAnalysisComplete(results);
            }
          } catch (err) {
            console.error('Failed to fetch results:', err);
            onAnalysisError('Failed to fetch analysis results');
          }
        },
        onError: (_sessionId, error) => {
          setSteps((prev) =>
            prev.map((step, idx) => {
              const runningIdx = prev.findIndex((s) => s.status === 'running');
              if (idx === runningIdx || (runningIdx === -1 && idx === prev.length - 1)) {
                return { ...step, status: 'error' };
              }
              return step;
            })
          );
          setUploadError(error);
          setIsUploading(false);
          onAnalysisError(error);
        },
      });

      // Start monitoring (polling for progress)
      // The analysis service handles this internally
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setUploadError(errorMessage);
      setSteps((prev) =>
        prev.map((step, _idx) => {
          if (step.status === 'running') return { ...step, status: 'error' };
          return step;
        })
      );
      setIsUploading(false);
      onAnalysisError(errorMessage);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);

    // For now, provide a contextual response
    // In full implementation, this would query an AI for follow-up questions
    setTimeout(() => {
      const botMessage: Message = {
        role: 'bot',
        content:
          'I can help you understand the compliance findings. Ask me about specific FAR/DFARS clauses, remediation steps, or how to address the identified issues.',
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsSending(false);
    }, 1000);
  };

  const getAgentIcon = (agent: string) => {
    switch (agent) {
      case 'coordinator':
        return <Zap size={14} className="text-blue-500" />;
      case 'rag':
        return <SearchIcon size={14} className="text-purple-500" />;
      case 'compliance':
        return <CheckCircle2 size={14} className="text-green-500" />;
      case 'writer':
        return <FileCheck size={14} className="text-orange-500" />;
      default:
        return <Bot size={14} className="text-gray-500" />;
    }
  };

  // Helper for SearchIcon
  const SearchIcon = ({ size, className }: { size: number; className: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Search"
    >
      <title>Search</title>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );

  const getStepIcon = (status: Step['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 size={20} className="text-green-500" />;
      case 'running':
        return <Loader2 size={20} className="text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-500" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-200" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
        <div className="max-w-3xl mx-auto w-full space-y-8">
          {!activeProject && (
            <div className="text-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-blue-50 w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center text-blue-600 shadow-sm">
                <Sparkles size={40} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                AI Regulatory Assistant
              </h2>
              <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                Upload your proposal to analyze against FAR/DFARS requirements using our multi-agent
                compliance engine.
              </p>

              {/* File Upload Section */}
              <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md hover:bg-blue-50/30 transition-all group bg-white w-full"
                >
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-800 text-base">
                      {selectedFile ? selectedFile.name : 'Select Proposal PDF'}
                    </div>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      {selectedFile
                        ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                        : 'Upload a PDF document for compliance analysis'}
                    </p>
                  </div>
                </button>

                {uploadError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg w-full">
                    <AlertCircle size={16} />
                    {uploadError}
                  </div>
                )}

                {selectedFile && (
                  <Button
                    onClick={handleUploadAndAnalyze}
                    disabled={isUploading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FileCheck size={16} className="mr-2" />
                        Start Compliance Analysis
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}

          {activeProject && (
            <div className="flex flex-col h-full">
              <div className="flex border-b border-gray-200 mb-6 bg-white sticky top-0 z-10 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('steps')}
                  className={`pb-3 px-1 text-sm font-medium mr-6 transition-colors border-b-2 ${activeTab === 'steps'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-slate-800'
                    }`}
                >
                  Live Analysis
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('results')}
                  className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${activeTab === 'results'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-slate-800'
                    }`}
                >
                  Results & Chat
                </button>
              </div>

              {activeTab === 'steps' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex gap-3 p-4 rounded-xl border transition-all ${step.status === 'running'
                        ? 'bg-blue-50/50 border-blue-100 shadow-sm'
                        : step.status === 'error'
                          ? 'bg-red-50/50 border-red-100'
                          : 'bg-white border-gray-100'
                        }`}
                    >
                      <div className="mt-1 shrink-0">{getStepIcon(step.status)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getAgentIcon(step.agent || 'coordinator')}
                          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                            {step.details}
                          </span>
                        </div>
                        <div
                          className={`text-sm font-medium ${step.status === 'pending'
                            ? 'text-gray-400'
                            : step.status === 'error'
                              ? 'text-red-600'
                              : 'text-slate-700'
                            }`}
                        >
                          {step.message}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isAnalysisComplete && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl text-sm text-green-800 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-500">
                      <div className="p-2 bg-green-100 rounded-full">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <div className="font-semibold">Analysis Complete</div>
                        <div className="text-green-700">
                          All compliance checks have finished. View results in the chat tab.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'results' && (
                <div className="space-y-6 animate-in fade-in duration-300 pb-4">
                  {messages.map((message, index) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: Chat log is append-only
                      key={index}
                      className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}
                    >
                      {message.role === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 p-1">
                          <Bot size={18} className="text-indigo-600" />
                        </div>
                      )}

                      <div
                        className={`flex-1 max-w-xl ${message.role === 'user' ? 'flex justify-end' : ''
                          }`}
                      >
                        <div
                          className={`p-4 rounded-2xl text-slate-800 leading-relaxed text-sm shadow-sm ${message.role === 'bot'
                            ? 'bg-white border border-gray-100 rounded-tl-none'
                            : 'bg-blue-600 text-white rounded-br-none'
                            }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isSending && (
                    <div className="flex gap-4 animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 p-1">
                        <Bot size={18} className="text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none text-slate-800 leading-relaxed text-sm w-32 h-12 flex items-center">
                          <div className="flex gap-1">
                            <div
                              className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                              style={{ animationDelay: '0ms' }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                              style={{ animationDelay: '150ms' }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                              style={{ animationDelay: '300ms' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md p-4 border-t border-gray-200 shrink-0 z-20">
        <div className="max-w-3xl mx-auto w-full">
          <div className="relative group">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={
                activeProject
                  ? 'Ask follow-up questions...'
                  : 'Upload a proposal to start analysis.'
              }
              className="w-full p-4 pr-14 text-sm resize-none bg-white min-h-[56px] shadow-sm border-gray-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl transition-all"
              rows={1}
              disabled={!activeProject || isSending}
            />
            <div className="absolute bottom-3 right-3">
              <Button
                size="icon"
                className={`h-8 w-8 rounded-lg transition-all ${inputValue ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                disabled={!inputValue || isSending || !activeProject}
                onClick={handleSendMessage}
              >
                {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </Button>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-gray-400 font-medium">
              AI can make mistakes. Review generated compliance reports.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentInterface;

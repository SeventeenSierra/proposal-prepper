/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

'use client';

import { Card, CardContent } from '@17sierra/ui';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useAnalysisFlow } from '@/hooks/useAnalysisFlow';
import { useMockAnalysis } from '@/hooks/useMockAnalysis';
import { farDemoDocuments, farTestDocuments } from '@/seed-data';
import type { AgentInterfaceProps, Message, SeedPdfInfo, Step } from '@/types/agent-interface';
import { analysisSteps } from '@/utils/stepMapping';
import { AnalysisFooter } from './AnalysisFooter';
import { AnalysisHeader } from './AnalysisHeader';
import { AnalysisSteps } from './AnalysisSteps';
import { ChatMessages } from './ChatMessages';

const AgentInterface: React.FC<AgentInterfaceProps> = ({
  onAnalysisStart,
  onAnalysisComplete,
  onAnalysisError,
  connectionMode,
}) => {
  // Derived states for current connection mode
  const isDemoModeActive = connectionMode === 'demo';
  const isMockModeActive = connectionMode === 'mock';
  const isLiveModeActive = connectionMode === 'analysis-router';
  const isOfflineMode = isDemoModeActive || isMockModeActive;

  // FAR documents for demo and mock modes
  const activeSeeds = isDemoModeActive
    ? farDemoDocuments
    : isMockModeActive
      ? farTestDocuments
      : [];

  // State
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content:
        'Hello! I am your AI compliance officer. Upload a proposal PDF and I will check it against FAR and DFARS regulations.',
    },
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[]>(analysisSteps);
  const [activeTab, setActiveTab] = useState<'chat' | 'steps' | 'results'>('chat');
  const [apiStatus, setApiStatus] = useState<{ isConnected: boolean; isMock: boolean }>({
    isConnected: true,
    isMock: true,
  });
  const [selectedSeedPdf, setSelectedSeedPdf] = useState<SeedPdfInfo | null>(null);

  // Custom hooks
  const { simulateAnalysis } = useMockAnalysis(
    onAnalysisStart,
    onAnalysisComplete,
    setSteps,
    setUploadProgress,
    setIsUploading,
    setIsAnalysisComplete
  );

  const { startAnalysis } = useAnalysisFlow(
    onAnalysisStart,
    onAnalysisComplete,
    onAnalysisError,
    setSteps,
    setUploadProgress,
    setIsAnalysisComplete,
    setIsUploading,
    setUploadError
  );

  // Clear seed selection when leaving demo/mock mode
  useEffect(() => {
    if (!isOfflineMode && selectedSeedPdf) {
      setSelectedSeedPdf(null);
      setSelectedFile(null);
    }
  }, [isOfflineMode, selectedSeedPdf]);

  // Check API status on mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/health');
        if (response.ok) {
          const data = await response.json();
          setApiStatus({
            isConnected: data.status === 'healthy' || data.status === 'degraded',
            isMock:
              data.integration_status === 'fallback' || data.integration_status === 'unavailable',
          });
        }
      } catch (_err) {
        console.warn('Could not fetch health status, using default mock state');
      }
    };
    checkStatus();
  }, []);

  // Handlers
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedSeedPdf(null);
      setUploadError(null);
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: `Selected file: ${file.name}` },
        {
          role: 'bot',
          content: `Great! I've validated ${file.name}. Click "Start Analysis" when you're ready.`,
        },
      ]);
    }
  };

  const handleSeedPdfSelect = (seed: SeedPdfInfo) => {
    setSelectedSeedPdf(seed);
    setSelectedFile(null);
    setUploadError(null);
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: `Selected seed PDF: ${seed.displayName}` },
      {
        role: 'bot',
        content: `I've loaded the demo proposal "${seed.displayName}". Click "Start Analysis" when you're ready.`,
      },
    ]);
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile && !selectedSeedPdf) return;

    setIsUploading(true);
    setUploadError(null);
    setSteps(analysisSteps);
    setActiveTab('steps');

    try {
      const displayName = selectedSeedPdf?.displayName || selectedFile?.name || 'document';
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: `Starting high-fidelity compliance scan on ${displayName}...` },
      ]);

      // Mock mode runs simulation, Demo/Live run real service
      if (isMockModeActive && selectedSeedPdf) {
        const farDoc = farTestDocuments.find((doc) => doc.id === selectedSeedPdf.id);
        if (farDoc) {
          await simulateAnalysis(farDoc);
          setActiveTab('results');
          return;
        }
      }

      // Real analysis flow
      const targetFile = selectedSeedPdf
        ? new File(
            [new Blob(['mock content'], { type: 'application/pdf' })],
            selectedSeedPdf.name,
            {
              type: 'application/pdf',
            }
          )
        : selectedFile;

      await startAnalysis(targetFile, selectedSeedPdf);
    } catch (err) {
      console.error('Analysis failed:', err);
      setIsUploading(false);
      const errorMsg = err instanceof Error ? err.message : 'Workflow execution failed';
      setUploadError(errorMsg);
      onAnalysisError(errorMsg);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedSeedPdf(null);
    setIsAnalysisComplete(false);
    setSteps(analysisSteps);
    setActiveTab('chat');
    setMessages([
      {
        role: 'bot',
        content: 'Ready for another round? Upload the next proposal whenever you are ready.',
      },
    ]);
  };

  return (
    <Card className="h-full flex flex-col shadow-lg border-opacity-50 overflow-hidden bg-background">
      <AnalysisHeader apiStatus={apiStatus} />

      <div className="flex border-b text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-3 font-medium transition-colors ${
            activeTab === 'chat'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:bg-muted/50'
          }`}
        >
          Intelligence Feed
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('steps')}
          className={`flex-1 py-3 font-medium transition-colors ${
            activeTab === 'steps'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:bg-muted/50'
          }`}
        >
          Analysis Steps
        </button>
      </div>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'chat' && <ChatMessages messages={messages} />}
        {activeTab === 'steps' && <AnalysisSteps steps={steps} />}
      </CardContent>

      <AnalysisFooter
        isUploading={isUploading}
        isComplete={isAnalysisComplete}
        uploadProgress={uploadProgress}
        uploadError={uploadError}
        selectedFile={selectedFile}
        selectedSeedPdf={selectedSeedPdf}
        activeSeeds={activeSeeds}
        isDemoMode={isDemoModeActive}
        isMockMode={isMockModeActive}
        isLiveMode={isLiveModeActive}
        isOfflineMode={isOfflineMode}
        onFileSelect={handleFileSelect}
        onSeedSelect={handleSeedPdfSelect}
        onStartAnalysis={handleStartAnalysis}
        onReset={handleReset}
      />
    </Card>
  );
};

export default AgentInterface;

'use client';

import { AIRouterIntegrationUtils } from 'proposal-prepper-services';
import { useCallback, useEffect, useState } from 'react';
import AgentInterface from '@/components/agent-interface';
import Sidebar from '@/components/layout/sidebar';
import TopBar from '@/components/layout/top-bar';
import ReportPreview from '@/components/report-preview';
import type { AnalysisResults } from '@/components/results/types';
import { apiConfig, type ConnectionMode } from '@/services/config/app';

export default function App() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [connectionMode, setConnectionMode] = useState<ConnectionMode>(apiConfig.defaultMode);

  useEffect(() => {
    // Initialize health monitoring
    AIRouterIntegrationUtils.initialize();

    // Check localStorage on mount
    const storedMode = localStorage.getItem('connection-mode') as ConnectionMode | null;

    // Environment-based defaults
    const isTestEnv =
      process.env.NODE_ENV === 'test' ||
      (typeof window !== 'undefined' && window.location.search.includes('test=true'));
    const envDefault = isTestEnv ? 'mock' : 'demo';

    if (storedMode) {
      setConnectionMode(storedMode);
    } else {
      setConnectionMode(envDefault);
      localStorage.setItem('connection-mode', envDefault);
    }

    // Listen for storage events
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'connection-mode' && e.newValue) {
        setConnectionMode(e.newValue as ConnectionMode);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      AIRouterIntegrationUtils.cleanup();
    };
  }, []);

  // Called when analysis starts (file selected and upload begins)
  const handleAnalysisStart = useCallback(() => {
    setActiveProject('analyzing');
    setShowReport(false);
    setAnalysisResults(null);
  }, []);

  // Called when analysis completes successfully with results
  const handleAnalysisComplete = useCallback((results: AnalysisResults) => {
    setAnalysisResults(results);
    setShowReport(true);
  }, []);

  // Called when analysis fails
  const handleAnalysisError = useCallback((error: string) => {
    console.error('Analysis failed:', error);
    // Keep activeProject set so user can see the error state
  }, []);

  const resetDemo = useCallback(() => {
    setActiveProject(null);
    setShowReport(false);
    setAnalysisResults(null);
    if (!isSidebarOpen) {
      setSidebarOpen(true);
    }
  }, [isSidebarOpen]);

  return (
    <div className="h-screen bg-background flex flex-col font-body text-slate-800 overflow-hidden">
      <TopBar
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        connectionMode={connectionMode}
        setConnectionMode={(mode) => {
          setConnectionMode(mode);
          localStorage.setItem('connection-mode', mode);
        }}
      />

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]">
        <Sidebar
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          resetDemo={resetDemo}
          isOpen={isSidebarOpen}
        />

        <main className="flex-1 flex relative bg-white shadow-inner-xl m-0 md:my-2 md:mr-2 md:rounded-lg overflow-hidden border-t md:border border-gray-200/80 transition-all duration-300">
          <AgentInterface
            activeProject={activeProject}
            onAnalysisStart={handleAnalysisStart}
            onAnalysisComplete={handleAnalysisComplete}
            onAnalysisError={handleAnalysisError}
            connectionMode={connectionMode}
          />
          <ReportPreview isVisible={showReport} results={analysisResults} />
        </main>
      </div>
    </div>
  );
}

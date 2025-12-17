'use client';

import { useCallback, useState } from 'react';
import AgentInterface from '@/components/agent-interface';
import Sidebar from '@/components/layout/sidebar';
import TopBar from '@/components/layout/top-bar';
import ReportPreview from '@/components/report-preview';
import type { AnalysisResults } from '@/components/results/types';

export default function App() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);

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
      <TopBar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

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
          />
          <ReportPreview isVisible={showReport} results={analysisResults} />
        </main>
      </div>
    </div>
  );
}

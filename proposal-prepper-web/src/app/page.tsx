'use client';

import { useEffect, useState } from 'react';
import AgentInterface from '@/components/agent-interface';
import Sidebar from '@/components/layout/sidebar';
import TopBar from '@/components/layout/top-bar';
import ReportPreview from '@/components/report-preview';

export default function App() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Project Trigger
  const startDemo = (projectId: string = 'demo-running') => {
    setActiveProject(projectId);

    // Only simulate report appearance if it's the demo running
    if (projectId === 'demo-running') {
      // Report appears after animation finishes (approx 5 steps * 1.5s = 7.5s, cutting short for UX)
      setTimeout(() => {
        setShowReport(true);
      }, 7500);
    }
  };

  const resetDemo = () => {
    setActiveProject(null);
    setShowReport(false);
    if (!isSidebarOpen) {
      setSidebarOpen(true);
    }
  };

  useEffect(() => {
    if (activeProject) {
      // Don't auto-show report for real projects until analysis is complete
      // (This will be handled by the AgentInterface updating the state eventually,
      // but for now we rely on the component's internal state)
      if (activeProject === 'demo-running') {
        setShowReport(false);
      }
      // For real projects, we might want to let AgentInterface control when report shows
      // Currently AgentInterface doesn't bubble up "analysis complete" to here directly
      // except via side effects.
      // We will let AgentInterface handle the "Analysis Complete" message, and the
      // user can click to view report, or we can add a callback prop later.
      // For now, keeping existing behavior for non-demo projects might be safer
      // to ensure UI consistency if they expect immediate feedback,
      // but the requirement said "report page ... shows dummy data even if pdf didn't finish".
      // So we should NOT show it immediately.

      setShowReport(false);
    }
  }, [activeProject]);

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
          <AgentInterface activeProject={activeProject} startDemo={startDemo} />
          <ReportPreview isVisible={showReport} />
        </main>
      </div>
    </div>
  );
}

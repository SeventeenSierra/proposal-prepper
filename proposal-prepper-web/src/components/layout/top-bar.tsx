'use client';

import { Avatar, AvatarFallback } from '@17sierra/ui';
import {
  Bell,
  Bot,
  ChevronDown,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from 'lucide-react';
import {
  aiRouterIntegration,
  type ConnectionMode,
  type ServiceIntegrationStatus,
} from 'proposal-prepper-services';
import { useEffect, useState } from 'react';

type TopBarProps = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  connectionMode: ConnectionMode;
  setConnectionMode: (mode: ConnectionMode) => void;
};

// Local fallback for Button to avoid potential library resolution issues in dev
type LocalButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'ghost' | 'default';
  size?: 'sm' | 'icon' | 'default';
  title?: string;
  onMouseEnter?: () => void;
};

const LocalButton = ({
  children,
  onClick,
  className,
  variant,
  size,
  title,
  onMouseEnter,
}: LocalButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50';
  const variants: Record<'ghost' | 'default', string> = {
    ghost: 'hover:bg-slate-100 hover:text-slate-900',
    default: 'bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90',
  };
  const sizes: Record<'sm' | 'icon' | 'default', string> = {
    sm: 'h-8 rounded-md px-3 text-xs',
    icon: 'h-9 w-9',
    default: '',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`${baseStyles} ${variants[variant || 'default']} ${sizes[size || 'default']} ${className || ''}`}
      title={title}
    >
      {children}
    </button>
  );
};

const TopBar = ({
  toggleSidebar,
  isSidebarOpen,
  connectionMode,
  setConnectionMode,
}: TopBarProps) => {
  const [status, setStatus] = useState<ServiceIntegrationStatus | null>(null);
  const [showTier1Selector, setShowTier1Selector] = useState(false);
  const [showTier2Selector, setShowTier2Selector] = useState(false);
  const [showSettingsPane, setShowSettingsPane] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [infraLoading, setInfraLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    return aiRouterIntegration.subscribeToStatus((newStatus) => {
      setStatus(newStatus);
    });
  }, []);

  const getStatusDisplay = () => {
    // Determine high-level mode
    const isDemo = connectionMode === 'demo';
    const isMock = connectionMode === 'mock';
    const provider = status?.activeProvider || 'local-llama';

    if (isDemo) {
      return {
        label: 'Demo Mode (Presentation)',
        classes: 'bg-amber-100 text-amber-700 border-amber-200',
        dotClass: 'bg-amber-500 animate-pulse',
      };
    }

    if (isMock) {
      return {
        label: 'Test Mode (Mock)',
        classes: 'bg-blue-100 text-blue-700 border-blue-200',
        dotClass: 'bg-blue-500 animate-pulse',
      };
    }

    // AI Router Mode
    const isCloud = !['local-llama', 'simulation', 'manual'].includes(provider);
    if (!isCloud) {
      return {
        label: 'Router: Local',
        classes: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        dotClass: 'bg-emerald-500',
      };
    }

    const providerName = provider === 'aws-bedrock' ? 'Strands' : provider.toUpperCase();
    return {
      label: status?.healthy ? `Live Mode: ${providerName}` : 'Live Mode (AI Router)',
      classes: status?.healthy
        ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
        : 'bg-red-100 text-red-700 border-red-200',
      dotClass: status?.healthy ? 'bg-indigo-500' : 'bg-red-500',
    };
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-between shadow-sm z-20 relative">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <LocalButton
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-9 w-9 text-slate-500 hover:text-primary hover:bg-primary/5 transition-colors"
            title={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
          >
            {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </LocalButton>
        </div>

        <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm shadow-indigo-200">
            <Bot size={20} />
          </div>
          <div className="leading-tight">
            <div className="text-slate-800 font-bold tracking-tight uppercase text-xs">
              ATARC Agentic AI Lab
            </div>
            <div className="text-[10px] text-gray-400 font-normal tracking-wide uppercase">
              PROPOSAL PREPPER WORKSPACE
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1"></div>

      <div className="flex items-center gap-2">
        {/* Status Badge (Moved to right, next to icons) */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-gray-100 bg-gray-50/50 mr-2">
          <span className={`w-1.5 h-1.5 rounded-full ${statusDisplay.dotClass}`}></span>
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            {statusDisplay.label}
          </span>
        </div>

        <LocalButton
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-slate-400 hover:text-slate-600"
        >
          <HelpCircle size={18} />
        </LocalButton>
        <LocalButton
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-slate-400 hover:text-slate-600 relative"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </LocalButton>
        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        {/* Settings Button + Hierarchical Selectors */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: Hover menu container - mouse interaction is intentional for UX */}
        <div className="relative" onMouseLeave={() => setShowSettingsPane(false)}>
          <LocalButton
            variant="ghost"
            size="icon"
            className={`h-9 w-9 transition-colors ${showSettingsPane ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-slate-600'}`}
            onClick={() => setShowSettingsPane(!showSettingsPane)}
            onMouseEnter={() => setShowSettingsPane(true)}
            title="Connection Settings"
          >
            <Settings size={18} />
          </LocalButton>

          {showSettingsPane && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-3 z-50 min-w-[280px] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-50 pb-2 flex items-center gap-2">
                <Settings size={12} />
                Connection Configuration
              </div>

              <div className="space-y-4">
                {/* Tier 1: Application Mode */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">
                    Tier 1: Connection Mode
                  </span>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setShowTier1Selector(!showTier1Selector);
                        setShowTier2Selector(false);
                      }}
                      className="w-full text-[11px] px-3 py-2 rounded-md border border-gray-200 bg-white text-slate-600 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
                    >
                      <span className="font-medium uppercase tracking-wide">
                        {connectionMode === 'demo'
                          ? 'Demo Mode (Presentation)'
                          : connectionMode === 'mock'
                            ? 'Test Mode (Mock)'
                            : 'Live Mode (AI Router)'}
                      </span>
                      <ChevronDown
                        size={12}
                        className={`text-gray-400 transition-transform duration-200 ${showTier1Selector ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {showTier1Selector && (
                      <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-[60]">
                        {[
                          { id: 'demo', label: 'Demo Mode (Presentation)' },
                          { id: 'mock', label: 'Test Mode (Mock)' },
                          { id: 'analysis-router', label: 'Live Mode (AI Router)' },
                        ].map((m) => (
                          <button
                            type="button"
                            key={m.id}
                            onClick={async () => {
                              const newMode = m.id as ConnectionMode;
                              setConnectionMode(newMode);
                              aiRouterIntegration.setMode(newMode);

                              setInfraLoading(true);
                              if (newMode === 'demo' || newMode === 'mock') {
                                aiRouterIntegration.setProvider('manual');
                                // Trigger container shutdown bridge for non-live modes
                                try {
                                  await fetch('/api/infra/stop', { method: 'POST' });
                                } catch (e) {
                                  console.error('Failed to trigger infra stop:', e);
                                }
                              } else {
                                aiRouterIntegration.setProvider('local-llama');
                                // Trigger container startup bridge for live mode
                                try {
                                  await fetch('/api/infra/start', { method: 'POST' });
                                } catch (e) {
                                  console.error('Failed to trigger infra start:', e);
                                }
                              }
                              setInfraLoading(false);
                              setShowTier1Selector(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-[10px] hover:bg-gray-50 uppercase font-bold tracking-wider ${connectionMode === m.id ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-600'}`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tier 2: Workflow/Context - Only visible in AI Router mode */}
                {mounted && connectionMode === 'analysis-router' && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">
                      Tier 2: Context
                    </span>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setShowTier2Selector(!showTier2Selector);
                          setShowTier1Selector(false);
                        }}
                        className="w-full text-[11px] px-3 py-2 rounded-md border border-gray-200 bg-white text-slate-600 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
                      >
                        <span className="font-medium uppercase tracking-wide">
                          {['local-llama', 'simulation', 'manual'].includes(
                            status?.activeProvider || ''
                          )
                            ? 'Local (Default)'
                            : 'Cloud'}
                        </span>
                        <ChevronDown
                          size={12}
                          className={`text-gray-400 transition-transform duration-200 ${showTier2Selector ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {showTier2Selector && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-[60]">
                          {[
                            { id: 'local-llama', label: 'Local (Default)' },
                            { id: 'cloud', label: 'Cloud' },
                          ].map((p) => (
                            <button
                              type="button"
                              key={p.id}
                              onClick={() => {
                                if (p.id === 'local-llama') {
                                  aiRouterIntegration.setProvider('local-llama');
                                  setShowTier2Selector(false);
                                }
                              }}
                              disabled={p.id === 'cloud'}
                              className={`w-full text-left px-3 py-2 text-[10px] uppercase font-bold tracking-wider ${
                                p.id === 'cloud'
                                  ? 'text-gray-400 cursor-not-allowed opacity-50 bg-gray-50'
                                  : status?.activeProvider === 'local-llama' &&
                                      p.id === 'local-llama'
                                    ? 'text-indigo-600 bg-indigo-50/50'
                                    : 'text-slate-600 hover:bg-gray-50'
                              }`}
                              title={
                                p.id === 'cloud'
                                  ? 'Cloud Router (Coming Soon - Disabled for Safety)'
                                  : ''
                              }
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tier 3: Platforms */}
                {connectionMode === 'analysis-router' &&
                  !['local-llama', 'simulation', 'manual'].includes(
                    status?.activeProvider || ''
                  ) && (
                    <div className="space-y-1.5 pt-2 border-t border-gray-50">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">
                        Tier 3: Cloud Platform
                      </span>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { id: 'genkit', label: 'GenKit' },
                          { id: 'aws-bedrock', label: 'Strands' },
                          { id: 'autogen', label: 'AutoGen' },
                        ].map((p) => (
                          <button
                            type="button"
                            key={p.id}
                            onClick={() => {}}
                            disabled={true}
                            className={`text-[9px] px-1 py-2 rounded font-bold transition-all uppercase tracking-tight border ${
                              status?.activeProvider === p.id
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                : 'bg-white text-gray-400 border-gray-100 opacity-50 cursor-not-allowed'
                            }`}
                            title={`${p.label} (Disabled for Safety)`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Infrastructure Loading State */}
                {infraLoading && (
                  <div className="flex items-center gap-2 justify-center py-2 bg-indigo-50/50 rounded-md border border-indigo-100 animate-pulse">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                    <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest pl-1">
                      Updating Infrastructure...
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Avatar className="h-9 w-9 text-xs border border-gray-100 shadow-sm cursor-pointer hover:ring-2 hover:ring-indigo-100 transition-all">
          <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold">AF</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default TopBar;

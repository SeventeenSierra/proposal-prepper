'use client';

import { Avatar, AvatarFallback, Bot } from '@17sierra/ui';
import {
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
  HelpCircle,
  Settings,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { aiRouterIntegration, type ServiceIntegrationStatus } from 'proposal-prepper-services';

type TopBarProps = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  apiMode?: 'real' | 'mock';
};

// Local fallback for Button to avoid potential library resolution issues in dev
const LocalButton = ({ children, onClick, className, variant, size, title }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50";
  const variants: any = {
    ghost: "hover:bg-slate-100 hover:text-slate-900",
    default: "bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90",
  };
  const sizes: any = {
    sm: "h-8 rounded-md px-3 text-xs",
    icon: "h-9 w-9",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant || 'default']} ${sizes[size || 'default']} ${className}`}
      title={title}
    >
      {children}
    </button>
  );
};

const TopBar = ({ toggleSidebar, isSidebarOpen, apiMode }: TopBarProps) => {
  const [status, setStatus] = useState<ServiceIntegrationStatus | null>(null);

  useEffect(() => {
    return aiRouterIntegration.subscribeToStatus((newStatus) => {
      setStatus(newStatus);
    });
  }, []);

  const getStatusDisplay = () => {
    if (apiMode === 'mock') {
      return {
        label: 'Demo',
        classes: 'bg-amber-100 text-amber-700 border-amber-200',
        dotClass: 'bg-amber-500 animate-pulse',
      };
    }

    const providerName = status?.checks?.provider_name || 'Service';

    if (!status || !status.healthy) {
      return {
        label: `${providerName} - Offline`,
        classes: 'bg-red-100 text-red-700 border-red-200',
        dotClass: 'bg-red-500',
      };
    }

    return {
      label: `${providerName} - Online`,
      classes: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      dotClass: 'bg-emerald-500',
    };
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-between shadow-sm z-20 relative">
      <div className="flex items-center gap-4 text-slate-800 font-semibold text-lg">
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

      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm shadow-indigo-200">
          <Bot size={20} />
        </div>
        <div className="leading-tight">
          <div className="flex items-center gap-2">
            ATARC Agentic AI Lab
            <div className="flex items-center gap-1.5">
              {apiMode && (
                <span
                  title={status?.error || statusDisplay.label}
                  className={`text-[10px] px-2 py-0.5 rounded-full border uppercase font-bold tracking-wider flex items-center gap-1.5 transition-all duration-300 ${statusDisplay.classes}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDisplay.dotClass}`}></span>
                  {statusDisplay.label}
                </span>
              )}
            </div>
          </div>
          <div className="text-[10px] text-gray-400 font-normal tracking-wide">
            PROPOSAL PREPPER WORKSPACE
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <LocalButton variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-slate-600">
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
        <LocalButton variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-slate-600">
          <Settings size={18} />
        </LocalButton>
        <Avatar className="h-9 w-9 text-xs border border-gray-100 shadow-sm cursor-pointer hover:ring-2 hover:ring-indigo-100 transition-all">
          <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold">AF</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default TopBar;

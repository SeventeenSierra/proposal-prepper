'use client';

import { Avatar, AvatarFallback, Bot, Button } from '@17sierra/ui';
import {
  Bell,
  Bell as BellIcon,
  Bot as BotIcon,
  HelpCircle,
  HelpCircle as HelpCircleIcon,
  PanelLeftClose,
  PanelLeftClose as PanelLeftCloseIcon,
  PanelLeftOpen,
  PanelLeftOpen as PanelLeftOpenIcon,
  Settings,
  Settings as SettingsIcon,
} from 'lucide-react'; // Fallback if missing in @17sierra/ui dist

type TopBarProps = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  apiMode?: 'real' | 'mock';
};

const TopBar = ({ toggleSidebar, isSidebarOpen, apiMode }: TopBarProps) => {
  return (
    <div className="bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-between shadow-sm z-20 relative">
      <div className="flex items-center gap-4 text-slate-800 font-semibold text-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-9 w-9 text-slate-500 hover:text-primary hover:bg-primary/5 transition-colors"
          title={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
        >
          {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </Button>

        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm shadow-indigo-200">
            <Bot size={20} />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              ATARC Agentic AI Lab
              <div className="flex items-center gap-1.5">
                <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full border border-slate-200 uppercase font-bold tracking-wider">
                  Alpha
                </span>
                {apiMode && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border uppercase font-bold tracking-wider ${
                      apiMode === 'mock'
                        ? 'bg-amber-100 text-amber-700 border-amber-200'
                        : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {apiMode === 'mock' ? 'Demo' : 'Live'}
                  </span>
                )}
              </div>
            </div>
            <div className="text-[10px] text-gray-400 font-normal tracking-wide">
              PROPOSAL PREPPER WORKSPACE
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-slate-600">
          <HelpCircle size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-slate-400 hover:text-slate-600 relative"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </Button>
        <div className="w-px h-6 bg-gray-200 mx-1"></div>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-slate-600">
          <Settings size={18} />
        </Button>
        <Avatar className="h-9 w-9 text-xs border border-gray-100 shadow-sm cursor-pointer hover:ring-2 hover:ring-indigo-100 transition-all">
          <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold">AF</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default TopBar;

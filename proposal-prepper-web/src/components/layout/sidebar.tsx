'use client';

import { Button } from '@17sierra/ui';
import {
  ChevronRight,
  Clock,
  FileText,
  History,
  MoreHorizontal,
  Plus,
  Star
} from 'lucide-react';
import { useState } from 'react';

type SidebarProps = {
  activeProject: string | null;
  setActiveProject: (id: string) => void;
  resetDemo: () => void;
  isOpen: boolean;
};

const Sidebar = ({ activeProject, setActiveProject, resetDemo, isOpen }: SidebarProps) => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div
      className={`bg-slate-50 border-gray-200 flex flex-col h-full shrink-0 transition-all duration-300 ease-in-out overflow-hidden shadow-inner ${isOpen ? 'w-[280px] border-r opacity-100' : 'w-0 border-r-0 opacity-0'
        }`}
    >
      <div className="w-[280px] flex flex-col h-full">
        <div className="p-4 pt-5 pb-2">
          <Button
            onClick={resetDemo}
            className="w-full text-sm font-medium shadow-sm bg-indigo-600 hover:bg-indigo-700 text-white transition-colors h-10 gap-2"
          >
            <Plus size={16} strokeWidth={2.5} />
            New Compliance Check
          </Button>
        </div>

        <div className="px-2 mt-2">
          <div className="flex p-1 bg-gray-200/50 rounded-lg mx-2 mb-2">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'all'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-gray-500 hover:text-slate-700 hover:bg-gray-200/50'
                }`}
            >
              <History size={12} /> Recent
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'favorites'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-gray-500 hover:text-slate-700 hover:bg-gray-200/50'
                }`}
            >
              <Star size={12} /> Saved
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
          <div className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
            <Clock size={10} /> Today
          </div>

          <div className="text-sm text-gray-400 italic px-2 py-4 text-center">
            No recent checks
          </div>
        </div>

        {/* User Profile / Config Section at bottom */}
        <div className="p-3 border-t border-gray-200 bg-slate-50">
          <div className="text-[10px] text-center text-gray-300 font-mono">v2.1.0-mesh</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

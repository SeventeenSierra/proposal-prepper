'use client';

import { Bug, FileUp, Settings, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui';

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? 'bg-black/20 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transition-all duration-300 transform ${
          isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <Settings size={20} className="text-gray-500" />
            <span>Settings</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-gray-400 hover:text-gray-600 rounded-full"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Development Tools</h3>
            <div className="grid grid-cols-1 gap-2">
              <Link href="/test-upload" onClick={onClose} className="block">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                    <FileUp size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-700">Test Upload</div>
                    <div className="text-xs text-gray-500">Verify file upload functionality</div>
                  </div>
                </div>
              </Link>

              <Link href="/debug-upload" onClick={onClose} className="block">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50 transition-all group">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-lg group-hover:scale-110 transition-transform">
                    <Bug size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-700">Debug Upload</div>
                    <div className="text-xs text-gray-500">Troubleshoot upload issues</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="pt-2">
             <div className="text-[10px] text-center text-gray-300 font-mono">
               Proposal Prepper v2.1.0-mesh
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

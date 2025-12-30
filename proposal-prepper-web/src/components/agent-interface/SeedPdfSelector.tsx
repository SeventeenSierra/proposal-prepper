/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

'use client';

import { ChevronDown } from 'lucide-react';
import type React from 'react';
import type { FARDocument } from '@/seed-data';
import type { SeedPdfInfo } from '@/types/agent-interface';

interface SeedPdfSelectorProps {
  activeSeeds: FARDocument[];
  selectedSeedPdf: SeedPdfInfo | null;
  isDemoMode: boolean;
  onSelect: (seed: SeedPdfInfo) => void;
  className?: string;
}

export function SeedPdfSelector({
  activeSeeds,
  selectedSeedPdf,
  isDemoMode,
  onSelect,
  className = '',
}: SeedPdfSelectorProps): React.JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const seed = activeSeeds.find((s) => s.id === e.target.value);
    if (seed) {
      onSelect({
        id: seed.id,
        name: seed.filename,
        displayName: seed.title,
      });
    }
  };

  return (
    <div className={`relative ${className}`}>
      <select
        value={selectedSeedPdf?.id || ''}
        onChange={handleChange}
        className="w-full py-2 px-3 border border-primary/30 rounded-lg text-xs font-bold bg-muted/50 hover:bg-muted transition-colors appearance-none cursor-pointer"
      >
        <option value="">Select a {isDemoMode ? 'presentation scenario' : 'test case'}...</option>
        {activeSeeds.map((seed) => (
          <option key={seed.id} value={seed.id}>
            {seed.title}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
    </div>
  );
}

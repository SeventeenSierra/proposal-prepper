// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import AgentInterface from '@/components/agent-interface';
import { apiConfig } from '@/services/config/app';

// Mock services/config
vi.mock('@/services/config/app', () => ({
    apiConfig: {
        useMockApis: true
    }
}));

vi.mock('@/services/upload-service', () => ({
    uploadService: {
        validateFile: vi.fn(),
        uploadDocument: vi.fn(),
    }
}));

vi.mock('@/services/analysis-service', () => ({
    analysisService: {
        startAnalysis: vi.fn(),
        setEventHandlers: vi.fn(),
        getActiveSessions: vi.fn(() => []),
    }
}));

describe('AgentInterface Live Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('should display "Demo" badge when useMockApis is true (default)', () => {
        render(
            <AgentInterface
                activeProject={null}
                onAnalysisStart={() => { }}
                onAnalysisComplete={() => { }}
                onAnalysisError={() => { }}
            />
        );

        expect(screen.getByText('Demo')).toBeInTheDocument();
    });

    it('should display "Real" badge when localStorage use-mock-api is false', () => {
        localStorage.setItem('use-mock-api', 'false');

        render(
            <AgentInterface
                activeProject={null}
                onAnalysisStart={() => { }}
                onAnalysisComplete={() => { }}
                onAnalysisError={() => { }}
            />
        );

        expect(screen.getByText('Real')).toBeInTheDocument();
    });

    it('should toggle badge when localStorage changes', async () => {
        const { rerender } = render(
            <AgentInterface
                activeProject={null}
                onAnalysisStart={() => { }}
                onAnalysisComplete={() => { }}
                onAnalysisError={() => { }}
            />
        );

        expect(screen.getByText('Demo')).toBeInTheDocument();

        // Simulate storage event
        localStorage.setItem('use-mock-api', 'false');
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'use-mock-api',
            newValue: 'false'
        }));

        expect(await screen.findByText('Real')).toBeInTheDocument();
    });
});

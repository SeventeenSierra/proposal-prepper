/*
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

import type { AnalysisResult, AnalysisSession } from '@/components/analysis/types';
import { AnalysisStatus } from '@/components/analysis/types';
import {
  getRandomSeedGrant,
  getSeedGrantByIdOrRandom,
  seedGrantToAnalysisResult,
  seedGrantToUploadSession,
} from '@/seed-data';
import type { UploadSession } from '@/types/app';
import { generateUUID } from '@/utils/crypto';
import { ErrorScenario } from './error-scenarios';

/**
 * Enhanced Mock Strands API for testing with real grant data
 * Provides realistic mock responses using real grant data from AATB dataset
 */

export class MockStrandsAPIEnhanced {
  private delay: number;
  private baseUrl: string;
  private errorScenario: ErrorScenario = ErrorScenario.NONE;

  constructor(baseUrl = 'http://localhost:8080', delay = 1000) {
    this.baseUrl = baseUrl;
    this.delay = delay;
  }

  /**
   * Create an instance tailored for a specific error scenario
   */
  static createErrorScenario(scenario: ErrorScenario, delay = 1000): MockStrandsAPIEnhanced {
    const api = new MockStrandsAPIEnhanced('http://localhost:8080', delay);
    api.errorScenario = scenario;
    return api;
  }

  /**
   * Simulate network delay
   */
  private async simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }

  /**
   * Mock file upload using seed data
   */
  async uploadFile(file: File): Promise<UploadSession> {
    await this.simulateDelay();

    if (this.errorScenario === ErrorScenario.NETWORK_ERROR) {
      throw new Error('Network error during upload');
    }

    if (this.errorScenario === ErrorScenario.SERVER_ERROR) {
      throw new Error('Internal Server Error');
    }

    if (this.errorScenario === ErrorScenario.TIMEOUT_ERROR) {
      throw new Error('Request timed out');
    }

    // Simulate upload validation
    if (!file.type.includes('pdf') || this.errorScenario === ErrorScenario.INVALID_FILE) {
      throw new Error('Only PDF files are supported');
    }

    if (file.size > 10 * 1024 * 1024 || this.errorScenario === ErrorScenario.FILE_TOO_LARGE) {
      // 10MB limit
      throw new Error('File size exceeds 10MB limit');
    }

    // Use seed data for realistic file names and metadata
    const seedGrant = getRandomSeedGrant();
    const uploadSession = seedGrantToUploadSession(seedGrant);

    // Override with actual file details but keep seed metadata
    return {
      ...uploadSession,
      filename: file.name,
      fileSize: file.size,
      mimeType: file.type,
    };
  }

  /**
   * Mock analysis start
   */
  async startAnalysis(proposalId: string): Promise<AnalysisSession> {
    await this.simulateDelay();

    if (this.errorScenario === ErrorScenario.NETWORK_ERROR) {
      throw new Error('Network error');
    }

    if (this.errorScenario === ErrorScenario.ANALYSIS_FAILED) {
      throw new Error('Analysis failed to start');
    }

    return {
      id: `analysis-${Date.now()}_${generateUUID().substring(0, 8)}`,
      proposalId,
      status: AnalysisStatus.ANALYZING,
      progress: 0,
      startedAt: new Date(),
      currentStep: 'Extracting text from document',
    };
  }

  /**
   * Mock analysis progress
   */
  async getAnalysisProgress(sessionId: string): Promise<AnalysisSession> {
    await this.simulateDelay();

    // Simulate progressive analysis
    const array = new Uint32Array(1);
    const cryptoObj = typeof window !== 'undefined' ? window.crypto : (typeof self !== 'undefined' ? self.crypto : (globalThis as any).crypto);
    if (cryptoObj) {
      cryptoObj.getRandomValues(array);
    }
    const randomVal = cryptoObj ? array[0] / (0xffffffff + 1) : Math.random();
    const progress = Math.min(100, Math.floor(randomVal * 100));
    const steps = [
      'Extracting text from document',
      'Analyzing compliance requirements',
      'Checking FAR/DFARS regulations',
      'Validating budget justifications',
      'Reviewing data management plans',
      'Generating compliance report',
      'Finalizing analysis',
    ];

    return {
      id: sessionId,
      proposalId: 'mock-proposal',
      status: progress === 100 ? AnalysisStatus.COMPLETED : AnalysisStatus.ANALYZING,
      progress,
      startedAt: new Date(Date.now() - 30000), // 30 seconds ago
      estimatedCompletion: new Date(Date.now() + 10000), // 10 seconds from now
      currentStep: steps[Math.floor((progress / 100) * steps.length)],
    };
  }

  /**
   * Mock analysis results using seed data
   */
  async getAnalysisResults(sessionId: string): Promise<AnalysisResult> {
    await this.simulateDelay();

    if (this.errorScenario === ErrorScenario.NETWORK_ERROR) {
      throw new Error('Network error');
    }

    if (this.errorScenario === ErrorScenario.VALIDATION_ERROR) {
      throw new Error('Validation error: Invalid session ID');
    }

    if (this.errorScenario === ErrorScenario.ANALYSIS_FAILED) {
      throw new Error('Analysis failed');
    }

    // Use sessionId to deterministically select a seed grant
    // This ensures consistent results for the same sessionId
    const seedGrant = getSeedGrantByIdOrRandom(sessionId);
    const result = seedGrantToAnalysisResult(seedGrant);

    // Override sessionId to match the requested one for consistency
    return {
      ...result,
      sessionId,
    };
  }

  /**
   * Get analysis results for a specific seed grant
   */
  async getAnalysisResultsForGrant(grantId: string): Promise<AnalysisResult> {
    await this.simulateDelay();

    if (this.errorScenario === ErrorScenario.VALIDATION_ERROR) {
      throw new Error('Validation error: Invalid grant ID');
    }

    // Use grantId to deterministically select a seed grant
    const seedGrant = getRandomSeedGrant();
    const result = seedGrantToAnalysisResult(seedGrant);

    // Override to use the requested grantId
    return {
      ...result,
      proposalId: grantId,
    };
  }

  /**
   * Mock health check
   */
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    await this.simulateDelay();
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Get available seed grants for testing
   */
  async getAvailableGrants(): Promise<
    Array<{ id: string; title: string; author: string; funder: string }>
  > {
    await this.simulateDelay();

    // This would be useful for testing different grant scenarios
    return [
      {
        id: '02ecd4f0-ac84-4cf4-8d10-1aed8faa6767',
        title: 'High Throughput pKa Prediction Using Semi Empirical Methods',
        author: 'Jan Jensen',
        funder: 'Danish National Science Foundation',
      },
      {
        id: '1b5d2213-4c72-4da8-a7b8-bece5b27d280',
        title: 'FAIR for Research Software projects',
        author: 'Michelle Barker',
        funder: 'Wellcome Trust',
      },
      {
        id: '4a81a377-e0e9-43b6-b301-7a3058b0d012',
        title:
          'Using metacommunity theory to assess the impact of multi-species interactions on gut microbial assembly',
        author: 'Mauna Dasari',
        funder: 'U.S. National Science Foundation (NSF)',
      },
    ];
  }
}

/**
 * Default enhanced mock API instance
 */
export const mockStrandsAPIEnhanced = new MockStrandsAPIEnhanced();

/**
 * Backward compatibility alias
 * @deprecated Use MockStrandsAPIEnhanced instead
 */
export const MockAnalysisEngineAPIEnhanced = MockStrandsAPIEnhanced;
export const mockAnalysisEngineAPIEnhanced = mockStrandsAPIEnhanced;

/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { analysisService } from '@/services/analysis-service';
import { resultsService } from '@/services/results-service';
import { generateUUID } from '@/utils/crypto';

describe('Real PDF Integration', () => {
	it('should process a mock PDF and return high-fidelity results', async () => {
		const proposalId = generateUUID();
		const file = new File(['%PDF-1.4 mock content'], 'real-style.pdf', { type: 'application/pdf' });

		const analysisResult = await analysisService.startAnalysis({
			proposalId,
			file
		});

		expect(analysisResult.success).toBe(true);
		const sessionId = analysisResult.sessionId;

		// Wait for completion (in tests we might need to wait or use fake timers)
		// For this integration test, we expect the mock service to be fast
		const resultsResponse = await resultsService.getResults(sessionId);
		expect(resultsResponse.success).toBe(true);
		expect(resultsResponse.results?.overallScore).toBeGreaterThan(0);
	});
});

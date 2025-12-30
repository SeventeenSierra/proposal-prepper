/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { uploadService } from '@/services/upload-service';
import { analysisService, AnalysisStatus } from '@/services/analysis-service';
import { resultsService } from '@/services/results-service';
import { generateUUID } from '@/utils/crypto';

// Use generateUUID for consistency
const TEST_PROPOSAL_ID = generateUUID();

describe('PDF Upload Integration', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should handle full upload and analysis lifecycle', async () => {
		const file = new File(['mock content'], 'test.pdf', { type: 'application/pdf' });

		// 1. Upload
		const uploadResult = await uploadService.uploadDocument(file);
		expect(uploadResult.success).toBe(true);

		// 2. Start Analysis
		const analysisResult = await analysisService.startAnalysis({
			proposalId: TEST_PROPOSAL_ID,
			file
		});
		expect(analysisResult.success).toBe(true);
		const sessionId = analysisResult.sessionId;

		// 3. Poll Status (Simulation)
		const statusResult = await analysisService.getAnalysisStatus(sessionId);
		expect(statusResult.success).toBe(true);

		// 4. Get Results
		const resultsResponse = await resultsService.getResults(sessionId);
		expect(resultsResponse.success).toBe(true);
		expect(resultsResponse.results).toBeDefined();
		expect(resultsResponse.results?.issues.length).toBeGreaterThan(0);
	});
});

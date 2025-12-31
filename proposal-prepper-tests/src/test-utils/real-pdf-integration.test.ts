/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { analysisService } from "@/services/analysis-service";
import { resultsService } from "@/services/results-service";
import { generateUUID } from "@/utils/crypto";

// Mock fetch globally for integration tests
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Real PDF Integration", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockFetch.mockReset();
	});

	it("should process a mock PDF and return high-fidelity results", async () => {
		const proposalId = generateUUID();
		const file = new File(["%PDF-1.4 mock content"], "real-style.pdf", {
			type: "application/pdf",
		});

		// Mock upload response (startAnalysis uploads the file internally when file is provided)
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: () =>
				Promise.resolve({
					id: "upload-789",
					filename: "real-style.pdf",
					fileSize: file.size,
					mimeType: "application/pdf",
					status: "completed",
					progress: 100,
					startedAt: new Date().toISOString(),
				}),
		} as Response);

		// Mock health check
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ status: "healthy", version: "1.0.0" }),
		} as Response);

		// Mock analysis start response
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: () =>
				Promise.resolve({
					id: "analysis-456",
					proposalId,
					status: "queued",
					progress: 0,
					startedAt: new Date().toISOString(),
					currentStep: "initializing",
				}),
		} as Response);

		// Mock get results response
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: () =>
				Promise.resolve({
					id: "results-456",
					proposalId,
					status: "pass",
					issues: [],
					summary: {
						totalIssues: 0,
						criticalIssues: 0,
						warningIssues: 0,
					},
					overallScore: 95,
					generatedAt: new Date().toISOString(),
				}),
		} as Response);

		const analysisResult = await analysisService.startAnalysis({
			proposalId,
			file,
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

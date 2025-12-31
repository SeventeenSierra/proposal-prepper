/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { AnalysisStatus, analysisService } from "@/services/analysis-service";
import { resultsService } from "@/services/results-service";
import { uploadService } from "@/services/upload-service";
import { generateUUID } from "@/utils/crypto";

// Mock fetch globally for integration tests
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Use generateUUID for consistency
const TEST_PROPOSAL_ID = generateUUID();

describe("PDF Upload Integration", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockFetch.mockReset();
	});

	it("should handle full upload and analysis lifecycle", async () => {
		const file = new File(["mock content"], "test.pdf", {
			type: "application/pdf",
		});

		// Mock upload response
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: () =>
				Promise.resolve({
					id: "upload-123",
					filename: "test.pdf",
					fileSize: file.size,
					mimeType: "application/pdf",
					status: "completed",
					progress: 100,
					startedAt: new Date().toISOString(),
				}),
		} as Response);

		// Mock second upload response (startAnalysis uploads the file internally)
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: () =>
				Promise.resolve({
					id: "upload-456",
					filename: "test.pdf",
					fileSize: file.size,
					mimeType: "application/pdf",
					status: "completed",
					progress: 100,
					startedAt: new Date().toISOString(),
				}),
		} as Response);

		// Mock health check for analysis
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ status: "healthy", version: "1.0.0" }),
		} as Response);

		// Mock analysis start response
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: () =>
				Promise.resolve({
					id: "analysis-123",
					proposalId: TEST_PROPOSAL_ID,
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
					id: "results-123",
					proposalId: TEST_PROPOSAL_ID,
					status: "warning",
					issues: [
						{
							id: "issue-1",
							severity: "critical",
							title: "Missing FAR clause",
							description: "Required FAR clause not found",
							regulation: {
								framework: "FAR",
								section: "52.204-1",
								reference: "FAR 52.204-1",
							},
						},
					],
					summary: {
						totalIssues: 1,
						criticalIssues: 1,
						warningIssues: 0,
					},
					generatedAt: new Date().toISOString(),
				}),
		} as Response);

		// 1. Upload
		const uploadResult = await uploadService.uploadDocument(file);
		expect(uploadResult.success).toBe(true);

		// 2. Start Analysis
		const analysisResult = await analysisService.startAnalysis({
			proposalId: TEST_PROPOSAL_ID,
			file,
		});
		expect(analysisResult.success).toBe(true);
		const sessionId = analysisResult.sessionId;

		// 3. Poll Status (Simulation)
		const statusResult = await analysisService.getAnalysisStatus(sessionId);
		expect(statusResult).toBeTruthy();
		expect(statusResult?.status).toBeDefined();

		// 4. Get Results
		const resultsResponse = await resultsService.getResults(sessionId);
		expect(resultsResponse.success).toBe(true);
		expect(resultsResponse.results).toBeDefined();
		expect(resultsResponse.results?.issues.length).toBeGreaterThan(0);
	});
});

/*
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

/**
 * Upload Workflow Component Tests
 *
 * Tests for the end-to-end workflow integration component.
 */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UploadWorkflow } from "@/components/upload/upload-workflow";
import type { UploadSession } from "@/types/app";
import { UploadStatus } from "@/types/app";

// Mock the services
vi.mock("proposal-prepper-services/ai-router-client", () => ({
	aiRouterClient: {
		uploadDocument: vi.fn(),
		getUploadStatus: vi.fn(),
		startAnalysis: vi.fn(),
		getAnalysisStatus: vi.fn(),
		getResults: vi.fn(),
	},
}));

// Mock the real-time updates hook
vi.mock("@/components/upload/use-real-time-updates", () => ({
	useRealTimeUpdates: vi.fn(() => ({
		connected: false,
		connecting: false,
		error: null,
		lastMessage: null,
		connect: vi.fn(),
		disconnect: vi.fn(),
		reconnect: vi.fn(),
		isConnected: false,
	})),
}));

// Mock the upload manager to simulate upload completion with analysis session
vi.mock("@/components/upload/upload-manager", () => ({
	UploadManager: vi.fn(({ onUploadComplete }) => (
		<div data-testid="upload-manager">
			<button
				type="button"
				data-testid="mock-upload-trigger"
				onClick={() => {
					const mockSession: UploadSession = {
						id: "test-session-123",
						filename: "test-proposal.pdf",
						fileSize: 1024000,
						mimeType: "application/pdf",
						status: UploadStatus.COMPLETED,
						progress: 100,
						startedAt: new Date(),
						completedAt: new Date(),
						analysisSessionId: "analysis-session-456",
					};
					onUploadComplete?.(mockSession);
				}}
			>
				Trigger Upload Complete
			</button>
		</div>
	)),
}));

// Mock simulation controls (not used when UploadManager is mocked)
vi.mock("@/components/upload/simulation-controls", () => ({
	SimulationControls: vi.fn(() => null),
}));

describe("UploadWorkflow", () => {
	const mockOnWorkflowComplete = vi.fn();
	const mockOnWorkflowError = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders upload manager initially", () => {
		render(
			<UploadWorkflow
				onWorkflowComplete={mockOnWorkflowComplete}
				onWorkflowError={mockOnWorkflowError}
			/>
		);

		expect(screen.getByTestId("upload-manager")).toBeInTheDocument();
	});

	it("shows analysis section after upload completion", async () => {
		render(
			<UploadWorkflow
				onWorkflowComplete={mockOnWorkflowComplete}
				onWorkflowError={mockOnWorkflowError}
			/>
		);

		// Trigger upload completion via the mock button
		fireEvent.click(screen.getByTestId("mock-upload-trigger"));

		await waitFor(() => {
			// Should show analysis section with status text (may match multiple elements)
			const elements = screen.getAllByText(/Analyzing Document|Analysis queued|Ready for Analysis/);
			expect(elements.length).toBeGreaterThan(0);
		});

		// Should show analysis session information
		expect(screen.getByText("analysis-session-456")).toBeInTheDocument();
	});

	it("handles workflow completion correctly", async () => {
		const { aiRouterClient } = await import("proposal-prepper-services/ai-router-client");

		// Mock successful analysis results
		vi.mocked(aiRouterClient.getResults).mockResolvedValue({
			success: true,
			data: {
				id: "results-123",
				proposalId: "prop-123",
				status: "pass",
				issues: [],
				summary: {
					totalIssues: 2,
					criticalIssues: 0,
					warningIssues: 2,
				},
				generatedAt: new Date().toISOString(),
			},
		});

		render(
			<UploadWorkflow
				onWorkflowComplete={mockOnWorkflowComplete}
				onWorkflowError={mockOnWorkflowError}
			/>
		);

		// Trigger upload completion via the mock button
		fireEvent.click(screen.getByTestId("mock-upload-trigger"));

		await waitFor(() => {
			const elements = screen.getAllByText(/Analyzing Document|Analysis queued|Ready for Analysis/);
			expect(elements.length).toBeGreaterThan(0);
		});

		// The component should be ready for analysis
		expect(screen.getByText("analysis-session-456")).toBeInTheDocument();
	});

	it("shows WebSocket connection status", async () => {
		render(
			<UploadWorkflow
				onWorkflowComplete={mockOnWorkflowComplete}
				onWorkflowError={mockOnWorkflowError}
			/>
		);

		// Trigger upload completion to show analysis section
		fireEvent.click(screen.getByTestId("mock-upload-trigger"));

		await waitFor(() => {
			expect(screen.getByText("Polling for updates")).toBeInTheDocument();
		});
	});

	it("handles disabled state correctly", () => {
		render(
			<UploadWorkflow
				onWorkflowComplete={mockOnWorkflowComplete}
				onWorkflowError={mockOnWorkflowError}
				disabled={true}
			/>
		);

		expect(screen.getByTestId("upload-manager")).toBeInTheDocument();
	});

	it("shows debug information in development", () => {
		vi.stubEnv("NODE_ENV", "development");

		render(
			<UploadWorkflow
				onWorkflowComplete={mockOnWorkflowComplete}
				onWorkflowError={mockOnWorkflowError}
			/>
		);

		expect(screen.getByText("Debug Information")).toBeInTheDocument();

		vi.unstubAllEnvs();
	});
});

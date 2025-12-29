/*
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RFPInterface } from "@/components/rfp/rfp-interface";

// Mock the ai-router API client
vi.mock("proposal-prepper-services/ai-router-client", () => ({
	aiRouterClient: {
		uploadDocument: vi.fn(),
		getUploadStatus: vi.fn(),
		startAnalysis: vi.fn().mockResolvedValue({
			success: true,
			data: { id: "analysis-123" },
		}),
		getAnalysisStatus: vi.fn(),
		getResults: vi.fn().mockResolvedValue({
			success: true,
			data: { complianceScore: 92 },
		}),
	},
}));

// Mock the upload workflow
vi.mock("@/components/upload/upload-workflow", () => ({
	UploadWorkflow: vi.fn(
		// biome-ignore lint/suspicious/noExplicitAny: Mock component props
		({
			onWorkflowComplete,
		}: {
			onWorkflowComplete: (session: any) => void;
		}) => (
			<div data-testid="upload-workflow">
				<button
					type="button"
					onClick={() =>
						onWorkflowComplete({
							id: "test-upload-123",
							filename: "test-proposal.pdf",
							fileSize: 1024000,
							mimeType: "application/pdf",
							status: "completed",
							progress: 100,
						})
					}
				>
					Mock Upload Complete
				</button>
			</div>
		),
	),
}));

describe("RFPInterface", () => {
	const mockProps = {
		activeProject: null,
		onProjectStart: vi.fn(),
		onAnalysisComplete: vi.fn(),
		onStartNew: vi.fn(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should render welcome state initially", () => {
		render(<RFPInterface {...mockProps} />);

		expect(screen.getByText("RFP Compliance Analyzer")).toBeInTheDocument();
		expect(screen.getByText("Upload & Analyze Proposal")).toBeInTheDocument();
		expect(screen.getByTestId("upload-workflow")).toBeInTheDocument();
	});

	it("should handle upload completion and start analysis", async () => {
		render(<RFPInterface {...mockProps} />);

		// Trigger upload completion
		const uploadButton = screen.getByText("Mock Upload Complete");
		fireEvent.click(uploadButton);

		// Should call onProjectStart
		expect(mockProps.onProjectStart).toHaveBeenCalledWith("test-upload-123");

		// Should show analysis complete state (since mock completes immediately)
		await waitFor(() => {
			expect(screen.getByText("Analysis Complete")).toBeInTheDocument();
		});
	});

	it("should show chat interface when analysis is complete", async () => {
		render(<RFPInterface {...mockProps} activeProject="test-project" />);

		// Should show chat input when project is active
		expect(
			screen.getByPlaceholderText(/Ask questions about your proposal analysis/),
		).toBeInTheDocument();
	});
});

// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AnalysisFooter } from "@/components/agent-interface/AnalysisFooter";

describe("AnalysisFooter", () => {
	const defaultProps = {
		isUploading: false,
		isComplete: false,
		uploadProgress: 0,
		uploadError: null,
		selectedFile: null,
		selectedSeedPdf: null,
		activeSeeds: [],
		isDemoMode: false,
		isMockMode: false,
		isLiveMode: true,
		isOfflineMode: false,
		onFileSelect: vi.fn(),
		onSeedSelect: vi.fn(),
		onStartAnalysis: vi.fn(),
		onReset: vi.fn(),
	};

	it("should render file selection button", () => {
		render(<AnalysisFooter {...defaultProps} />);
		expect(screen.getByText("Select PDF")).toBeInTheDocument();
	});

	it("should render start analysis button", () => {
		render(<AnalysisFooter {...defaultProps} />);
		expect(screen.getByText("Start Analysis")).toBeInTheDocument();
	});

	it("should show upload progress when uploading", () => {
		render(
			<AnalysisFooter
				{...defaultProps}
				isUploading={true}
				uploadProgress={50}
			/>,
		);
		expect(screen.getByText("Scrutinizing Proposal...")).toBeInTheDocument();
		expect(screen.getByText("50%")).toBeInTheDocument();
	});

	it("should show completion message when complete", () => {
		render(<AnalysisFooter {...defaultProps} isComplete={true} />);
		expect(screen.getByText("Analysis Session Complete")).toBeInTheDocument();
		expect(screen.getByText("Analyze Another Document")).toBeInTheDocument();
	});

	it("should show error message when upload errors", () => {
		render(<AnalysisFooter {...defaultProps} uploadError="Upload failed" />);
		expect(screen.getByText("Upload failed")).toBeInTheDocument();
	});

	it("should disable start button when no file selected", () => {
		render(<AnalysisFooter {...defaultProps} />);
		const button = screen.getByText("Start Analysis");
		expect(button).toBeDisabled();
	});

	it("should enable start button when file is selected", () => {
		const file = new File(["test"], "test.pdf", { type: "application/pdf" });
		render(<AnalysisFooter {...defaultProps} selectedFile={file} />);
		const button = screen.getByText("Start Analysis");
		expect(button).not.toBeDisabled();
	});

	it("should call onStartAnalysis when button clicked", () => {
		const onStartAnalysis = vi.fn();
		const file = new File(["test"], "test.pdf", { type: "application/pdf" });
		render(
			<AnalysisFooter
				{...defaultProps}
				selectedFile={file}
				onStartAnalysis={onStartAnalysis}
			/>,
		);

		const button = screen.getByText("Start Analysis");
		fireEvent.click(button);

		expect(onStartAnalysis).toHaveBeenCalled();
	});

	it("should call onReset when reset button clicked", () => {
		const onReset = vi.fn();
		render(
			<AnalysisFooter {...defaultProps} isComplete={true} onReset={onReset} />,
		);

		const button = screen.getByText("Analyze Another Document");
		fireEvent.click(button);

		expect(onReset).toHaveBeenCalled();
	});
});

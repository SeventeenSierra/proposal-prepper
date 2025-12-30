// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AgentInterface from "@/components/agent-interface";

// Mock dependencies
vi.mock("@/hooks/useMockAnalysis", () => ({
	useMockAnalysis: () => ({
		simulateAnalysis: vi.fn(),
	}),
}));

vi.mock("@/hooks/useAnalysisFlow", () => ({
	useAnalysisFlow: () => ({
		startAnalysis: vi.fn(),
	}),
}));

// Mock fetch for health check
global.fetch = vi.fn();

beforeEach(() => {
	vi.clearAllMocks();
	(global.fetch as any).mockResolvedValue({
		ok: true,
		json: async () => ({ status: "healthy", integration_status: "connected" }),
	});
	Element.prototype.scrollIntoView = vi.fn();
});

describe("AgentInterface (index.tsx)", () => {
	const defaultProps = {
		onAnalysisStart: vi.fn(),
		onAnalysisComplete: vi.fn(),
		onAnalysisError: vi.fn(),
		connectionMode: "mock" as const,
	};

	it("should render component with header", () => {
		render(<AgentInterface {...defaultProps} />);
		expect(screen.getByText("Compliance Officer")).toBeInTheDocument();
	});

	it("should render initial bot message", () => {
		render(<AgentInterface {...defaultProps} />);
		expect(
			screen.getByText(/Hello! I am your AI compliance officer/i),
		).toBeInTheDocument();
	});

	it("should render Intelligence Feed and Analysis Steps tabs", () => {
		render(<AgentInterface {...defaultProps} />);
		expect(screen.getByText("Intelligence Feed")).toBeInTheDocument();
		expect(screen.getByText("Analysis Steps")).toBeInTheDocument();
	});

	it("should switch tabs when clicked", () => {
		render(<AgentInterface {...defaultProps} />);

		const stepsTab = screen.getByText("Analysis Steps");
		fireEvent.click(stepsTab);

		// AnalysisSteps component should be rendered
		const tabButton = screen.getByText("Analysis Steps");
		expect(tabButton.className).toContain("text-primary");
	});

	it("should render start analysis button", () => {
		render(<AgentInterface {...defaultProps} />);
		expect(screen.getByText("Start Analysis")).toBeInTheDocument();
	});

	it("should check API health on mount", async () => {
		render(<AgentInterface {...defaultProps} />);

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith("/api/health");
		});
	});

	it("should render in demo mode", () => {
		render(<AgentInterface {...defaultProps} connectionMode="demo" />);
		// In demo mode, should show seed selector
		expect(screen.getByRole("combobox")).toBeInTheDocument();
	});

	it("should render in live mode", () => {
		render(
			<AgentInterface {...defaultProps} connectionMode="analysis-router" />,
		);
		// In live mode, should show file selector
		expect(screen.getByText("Select PDF")).toBeInTheDocument();
	});

	it("should update messages when file is selected", async () => {
		const { container } = render(
			<AgentInterface {...defaultProps} connectionMode="analysis-router" />,
		);

		const fileInput = container.querySelector('input[type="file"]');
		const file = new File(["test"], "test.pdf", { type: "application/pdf" });

		if (fileInput) {
			fireEvent.change(fileInput, { target: { files: [file] } });

			await waitFor(() => {
				expect(screen.getByText("Selected file: test.pdf")).toBeInTheDocument();
			});
		}
	});
});

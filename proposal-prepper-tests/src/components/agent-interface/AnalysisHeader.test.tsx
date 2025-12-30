// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnalysisHeader } from "@/components/agent-interface/AnalysisHeader";

describe("AnalysisHeader", () => {
	it("should render component title and description", () => {
		render(<AnalysisHeader apiStatus={{ isConnected: true, isMock: false }} />);

		expect(screen.getByText("Compliance Officer")).toBeInTheDocument();
		expect(
			screen.getByText(/NSF PAPPG & FAR\/DFARS Expert/),
		).toBeInTheDocument();
	});

	it('should show "DEMO MODE" badge when in mock mode', () => {
		render(<AnalysisHeader apiStatus={{ isConnected: true, isMock: true }} />);

		expect(screen.getByText("DEMO MODE")).toBeInTheDocument();
	});

	it('should show "REAL AI ACTIVATED" badge when not in mock mode', () => {
		render(<AnalysisHeader apiStatus={{ isConnected: true, isMock: false }} />);

		expect(screen.getByText("REAL AI ACTIVATED")).toBeInTheDocument();
	});

	it("should render Shield icon", () => {
		const { container } = render(
			<AnalysisHeader apiStatus={{ isConnected: true, isMock: false }} />,
		);

		// Shield icon should be present in the header
		const icons = container.querySelectorAll("svg");
		expect(icons.length).toBeGreaterThan(0);
	});
});

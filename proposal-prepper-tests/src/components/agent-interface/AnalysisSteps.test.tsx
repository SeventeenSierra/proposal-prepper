// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnalysisSteps } from "@/components/agent-interface/AnalysisSteps";
import type { Step } from "@/types/agent-interface";

describe("AnalysisSteps", () => {
	it("should render all steps", () => {
		const steps: Step[] = [
			{ id: 1, message: "Step 1", agent: "coordinator", status: "complete" },
			{ id: 2, message: "Step 2", agent: "compliance", status: "running" },
		];
		render(<AnalysisSteps steps={steps} />);

		expect(screen.getByText("Step 1")).toBeInTheDocument();
		expect(screen.getByText("Step 2")).toBeInTheDocument();
		expect(screen.getAllByText(/COORDINATOR|COMPLIANCE/i).length).toBe(2);
	});

	it("should show step details when provided", () => {
		const steps: Step[] = [
			{
				id: 1,
				message: "Upload",
				agent: "rag",
				status: "complete",
				details: "File uploaded successfully",
			},
		];
		render(<AnalysisSteps steps={steps} />);

		expect(screen.getByText("File uploaded successfully")).toBeInTheDocument();
	});

	it("should render correct icons for different statuses", () => {
		const steps: Step[] = [
			{ id: 1, message: "Complete", agent: "coordinator", status: "complete" },
			{ id: 2, message: "Running", agent: "rag", status: "running" },
			{ id: 3, message: "Error", agent: "compliance", status: "error" },
			{ id: 4, message: "Pending", agent: "writer", status: "pending" },
		];
		const { container } = render(<AnalysisSteps steps={steps} />);

		const greenIcons = container.querySelectorAll(".text-green-500");
		const blueIcons = container.querySelectorAll(".text-blue-500");
		const redIcons = container.querySelectorAll(".text-red-500");

		expect(greenIcons.length).toBeGreaterThan(0);
		expect(blueIcons.length).toBeGreaterThan(0);
		expect(redIcons.length).toBeGreaterThan(0);
	});
});

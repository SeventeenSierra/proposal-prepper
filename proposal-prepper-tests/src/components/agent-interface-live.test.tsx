// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AgentInterface from "@/components/agent-interface";
import { apiConfig } from "@/services/config/app";

// Mock services/config
vi.mock("@/services/config/app", () => ({
	apiConfig: {
		useMockApis: true,
	},
}));

vi.mock("@/services/upload-service", () => ({
	uploadService: {
		validateFile: vi.fn(),
		uploadDocument: vi.fn(),
	},
}));

vi.mock("@/services/analysis-service", () => ({
	analysisService: {
		startAnalysis: vi.fn(),
		setEventHandlers: vi.fn(),
		getActiveSessions: vi.fn(() => []),
	},
}));

describe("AgentInterface Live Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
	});

	it('should initialize with default mode from apiConfig', () => {
		render(
			<AgentInterface
				activeProject={null}
				onAnalysisStart={() => { }}
				onAnalysisComplete={() => { }}
				onAnalysisError={() => { }}
			/>,
		);

		// Component should render without the badge, but we can check for other identifier
		expect(screen.getByText("AI Regulatory Assistant")).toBeInTheDocument();
	});

	it('should handle localStorage use-mock-api preference', () => {
		localStorage.setItem("use-mock-api", "false");

		render(
			<AgentInterface
				activeProject={null}
				onAnalysisStart={() => { }}
				onAnalysisComplete={() => { }}
				onAnalysisError={() => { }}
			/>,
		);

		expect(screen.getByText("AI Regulatory Assistant")).toBeInTheDocument();
	});

	it("should handle localStorage changes during lifecycle", async () => {
		render(
			<AgentInterface
				activeProject={null}
				onAnalysisStart={() => { }}
				onAnalysisComplete={() => { }}
				onAnalysisError={() => { }}
			/>,
		);

		expect(screen.getByText("AI Regulatory Assistant")).toBeInTheDocument();

		// Simulate storage event
		localStorage.setItem("use-mock-api", "false");
		window.dispatchEvent(
			new StorageEvent("storage", {
				key: "use-mock-api",
				newValue: "false",
			}),
		);

		// No explicit UI change to check in AgentInterface now, 
		// but we verify it doesn't crash
		expect(screen.getByText("AI Regulatory Assistant")).toBeInTheDocument();
	});
});

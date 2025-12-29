// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import { render, screen, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TopBar from "@/components/layout/top-bar";
import { aiRouterIntegration } from "proposal-prepper-services";

// Mock @17sierra/ui to avoid issues with missing dist
vi.mock("@17sierra/ui", () => ({
	Button: ({ children, onClick, title, className }: any) => (
		<button onClick={onClick} title={title} className={className}>
			{children}
		</button>
	),
	Avatar: ({ children }: any) => <div>{children}</div>,
	AvatarFallback: ({ children }: any) => <div>{children}</div>,
	Bot: () => <div data-testid="bot-icon" />,
}));

// Mock proposal-prepper-services
vi.mock("proposal-prepper-services", () => {
	let statusCallback: (status: any) => void;
	return {
		aiRouterIntegration: {
			subscribeToStatus: vi.fn((cb) => {
				statusCallback = cb;
				return () => { };
			}),
			// Helper for the test to trigger status changes
			_triggerStatusChange: (status: any) => {
				if (statusCallback) statusCallback(status);
			},
		},
	};
});

describe("TopBar Status Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should display "Demo: Manual" badge when connectionMode is mock', () => {
		render(
			<TopBar toggleSidebar={() => { }} isSidebarOpen={true} connectionMode="mock" setConnectionMode={() => { }} />,
		);

		expect(screen.getByText("Demo: Manual")).toBeInTheDocument();
	});

	it('should display "Router: Local" when healthy in router mode (local)', () => {
		render(
			<TopBar toggleSidebar={() => { }} isSidebarOpen={true} connectionMode="analysis-router" setConnectionMode={() => { }} />,
		);

		// Manually trigger the healthy status
		act(() => {
			(aiRouterIntegration as any)._triggerStatusChange({ healthy: true, activeProvider: 'local-llama' });
		});

		expect(screen.getByText("Router: Local")).toBeInTheDocument();
	});

	it('should display "Router Offline" when unhealthy in cloud mode', () => {
		render(
			<TopBar toggleSidebar={() => { }} isSidebarOpen={true} connectionMode="analysis-router" setConnectionMode={() => { }} />,
		);

		// Manually trigger unhealthy status
		act(() => {
			(aiRouterIntegration as any)._triggerStatusChange({
				healthy: false,
				activeProvider: 'aws-bedrock',
				error: "Connection Refused",
			});
		});

		expect(screen.getByText("Router Offline")).toBeInTheDocument();
	});
});

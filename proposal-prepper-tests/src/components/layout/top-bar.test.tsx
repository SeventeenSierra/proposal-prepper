// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import { act, render, screen } from "@testing-library/react";
import { aiRouterIntegration } from "proposal-prepper-services";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TopBar from "@/components/layout/top-bar";

// Mock @17sierra/ui to avoid issues with missing dist
type MockButtonProps = {
	children?: React.ReactNode;
	onClick?: () => void;
	title?: string;
	className?: string;
};

type MockChildrenProps = {
	children?: React.ReactNode;
};

vi.mock("@17sierra/ui", () => ({
	Button: ({ children, onClick, title, className }: MockButtonProps) => (
		<button type="button" onClick={onClick} title={title} className={className}>
			{children}
		</button>
	),
	Avatar: ({ children }: MockChildrenProps) => <div>{children}</div>,
	AvatarFallback: ({ children }: MockChildrenProps) => <div>{children}</div>,
	Bot: () => <div data-testid="bot-icon" />,
}));

// Mock proposal-prepper-services
type AIRouterStatus = {
	healthy: boolean;
	activeProvider?: string;
	error?: string;
};

vi.mock("proposal-prepper-services", () => {
	let statusCallback: (status: AIRouterStatus) => void;
	return {
		aiRouterIntegration: {
			subscribeToStatus: vi.fn((cb: (status: AIRouterStatus) => void) => {
				statusCallback = cb;
				return () => {};
			}),
			// Helper for the test to trigger status changes
			_triggerStatusChange: (status: AIRouterStatus) => {
				if (statusCallback) statusCallback(status);
			},
		},
	};
});

describe("TopBar Status Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should display "Test Mode (Mock)" badge when connectionMode is mock', () => {
		render(
			<TopBar
				toggleSidebar={() => {}}
				isSidebarOpen={true}
				connectionMode="mock"
				setConnectionMode={() => {}}
			/>
		);

		expect(screen.getByText("Test Mode (Mock)")).toBeInTheDocument();
	});

	it('should display "Router: Local" when healthy in router mode (local)', () => {
		render(
			<TopBar
				toggleSidebar={() => {}}
				isSidebarOpen={true}
				connectionMode="analysis-router"
				setConnectionMode={() => {}}
			/>
		);

		// Manually trigger the healthy status
		act(() => {
			(
				aiRouterIntegration as {
					_triggerStatusChange: (status: AIRouterStatus) => void;
				}
			)._triggerStatusChange({
				healthy: true,
				activeProvider: "local-llama",
			});
		});

		expect(screen.getByText("Router: Local")).toBeInTheDocument();
	});

	it('should display "Live Mode (AI Router)" when unhealthy in cloud mode', () => {
		render(
			<TopBar
				toggleSidebar={() => {}}
				isSidebarOpen={true}
				connectionMode="analysis-router"
				setConnectionMode={() => {}}
			/>
		);

		// Manually trigger unhealthy status
		act(() => {
			(
				aiRouterIntegration as {
					_triggerStatusChange: (status: AIRouterStatus) => void;
				}
			)._triggerStatusChange({
				healthy: false,
				activeProvider: "aws-bedrock",
				error: "Connection Refused",
			});
		});

		expect(screen.getByText("Live Mode (AI Router)")).toBeInTheDocument();
	});
});

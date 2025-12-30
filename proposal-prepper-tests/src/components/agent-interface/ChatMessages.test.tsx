// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChatMessages } from "@/components/agent-interface/ChatMessages";
import type { Message } from "@/types/agent-interface";

// Mock scrollIntoView
beforeEach(() => {
	Element.prototype.scrollIntoView = vi.fn();
});

describe("ChatMessages", () => {
	it("should render empty state when no messages", () => {
		const { container } = render(<ChatMessages messages={[]} />);
		const messageElements = container.querySelectorAll(".rounded-2xl");
		expect(messageElements.length).toBe(0);
	});

	it("should render user messages on the right", () => {
		const messages: Message[] = [{ role: "user", content: "Hello AI" }];
		render(<ChatMessages messages={messages} />);

		expect(screen.getByText("Hello AI")).toBeInTheDocument();
		const messageEl = screen.getByText("Hello AI").closest(".flex");
		expect(messageEl?.className).toContain("justify-end");
	});

	it("should render assistant messages on the left", () => {
		const messages: Message[] = [{ role: "bot", content: "Hello user" }];
		render(<ChatMessages messages={messages} />);

		expect(screen.getByText("Hello user")).toBeInTheDocument();
		const messageEl = screen.getByText("Hello user").closest(".flex");
		expect(messageEl?.className).toContain("justify-start");
	});

	it("should render multiple messages in order", () => {
		const messages: Message[] = [
			{ role: "user", content: "Question 1" },
			{ role: "bot", content: "Answer 1" },
			{ role: "user", content: "Question 2" },
		];
		render(<ChatMessages messages={messages} />);

		expect(screen.getByText("Question 1")).toBeInTheDocument();
		expect(screen.getByText("Answer 1")).toBeInTheDocument();
		expect(screen.getByText("Question 2")).toBeInTheDocument();
	});

	it("should call scrollIntoView on messages update", () => {
		const messages: Message[] = [{ role: "user", content: "Test" }];
		render(<ChatMessages messages={messages} />);

		expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
	});
});

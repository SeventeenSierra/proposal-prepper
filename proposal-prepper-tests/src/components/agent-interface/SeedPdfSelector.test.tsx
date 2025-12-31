// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SeedPdfSelector } from "@/components/agent-interface/SeedPdfSelector";
import type { FARDocument } from "@/seed-data";

describe("SeedPdfSelector", () => {
	const mockSeeds: FARDocument[] = [
		{
			id: "seed1",
			filename: "test1.pdf",
			title: "Test Document 1",
			category: "demo",
			description: "Test description 1",
		},
		{
			id: "seed2",
			filename: "test2.pdf",
			title: "Test Document 2",
			category: "test",
			description: "Test description 2",
		},
	];

	it("should render selector with placeholder", () => {
		render(
			<SeedPdfSelector
				activeSeeds={mockSeeds}
				selectedSeedPdf={null}
				isDemoMode={true}
				onSelect={vi.fn()}
			/>
		);

		expect(screen.getByRole("combobox")).toBeInTheDocument();
		expect(screen.getByText(/Select a presentation scenario/i)).toBeInTheDocument();
	});

	it("should render all seed options", () => {
		render(
			<SeedPdfSelector
				activeSeeds={mockSeeds}
				selectedSeedPdf={null}
				isDemoMode={false}
				onSelect={vi.fn()}
			/>
		);

		expect(screen.getByText("Test Document 1")).toBeInTheDocument();
		expect(screen.getByText("Test Document 2")).toBeInTheDocument();
	});

	it("should call onSelect when option is chosen", () => {
		const onSelect = vi.fn();
		render(
			<SeedPdfSelector
				activeSeeds={mockSeeds}
				selectedSeedPdf={null}
				isDemoMode={true}
				onSelect={onSelect}
			/>
		);

		const select = screen.getByRole("combobox");
		fireEvent.change(select, { target: { value: "seed1" } });

		expect(onSelect).toHaveBeenCalledWith({
			id: "seed1",
			name: "test1.pdf",
			displayName: "Test Document 1",
		});
	});

	it("should show selected seed", () => {
		render(
			<SeedPdfSelector
				activeSeeds={mockSeeds}
				selectedSeedPdf={{
					id: "seed1",
					name: "test1.pdf",
					displayName: "Test Document 1",
				}}
				isDemoMode={true}
				onSelect={vi.fn()}
			/>
		);

		const select = screen.getByRole("combobox") as HTMLSelectElement;
		expect(select.value).toBe("seed1");
	});
});

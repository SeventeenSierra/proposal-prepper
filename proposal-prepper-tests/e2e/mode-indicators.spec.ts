// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import { expect, test } from "@playwright/test";

test.describe("UI Mode Indicators (Demo/Real)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("should show Demo badge by default", async ({ page }) => {
		// Navigate to agent interface
		const newCheckButton = page.getByRole("button", {
			name: "New Compliance Check",
		});
		await newCheckButton.click();

		// Check for Demo badge
		const demoBadge = page.getByText("Demo", { exact: true }).first();
		await expect(demoBadge).toBeVisible();
		await expect(demoBadge).toContainText("Demo");
	});

	test("should show Real badge when use-mock-api is false", async ({ page }) => {
		// Set localStorage
		await page.evaluate(() => {
			localStorage.setItem("use-mock-api", "false");
		});

		// Reload to apply changes
		await page.reload();

		// Navigate to agent interface
		const newCheckButton = page.getByRole("button", {
			name: "New Compliance Check",
		});
		await newCheckButton.click();

		// Check for Real badge
		const realBadge = page.getByText("Real", { exact: true }).first();
		await expect(realBadge).toBeVisible();
		await expect(realBadge).toContainText("Real");
	});

	test("should switch back to Demo badge when use-mock-api is true", async ({ page }) => {
		// Set to real first
		await page.evaluate(() => {
			localStorage.setItem("use-mock-api", "false");
		});
		await page.reload();

		const newCheckButton = page.getByRole("button", {
			name: "New Compliance Check",
		});
		await newCheckButton.click();

		await expect(page.getByText("Real", { exact: true }).first()).toBeVisible();

		// Switch back to mock
		await page.evaluate(() => {
			localStorage.setItem("use-mock-api", "true");
		});

		// My implementation has a storage event listener, but usually needs a reload for full effect
		// Let's test if it updates without reload first (since I added the listener)
		const demoBadge = page.getByText("Demo", { exact: true }).first();
		await expect(demoBadge).toBeVisible();
	});
});

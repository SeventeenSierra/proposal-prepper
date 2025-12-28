// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import { expect, test } from "@playwright/test";

test("Full Proposal Analysis Flow Verification", async ({ page }) => {
	test.setTimeout(90000); // 90 seconds for containerized environment
	// 1. Launch the application
	await page.goto("/");
	await expect(page).toHaveTitle(/GovCheck AI/);

	// 2. Open the Agent Interface (New Compliance Check)
	const newCheckButton = page.getByRole("button", {
		name: "New Compliance Check",
	});
	await expect(newCheckButton).toBeVisible();
	await newCheckButton.click();

	// 3. Automate file selection
	console.log("Automating file selection...");
	const fileChooserPromise = page.waitForEvent("filechooser");
	await page.getByRole("button", { name: "Select Proposal PDF" }).click();
	const fileChooser = await fileChooserPromise;

	// Use a seed file from the project
	const seedFilePath =
		"/Users/afla/Documents/proposal-prepper/proposal-prepper-web/src/seed-data/barker_michelle_2020_1b5d2213-4c72-4da8-a7b8-bece5b27d280_PROPOSAL_1.pdf";
	await fileChooser.setFiles(seedFilePath);

	// 4. Trigger the analysis automatically
	const startAnalysisButton = page.getByRole("button", {
		name: "Start Compliance Analysis",
	});
	await expect(startAnalysisButton).toBeVisible();
	await startAnalysisButton.click();

	// 5. Monitor progress steps
	// We wait for the steps container to appear
	await expect(page.locator("div.space-y-4")).toBeVisible({ timeout: 10000 });

	const steps = [
		"Document Upload",
		"Text Extraction",
		"Compliance Analysis",
		"Validation Check",
		"Report Generation",
	];

	for (const stepName of steps) {
		console.log(`Verifying step: ${stepName}`);
		// Find the specific card by its name (case-insensitive)
		const stepContainer = page
			.locator("div.flex.gap-3")
			.filter({ hasText: new RegExp(stepName, "i") })
			.first();

		// Wait for the step to be running or complete
		await expect(stepContainer).toBeVisible({ timeout: 30000 });

		// Wait for completion (green icon)
		const greenIcon = stepContainer.locator("svg.text-green-500");
		const errorIcon = stepContainer.locator("svg.text-red-500");

		// Poll for status change
		await expect(async () => {
			if (await errorIcon.isVisible()) {
				throw new Error(
					`Flow interrupted: Error (RED) detected in step "${stepName}"`,
				);
			}
			expect(await greenIcon.isVisible()).toBeTruthy();
		}).toPass({ timeout: 60000, intervals: [1000] });

		console.log(`Step "${stepName}" completed successfully.`);
	}

	// 6. Verify final results
	await expect(page.getByText("Analysis Complete")).toBeVisible({
		timeout: 10000,
	});

	// Check for the results summary in the chat tab
	await page.getByRole("button", { name: "Results & Chat" }).click();
	await expect(page.getByText(/Analysis complete/)).toBeVisible();
	await expect(page.getByText(/compliance score/)).toBeVisible();
});

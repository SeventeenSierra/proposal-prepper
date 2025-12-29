// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import type { Meta, StoryObj } from "@storybook/react";
import ReportPreview from "@/components/reports/report-preview";

const meta: Meta<typeof ReportPreview> = {
	title: "App/ReportPreview",
	component: ReportPreview,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {
		isVisible: { control: "boolean" },
	},
};

export default meta;
type Story = StoryObj<typeof ReportPreview>;

export const Visible: Story = {
	args: {
		isVisible: true,
	},
};

export const Hidden: Story = {
	args: {
		isVisible: false,
	},
};

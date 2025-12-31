// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		exclude: ["**/node_modules/**", "**/dist/**", "**/e2e/**", "**/.next/**", "**/.direnv/**"],
		// Ensure TypeScript declarations are properly loaded
		typecheck: {
			tsconfig: "./tsconfig.json",
		},
	},
	resolve: {
		alias: {
			"@/services": path.resolve(__dirname, "../proposal-prepper-services/src"),
			"@": path.resolve(__dirname, "../proposal-prepper-web/src"),
			"proposal-prepper-services": path.resolve(__dirname, "../proposal-prepper-services/src"),
		},
		dedupe: ["react", "react-dom"],
	},
});

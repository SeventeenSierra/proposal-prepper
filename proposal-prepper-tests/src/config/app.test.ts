// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import { describe, expect, it } from "vitest";
import {
	analysisConfig,
	apiConfig,
	errorConfig,
	uploadConfig,
	validationConfig,
} from "@/config/app";

describe("Application Configuration", () => {
	describe("uploadConfig", () => {
		it("should have correct PDF acceptance configuration", () => {
			expect(uploadConfig.acceptedTypes).toContain("application/pdf");
			expect(uploadConfig.maxFileSize).toBe(50 * 1024 * 1024); // 50MB
			expect(uploadConfig.minFileSize).toBe(1024); // 1KB
		});
	});

	describe("apiConfig", () => {
		it("should have correct service URLs", () => {
			if (typeof window !== "undefined") {
				// In browser/jsdom, default is usually empty string (relative path)
				// But in container tests, it might pick up the env var
				const isRelative = apiConfig.engineBaseUrl === "";
				const isServerUrl = apiConfig.engineBaseUrl.includes("8080");
				expect(isRelative || isServerUrl).toBe(true);
			} else {
				expect(apiConfig.engineBaseUrl).toContain("8080");
			}
		});

		it("should have WebSocket configuration", () => {
			expect(apiConfig.websocket.reconnectInterval).toBeGreaterThan(0);
			expect(apiConfig.websocket.maxReconnectAttempts).toBeGreaterThan(0);
		});
	});

	describe("validationConfig", () => {
		it("should have filename validation rules", () => {
			expect(validationConfig.maxFilenameLength).toBeGreaterThan(0);
			expect(validationConfig.filenamePattern).toBeInstanceOf(RegExp);
		});

		it("should validate valid filenames", () => {
			expect(validationConfig.filenamePattern.test("proposal.pdf")).toBe(true);
			expect(validationConfig.filenamePattern.test("test-file_v1.pdf")).toBe(
				true,
			);
		});

		it("should reject invalid filenames", () => {
			expect(validationConfig.filenamePattern.test("file/with/slash.pdf")).toBe(
				false,
			);
			expect(
				validationConfig.filenamePattern.test("file with spaces.pdf"),
			).toBe(false);
		});
	});

	describe("errorConfig", () => {
		it("should have error codes defined", () => {
			expect(errorConfig.codes.UPLOAD_FAILED).toBeDefined();
			expect(errorConfig.codes.VALIDATION_FAILED).toBeDefined();
			expect(errorConfig.codes.NETWORK_ERROR).toBeDefined();
			expect(errorConfig.codes.TIMEOUT_ERROR).toBeDefined();
		});

		it("should have default error message", () => {
			expect(errorConfig.defaultErrorMessage).toBeDefined();
			expect(typeof errorConfig.defaultErrorMessage).toBe("string");
		});
	});
});

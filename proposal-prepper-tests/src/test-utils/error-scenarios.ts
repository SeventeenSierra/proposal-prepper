/*
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

/**
 * Error scenarios for testing
 */
export enum ErrorScenario {
    NONE = 'none',
    NETWORK_ERROR = 'network_error',
    SERVER_ERROR = 'server_error',
    TIMEOUT = 'timeout',
    TIMEOUT_ERROR = 'timeout', // Alias for compatibility
    ANALYSIS_FAILED = 'analysis_failed',
    UPLOAD_FAILED = 'upload_failed',
    VALIDATION_ERROR = 'validation_error',
    INVALID_FILE = 'invalid_file',
    FILE_TOO_LARGE = 'file_too_large',
}

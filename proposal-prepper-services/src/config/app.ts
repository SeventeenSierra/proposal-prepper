/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

export type ConnectionMode = 'demo' | 'mock' | 'analysis-router' | 'real' | 'fallback';

export const apiConfig = {
  // Use VITE_ prefix for client-side environment variables if needed
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  engineBaseUrl: process.env.NEXT_PUBLIC_ENGINE_BASE_URL || 'http://localhost:8080',
  timeout: 30000,
  requestTimeout: 30000,
  maxRetries: 3,
  retryDelay: 1000,
  useMockApis: process.env.NEXT_PUBLIC_USE_MOCK_APIS === 'true' || true,
  defaultMode: (process.env.NEXT_PUBLIC_DEFAULT_CONNECTION_MODE as ConnectionMode) || 'demo',
  websocket: {
    maxReconnectAttempts: 10,
    reconnectInterval: 5000,
  },
};

export const errorConfig = {
  defaultErrorMessage: 'An unexpected error occurred.',
  codes: {
    NETWORK_ERROR: 'NETWORK_ERROR',
    TIMEOUT_ERROR: 'TIMEOUT_ERROR',
    VALIDATION_FAILED: 'VALIDATION_FAILED',
    UPLOAD_FAILED: 'UPLOAD_FAILED',
  },
};

export const validationConfig = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  allowedTypes: ['application/pdf'],
  minFileSize: 1024, // 1KB - Minimum size for a valid PDF
  maxFilenameLength: 255,
  filenamePattern: /^[a-zA-Z0-9._-]+$/,
};

export const uploadConfig = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  acceptedTypes: ['application/pdf'],
  minFileSize: 1024, // 1KB
};

export const analysisConfig = {
  progressUpdateInterval: 2000,
  analysisTimeout: 300000,
};

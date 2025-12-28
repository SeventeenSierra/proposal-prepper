/**
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

export const apiConfig = {
  // Use VITE_ prefix for client-side environment variables if needed
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 30000,
  useMockApis: process.env.NEXT_PUBLIC_USE_MOCK_APIS === 'true' || true,
};

export const validationConfig = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  allowedTypes: ['application/pdf'],
  minFileSize: 1024, // 1KB - Minimum size for a valid PDF
};

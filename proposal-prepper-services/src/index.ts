// SPDX-License-Identifier: UNLICENSED
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

// Config Types
export { type ConnectionMode } from './config/app';

/**
 * Services Layer
 *
 * Business logic and API integration services for the Proposal Prepper
 * threshold functionality. Handles communication with backend services
 * and orchestrates data flow between components.
 */

// Analysis Service
export {
  type AnalysisRequest,
  AnalysisService,
  type AnalysisServiceEvents,
  analysisService,
} from './analysis-service';
// Results Service
export {
  ResultsService,
  type ResultsServiceEvents,
  resultsService,
} from './results-service';
// Seed Service
export {
  type FileVerification,
  type SeededDocument,
  type SeedingResult,
  type SeedingStatus,
  SeedService,
  seedService,
} from './seed-service';
// AI Router API Client
// AI Router Integration
export {
  type ServiceIntegrationStatus,
  AIRouterIntegration,
  AIRouterIntegrationUtils,
  aiRouterIntegration,
} from './ai-router-integration';

// Mock Client
export { MockAIRouterClient } from './mock-ai-router-client';
// Upload Service
export {
  type UploadService,
  uploadService,
} from './upload-service';

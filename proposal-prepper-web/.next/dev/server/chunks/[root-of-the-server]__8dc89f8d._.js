module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/proposal-prepper-services/src/mock-api-server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */ __turbopack_context__.s([
    "MockApiServer",
    ()=>MockApiServer,
    "mockApiServer",
    ()=>mockApiServer
]);
class MockApiServer {
    mockDelay;
    constructor(mockDelay = 1000){
        this.mockDelay = mockDelay;
    }
    async simulateDelay(customDelay) {
        const delay = customDelay ?? this.mockDelay;
        return new Promise((resolve)=>setTimeout(resolve, delay));
    }
    /**
   * Handle document upload
   * Extracted from src/app/api/documents/upload/route.ts
   */ async handleDocumentUpload(file) {
        try {
            // Validate file presence
            if (!file) {
                return {
                    success: false,
                    error: 'No file provided',
                    code: 'MISSING_FILE'
                };
            }
            // Validate file type
            if (file.type !== 'application/pdf') {
                return {
                    success: false,
                    error: 'Only PDF files are accepted',
                    code: 'INVALID_FILE_TYPE'
                };
            }
            // Validate file size (100MB limit)
            if (file.size > 100 * 1024 * 1024) {
                return {
                    success: false,
                    error: 'File size exceeds 100MB limit',
                    code: 'FILE_TOO_LARGE'
                };
            }
            // Simulate processing delay
            await this.simulateDelay();
            // Generate mock upload session
            const uploadSession = {
                id: `upload_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
                filename: file.name,
                fileSize: file.size,
                mimeType: file.type,
                status: 'completed',
                progress: 100,
                startedAt: new Date().toISOString(),
                completedAt: new Date().toISOString()
            };
            return {
                success: true,
                data: uploadSession
            };
        } catch (error) {
            console.error('Upload error:', error);
            return {
                success: false,
                error: 'Upload failed',
                code: 'UPLOAD_FAILED'
            };
        }
    }
    /**
   * Handle analysis start
   * Extracted from src/app/api/analysis/start/route.ts
   */ async handleAnalysisStart(proposalId) {
        try {
            if (!proposalId) {
                return {
                    success: false,
                    error: 'Proposal ID is required',
                    code: 'MISSING_PROPOSAL_ID'
                };
            }
            // Simulate processing delay
            await this.simulateDelay(500);
            // Generate mock analysis session
            const analysisSession = {
                id: `analysis_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
                proposalId,
                status: 'analyzing',
                progress: 0,
                startedAt: new Date().toISOString(),
                estimatedCompletion: new Date(Date.now() + 30000).toISOString(),
                currentStep: 'Starting compliance analysis...'
            };
            return {
                success: true,
                data: analysisSession
            };
        } catch (error) {
            console.error('Analysis start error:', error);
            return {
                success: false,
                error: 'Failed to start analysis',
                code: 'ANALYSIS_START_FAILED'
            };
        }
    }
    /**
   * Handle analysis results retrieval
   * Extracted from src/app/api/analysis/[sessionId]/results/route.ts
   */ async handleAnalysisResults(sessionId) {
        try {
            if (!sessionId) {
                return {
                    success: false,
                    error: 'Session ID is required',
                    code: 'MISSING_SESSION_ID'
                };
            }
            // Simulate processing delay
            await this.simulateDelay(500);
            // Generate mock compliance issues with proper structure
            const mockIssues = [
                {
                    id: 'issue_1',
                    severity: 'warning',
                    title: 'Budget Justification Format',
                    description: 'Budget justification follows standard format but could include more detail on equipment costs',
                    location: {
                        page: 8,
                        section: 'Budget Justification',
                        text: 'Equipment costs section'
                    },
                    regulation: {
                        framework: 'FAR',
                        section: '15.204-5',
                        reference: 'FAR 15.204-5 - Budget Justification Requirements'
                    },
                    remediation: 'Consider adding more detailed breakdown of equipment and personnel costs'
                },
                {
                    id: 'issue_2',
                    severity: 'info',
                    title: 'Data Management Plan',
                    description: 'Data management plan is present and meets basic requirements',
                    location: {
                        page: 15,
                        section: 'Data Management Plan',
                        text: 'Data management section'
                    },
                    regulation: {
                        framework: 'FAR',
                        section: '19-069',
                        reference: 'NSF 19-069 - Data Management Plan Requirements'
                    },
                    remediation: 'Plan is compliant with current requirements'
                }
            ];
            // Randomly include issues (70% chance)
            const issues = Math.random() > 0.3 ? mockIssues : [];
            // Generate mock analysis results
            const analysisResults = {
                id: sessionId,
                proposalId: `proposal_${sessionId}`,
                status: issues.length === 0 ? 'pass' : 'warning',
                issues,
                summary: {
                    totalIssues: issues.length,
                    criticalIssues: issues.filter((i)=>i.severity === 'critical').length,
                    warningIssues: issues.filter((i)=>i.severity === 'warning').length
                },
                generatedAt: new Date().toISOString()
            };
            return {
                success: true,
                data: analysisResults
            };
        } catch (error) {
            console.error('Results retrieval error:', error);
            return {
                success: false,
                error: 'Failed to retrieve results',
                code: 'RESULTS_RETRIEVAL_FAILED'
            };
        }
    }
    /**
   * Handle upload status check
   */ async handleUploadStatus(sessionId) {
        try {
            if (!sessionId) {
                return {
                    success: false,
                    error: 'Session ID is required',
                    code: 'MISSING_SESSION_ID'
                };
            }
            await this.simulateDelay(200);
            const uploadSession = {
                id: sessionId,
                filename: 'mock-proposal.pdf',
                fileSize: 1024000,
                mimeType: 'application/pdf',
                status: 'completed',
                progress: 100,
                startedAt: new Date(Date.now() - 10000).toISOString(),
                completedAt: new Date().toISOString()
            };
            return {
                success: true,
                data: uploadSession
            };
        } catch (error) {
            console.error('Upload status error:', error);
            return {
                success: false,
                error: 'Failed to get upload status',
                code: 'UPLOAD_STATUS_FAILED'
            };
        }
    }
    /**
   * Handle analysis status check
   */ async handleAnalysisStatus(sessionId) {
        try {
            if (!sessionId) {
                return {
                    success: false,
                    error: 'Session ID is required',
                    code: 'MISSING_SESSION_ID'
                };
            }
            await this.simulateDelay(300);
            const analysisSession = {
                id: sessionId,
                proposalId: `proposal_${sessionId}`,
                status: 'completed',
                progress: 100,
                startedAt: new Date(Date.now() - 30000).toISOString(),
                completedAt: new Date().toISOString(),
                currentStep: 'Analysis completed'
            };
            return {
                success: true,
                data: analysisSession
            };
        } catch (error) {
            console.error('Analysis status error:', error);
            return {
                success: false,
                error: 'Failed to get analysis status',
                code: 'ANALYSIS_STATUS_FAILED'
            };
        }
    }
    /**
   * Health check endpoint
   */ async handleHealthCheck() {
        await this.simulateDelay(100);
        return {
            success: true,
            data: {
                status: 'healthy',
                version: '1.0.0-mock',
                timestamp: new Date().toISOString()
            }
        };
    }
    /**
   * Get issue details
   */ async handleIssueDetails(issueId) {
        try {
            if (!issueId) {
                return {
                    success: false,
                    error: 'Issue ID is required',
                    code: 'MISSING_ISSUE_ID'
                };
            }
            await this.simulateDelay(200);
            const issue = {
                id: issueId,
                severity: 'warning',
                title: 'Sample Compliance Issue',
                description: 'This is a detailed description of the compliance issue found in the document.',
                location: {
                    page: 5,
                    section: 'Technical Approach',
                    text: 'Relevant text excerpt from the document'
                },
                regulation: {
                    framework: 'FAR',
                    section: '52.204-8',
                    reference: 'FAR 52.204-8 - Annual Representations and Certifications'
                },
                remediation: 'Recommended steps to address this compliance issue.'
            };
            return {
                success: true,
                data: issue
            };
        } catch (error) {
            console.error('Issue details error:', error);
            return {
                success: false,
                error: 'Failed to get issue details',
                code: 'ISSUE_DETAILS_FAILED'
            };
        }
    }
}
const mockApiServer = new MockApiServer();
}),
"[project]/proposal-prepper-web/src/config/app.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
/**
 * Application Configuration
 *
 * Configuration constants and settings for the Proposal Prepper application.
 * Centralizes all configurable values used across components, services, and utilities.
 */ /**
 * File Upload Configuration
 *
 * Settings for file upload validation and processing.
 * Based on requirements 1.1 and 1.2 for PDF acceptance and validation.
 */ __turbopack_context__.s([
    "analysisConfig",
    ()=>analysisConfig,
    "apiConfig",
    ()=>apiConfig,
    "errorConfig",
    ()=>errorConfig,
    "featureFlags",
    ()=>featureFlags,
    "uiConfig",
    ()=>uiConfig,
    "uploadConfig",
    ()=>uploadConfig,
    "validationConfig",
    ()=>validationConfig
]);
const uploadConfig = {
    /** Accepted file types (PDF only for MVP) */ acceptedTypes: [
        'application/pdf'
    ],
    /** Maximum file size in bytes (100MB) */ maxFileSize: 100 * 1024 * 1024,
    /** Minimum file size in bytes (1KB) */ minFileSize: 1024,
    /** Upload chunk size for progress tracking */ chunkSize: 1024 * 1024,
    /** Maximum concurrent uploads */ maxConcurrentUploads: 1,
    /** Upload timeout in milliseconds */ uploadTimeout: 5 * 60 * 1000
};
const analysisConfig = {
    /** Analysis timeout in milliseconds */ analysisTimeout: 10 * 60 * 1000,
    /** Progress update interval in milliseconds */ progressUpdateInterval: 1000,
    /** Maximum retry attempts for failed analysis */ maxRetryAttempts: 3,
    /** Retry delay in milliseconds */ retryDelay: 5000,
    /** Supported compliance frameworks */ frameworks: [
        'FAR',
        'DFARS'
    ]
};
const uiConfig = {
    /** Page load timeout target in milliseconds */ loadTimeTarget: 5000,
    /** Navigation transition duration in milliseconds */ transitionDuration: 200,
    /** Progress update frequency in milliseconds */ progressUpdateFrequency: 500,
    /** Notification auto-dismiss timeout in milliseconds */ notificationTimeout: 5000,
    /** Maximum notifications to display simultaneously */ maxNotifications: 5,
    /** Breakpoints for responsive design */ breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1280
    }
};
const apiConfig = {
    /** Base URL for Strands service - Docker container or localhost */ strandsBaseUrl: process.env.NEXT_PUBLIC_STRANDS_URL || process.env.STRANDS_SERVICE_URL || (("TURBOPACK compile-time truthy", 1) ? 'http://strands:8080' : "TURBOPACK unreachable"),
    /** Use mock APIs for development (when external services aren't available) */ useMockApis: process.env.NEXT_PUBLIC_USE_MOCK_APIS === 'true',
    /** API request timeout in milliseconds */ requestTimeout: 30000,
    /** Maximum retry attempts for API requests */ maxRetries: 3,
    /** Retry delay in milliseconds */ retryDelay: 1000,
    /** WebSocket reconnection settings */ websocket: {
        reconnectInterval: 5000,
        maxReconnectAttempts: 10
    }
};
const validationConfig = {
    /** Maximum filename length */ maxFilenameLength: 255,
    /** Allowed filename characters pattern */ filenamePattern: /^[a-zA-Z0-9._-]+$/,
    /** Maximum session ID length */ maxSessionIdLength: 128,
    /** Session ID pattern */ sessionIdPattern: /^[a-zA-Z0-9-]+$/
};
const errorConfig = {
    /** Default error message for unknown errors */ defaultErrorMessage: 'An unexpected error occurred. Please try again.',
    /** Error codes for specific error types */ codes: {
        UPLOAD_FAILED: 'UPLOAD_001',
        ANALYSIS_FAILED: 'ANALYSIS_001',
        VALIDATION_FAILED: 'VALIDATION_001',
        NETWORK_ERROR: 'NETWORK_001',
        TIMEOUT_ERROR: 'TIMEOUT_001',
        SERVICE_UNAVAILABLE: 'SERVICE_002',
        SERVICE_ERROR: 'SERVICE_003'
    },
    /** Error recovery strategies */ recovery: {
        autoRetry: true,
        maxAutoRetries: 2,
        retryDelay: 2000
    }
};
const featureFlags = {
    /** Enable detailed logging for debugging */ enableDetailedLogging: ("TURBOPACK compile-time value", "development") === 'development',
    /** Enable performance monitoring */ enablePerformanceMonitoring: true,
    /** Enable error reporting */ enableErrorReporting: ("TURBOPACK compile-time value", "development") === 'production',
    /** Enable advanced analysis features (future enhancement) */ enableAdvancedAnalysis: false,
    /** Enable real-time progress updates */ enableRealTimeUpdates: true
};
}),
"[project]/proposal-prepper-web/src/utils/performance.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */ /**
 * Performance Utilities
 *
 * Implements caching strategies and performance optimizations
 * for the Proposal Prepper application.
 *
 * Requirement 5.1: Load time performance optimization
 */ /**
 * Simple in-memory cache with TTL support
 */ __turbopack_context__.s([
    "BrowserCache",
    ()=>BrowserCache,
    "MemoryCache",
    ()=>MemoryCache,
    "PerformanceMonitor",
    ()=>PerformanceMonitor,
    "apiCache",
    ()=>apiCache,
    "debounce",
    ()=>debounce,
    "lazyLoadImage",
    ()=>lazyLoadImage,
    "memoize",
    ()=>memoize,
    "preloadResource",
    ()=>preloadResource,
    "resultsCache",
    ()=>resultsCache,
    "throttle",
    ()=>throttle,
    "uiStateCache",
    ()=>uiStateCache
]);
class MemoryCache {
    cache = new Map();
    defaultTTL;
    constructor(defaultTTL = 5 * 60 * 1000){
        // 5 minutes default
        this.defaultTTL = defaultTTL;
    }
    set(key, value, ttl) {
        const expires = Date.now() + (ttl ?? this.defaultTTL);
        this.cache.set(key, {
            value,
            expires
        });
    }
    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        if (Date.now() > item.expires) {
            this.cache.delete(key);
            return null;
        }
        return item.value;
    }
    has(key) {
        return this.get(key) !== null;
    }
    delete(key) {
        return this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    size() {
        // Clean expired entries first
        const now = Date.now();
        for (const [key, item] of this.cache.entries()){
            if (now > item.expires) {
                this.cache.delete(key);
            }
        }
        return this.cache.size;
    }
}
/**
 * Browser storage cache with fallback to memory
 */ class BrowserCache {
    memoryCache;
    storageKey;
    constructor(storageKey, defaultTTL = 30 * 60 * 1000){
        // 30 minutes default
        this.storageKey = storageKey;
        this.memoryCache = new MemoryCache(defaultTTL);
    }
    isStorageAvailable() {
        try {
            return ("TURBOPACK compile-time value", "undefined") !== 'undefined' && window.localStorage !== undefined;
        } catch  {
            return false;
        }
    }
    getStorageKey(key) {
        return `${this.storageKey}:${key}`;
    }
    set(key, value, ttl) {
        // Always set in memory cache
        this.memoryCache.set(key, value, ttl);
        // Try to set in localStorage if available
        if (this.isStorageAvailable()) {
            try {
                const expires = Date.now() + (ttl ?? 30 * 60 * 1000);
                const item = {
                    value,
                    expires
                };
                localStorage.setItem(this.getStorageKey(key), JSON.stringify(item));
            } catch (error) {
                console.warn('Failed to save to localStorage:', error);
            }
        }
    }
    get(key) {
        // Try memory cache first (fastest)
        const memoryValue = this.memoryCache.get(key);
        if (memoryValue !== null) {
            return memoryValue;
        }
        // Try localStorage if available
        if (this.isStorageAvailable()) {
            try {
                const stored = localStorage.getItem(this.getStorageKey(key));
                if (stored) {
                    const item = JSON.parse(stored);
                    if (Date.now() <= item.expires) {
                        // Restore to memory cache for faster access
                        this.memoryCache.set(key, item.value);
                        return item.value;
                    } else {
                        // Clean up expired item
                        localStorage.removeItem(this.getStorageKey(key));
                    }
                }
            } catch (error) {
                console.warn('Failed to read from localStorage:', error);
            }
        }
        return null;
    }
    has(key) {
        return this.get(key) !== null;
    }
    delete(key) {
        this.memoryCache.delete(key);
        if (this.isStorageAvailable()) {
            try {
                localStorage.removeItem(this.getStorageKey(key));
            } catch (error) {
                console.warn('Failed to delete from localStorage:', error);
            }
        }
    }
    clear() {
        this.memoryCache.clear();
        if (this.isStorageAvailable()) {
            try {
                const keys = Object.keys(localStorage);
                for (const key of keys){
                    if (key.startsWith(`${this.storageKey}:`)) {
                        localStorage.removeItem(key);
                    }
                }
            } catch (error) {
                console.warn('Failed to clear localStorage:', error);
            }
        }
    }
}
function debounce(func, wait) {
    let timeout = null;
    return (...args)=>{
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(()=>func(...args), wait);
    };
}
function throttle(func, limit) {
    let inThrottle = false;
    return (...args)=>{
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(()=>{
                inThrottle = false;
            }, limit);
        }
    };
}
function memoize(func, keyGenerator) {
    const cache = new Map();
    return (...args)=>{
        const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func(...args);
        cache.set(key, result);
        return result;
    };
}
function preloadResource(href, as) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const link = undefined;
}
function lazyLoadImage(img, src) {
    if (("TURBOPACK compile-time value", "undefined") === 'undefined' || !('IntersectionObserver' in window)) {
        img.src = src;
        return;
    }
    //TURBOPACK unreachable
    ;
    const observer = undefined;
}
(function(PerformanceMonitor) {
    const marks = new Map();
    function mark(name) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    PerformanceMonitor.mark = mark;
    function measure(name, startMark, endMark) {
        if ("TURBOPACK compile-time truthy", 1) {
            // Fallback measurement
            const startTime = marks.get(startMark);
            const endTime = endMark ? marks.get(endMark) : Date.now();
            return startTime && endTime ? endTime - startTime : null;
        }
        //TURBOPACK unreachable
        ;
    }
    PerformanceMonitor.measure = measure;
    function getNavigationTiming() {
        if (("TURBOPACK compile-time value", "undefined") === 'undefined' || !window.performance?.timing) {
            return null;
        }
        //TURBOPACK unreachable
        ;
        const timing = undefined;
    }
    PerformanceMonitor.getNavigationTiming = getNavigationTiming;
})(PerformanceMonitor || (PerformanceMonitor = {}));
const apiCache = new BrowserCache('proposal-prepper-api', 10 * 60 * 1000); // 10 minutes
const uiStateCache = new MemoryCache(60 * 1000); // 1 minute
const resultsCache = new BrowserCache('proposal-prepper-results', 60 * 60 * 1000); // 1 hour
;
var PerformanceMonitor;
}),
"[project]/proposal-prepper-web/src/config/api-config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */ /**
 * Framework-Independent API Configuration
 *
 * Provides flexible configuration for different deployment scenarios
 * and framework integrations. Supports environment-based configuration
 * and runtime switching between real and mock APIs.
 */ __turbopack_context__.s([
    "ApiConfigUtils",
    ()=>ApiConfigUtils,
    "ApiConfigurationManager",
    ()=>ApiConfigurationManager,
    "apiConfigManager",
    ()=>apiConfigManager,
    "apiConfiguration",
    ()=>apiConfiguration,
    "createApiConfiguration",
    ()=>createApiConfiguration
]);
/**
 * Default API endpoints structure
 */ const DEFAULT_ENDPOINTS = {
    upload: '/api/documents/upload',
    uploadStatus: (sessionId)=>`/api/documents/upload/${sessionId}`,
    analysisStart: '/api/analysis/start',
    analysisStatus: (sessionId)=>`/api/analysis/${sessionId}`,
    analysisResults: (sessionId)=>`/api/analysis/${sessionId}/results`,
    issueDetails: (issueId)=>`/api/results/issues/${issueId}`,
    health: '/api/health'
};
/**
 * Environment variable names for configuration
 */ const ENV_VARS = {
    STRANDS_API_URL: 'STRANDS_API_URL',
    MOCK_API_URL: 'MOCK_API_URL',
    USE_MOCK_API: 'USE_MOCK_API',
    API_TIMEOUT: 'API_TIMEOUT',
    API_RETRIES: 'API_RETRIES',
    API_RETRY_DELAY: 'API_RETRY_DELAY'
};
/**
 * Get environment variable with fallback
 */ function getEnvVar(name, fallback = '') {
    if (typeof process !== 'undefined' && process.env) {
        return process.env[name] || fallback;
    }
    return fallback;
}
/**
 * Get boolean environment variable
 */ function getBooleanEnvVar(name, fallback = false) {
    const value = getEnvVar(name);
    if (!value) return fallback;
    return value.toLowerCase() === 'true' || value === '1';
}
/**
 * Get number environment variable
 */ function getNumberEnvVar(name, fallback) {
    const value = getEnvVar(name);
    if (!value) return fallback;
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
}
/**
 * Determine if we should use mock APIs
 */ function shouldUseMockApi() {
    // Explicit environment variable override
    if (getEnvVar(ENV_VARS.USE_MOCK_API)) {
        return getBooleanEnvVar(ENV_VARS.USE_MOCK_API);
    }
    // Development mode defaults to mock
    if (getEnvVar('NODE_ENV') === 'development') {
        return true;
    }
    // Browser-based detection for client-side
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return false;
}
/**
 * Get the appropriate API base URL
 */ function getApiBaseUrl() {
    const useMock = shouldUseMockApi();
    if (useMock) {
        // Mock API URL (could be Next.js routes, Express server, etc.)
        const mockUrl = getEnvVar(ENV_VARS.MOCK_API_URL);
        if (mockUrl) return mockUrl;
        // Default mock URLs for different environments
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            // Server environment - default to localhost
            return 'http://localhost:3000';
        }
    }
    // Real Strands API URL - prioritize Docker container networking
    const realUrl = getEnvVar(ENV_VARS.STRANDS_API_URL) || getEnvVar('STRANDS_SERVICE_URL');
    if (realUrl) return realUrl;
    // Default real API URL - use Docker service name for server-side, localhost for client-side
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        // Server environment - use Docker service name
        return 'http://strands:8080';
    }
}
function createApiConfiguration(overrides) {
    const baseConfig = {
        baseUrl: getApiBaseUrl(),
        endpoints: DEFAULT_ENDPOINTS,
        useMock: shouldUseMockApi(),
        timeout: getNumberEnvVar(ENV_VARS.API_TIMEOUT, 30000),
        retries: getNumberEnvVar(ENV_VARS.API_RETRIES, 3),
        retryDelay: getNumberEnvVar(ENV_VARS.API_RETRY_DELAY, 1000)
    };
    return {
        ...baseConfig,
        ...overrides
    };
}
const apiConfiguration = createApiConfiguration();
class ApiConfigurationManager {
    static instance;
    config;
    listeners = new Set();
    constructor(){
        this.config = createApiConfiguration();
    }
    static getInstance() {
        if (!ApiConfigurationManager.instance) {
            ApiConfigurationManager.instance = new ApiConfigurationManager();
        }
        return ApiConfigurationManager.instance;
    }
    /**
   * Get current configuration
   */ getConfiguration() {
        return {
            ...this.config
        };
    }
    /**
   * Update configuration
   */ updateConfiguration(updates) {
        this.config = {
            ...this.config,
            ...updates
        };
        this.notifyListeners();
    }
    /**
   * Switch to mock API
   */ useMockApi(mockBaseUrl) {
        this.updateConfiguration({
            useMock: true,
            baseUrl: mockBaseUrl || this.config.baseUrl
        });
    }
    /**
   * Switch to real API
   */ useRealApi(realBaseUrl) {
        this.updateConfiguration({
            useMock: false,
            baseUrl: realBaseUrl || getEnvVar(ENV_VARS.STRANDS_API_URL, 'http://localhost:8080')
        });
    }
    /**
   * Subscribe to configuration changes
   */ subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    /**
   * Notify all listeners of configuration changes
   */ notifyListeners() {
        this.listeners.forEach((listener)=>{
            listener(this.config);
        });
    }
    /**
   * Reset to default configuration
   */ reset() {
        this.config = createApiConfiguration();
        this.notifyListeners();
    }
}
const apiConfigManager = ApiConfigurationManager.getInstance();
const ApiConfigUtils = {
    /**
   * Configure for Next.js development
   */ configureForNextJs (port = 3000) {
        apiConfigManager.updateConfiguration({
            baseUrl: `http://localhost:${port}`,
            useMock: true
        });
    },
    /**
   * Configure for Express server
   */ configureForExpress (port = 8080) {
        apiConfigManager.updateConfiguration({
            baseUrl: `http://localhost:${port}`,
            useMock: false
        });
    },
    /**
   * Configure for standalone mock server
   */ configureForStandaloneMock (port = 8081) {
        apiConfigManager.updateConfiguration({
            baseUrl: `http://localhost:${port}`,
            useMock: true
        });
    },
    /**
   * Configure for production
   */ configureForProduction (apiUrl) {
        apiConfigManager.updateConfiguration({
            baseUrl: apiUrl,
            useMock: false,
            timeout: 60000,
            retries: 5
        });
    },
    /**
   * Get configuration for current environment
   */ getEnvironmentConfig () {
        return apiConfigManager.getConfiguration();
    }
};
}),
"[project]/proposal-prepper-services/src/ai-router-client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
/**
 * Strands API Client
 *
 * HTTP/REST and WebSocket client for communicating with the Strands service.
 * Provides document upload, analysis orchestration, and results retrieval.
 * Implements requirements 1.1, 2.1, and 3.1 for API integration.
 *
 * Performance optimizations for Requirement 5.1: Load time performance
 */ __turbopack_context__.s([
    "AIRouterClient",
    ()=>AIRouterClient,
    "aiRouterClient",
    ()=>aiRouterClient,
    "createAIRouterClientWithConfig",
    ()=>createAIRouterClientWithConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/config/app.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$utils$2f$performance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/utils/performance.ts [app-route] (ecmascript)");
;
;
/**
 * HTTP client with retry logic and error handling
 */ class HttpClient {
    baseUrl;
    timeout;
    maxRetries;
    retryDelay;
    constructor(baseUrl){
        this.baseUrl = baseUrl;
        this.timeout = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiConfig"].requestTimeout;
        this.maxRetries = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiConfig"].maxRetries;
        this.retryDelay = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiConfig"].retryDelay;
    }
    /**
   * Make HTTP request with retry logic and caching
   * Performance optimization for Requirement 5.1
   */ async makeRequest(endpoint, options = {}, cacheKey, cacheTTL) {
        // Check cache for GET requests
        if (options.method === 'GET' && cacheKey) {
            const cached = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$utils$2f$performance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiCache"].get(cacheKey);
            if (cached) {
                return {
                    success: true,
                    data: cached
                };
            }
        }
        const url = `${this.baseUrl}${endpoint}`;
        let lastError = null;
        // Performance monitoring
        const requestId = `api-request-${Date.now()}`;
        __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$utils$2f$performance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PerformanceMonitor"].mark(`${requestId}-start`);
        for(let attempt = 0; attempt <= this.maxRetries; attempt++){
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(()=>controller.abort(), this.timeout);
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    }
                });
                clearTimeout(timeoutId);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                // Cache successful GET responses
                if (options.method === 'GET' && cacheKey && data) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$utils$2f$performance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiCache"].set(cacheKey, data, cacheTTL);
                }
                // Performance monitoring
                __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$utils$2f$performance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PerformanceMonitor"].mark(`${requestId}-end`);
                const duration = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$utils$2f$performance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PerformanceMonitor"].measure(requestId, `${requestId}-start`, `${requestId}-end`);
                if (duration && duration > 1000) {
                    console.warn(`Slow API request: ${endpoint} took ${duration}ms`);
                }
                return {
                    success: true,
                    data
                };
            } catch (error) {
                lastError = error;
                // Don't retry on client errors (4xx)
                if (error instanceof Error && error.message.includes('HTTP 4')) {
                    break;
                }
                // Wait before retry (except on last attempt)
                if (attempt < this.maxRetries) {
                    await new Promise((resolve)=>setTimeout(resolve, this.retryDelay * (attempt + 1)));
                }
            }
        }
        return {
            success: false,
            error: lastError?.message || __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["errorConfig"].defaultErrorMessage,
            code: this.getErrorCode(lastError)
        };
    }
    /**
   * Get appropriate error code based on error type
   */ getErrorCode(error) {
        if (!error) return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["errorConfig"].codes.NETWORK_ERROR;
        if (error.name === 'AbortError') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["errorConfig"].codes.TIMEOUT_ERROR;
        }
        if (error.message.includes('HTTP 4')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["errorConfig"].codes.VALIDATION_FAILED;
        }
        // Check for specific connection errors
        if (error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND') || error.message.includes('ECONNRESET')) {
            return 'SERVICE_UNAVAILABLE';
        }
        if (error.message.includes('HTTP 5')) {
            return 'SERVICE_ERROR';
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["errorConfig"].codes.NETWORK_ERROR;
    }
    /**
   * GET request with caching
   */ async get(endpoint, cacheTTL) {
        const cacheKey = `GET:${endpoint}`;
        return this.makeRequest(endpoint, {
            method: 'GET'
        }, cacheKey, cacheTTL);
    }
    /**
   * POST request
   */ async post(endpoint, data) {
        return this.makeRequest(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined
        });
    }
    /**
   * PUT request
   */ async put(endpoint, data) {
        return this.makeRequest(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined
        });
    }
    /**
   * DELETE request
   */ async delete(endpoint) {
        return this.makeRequest(endpoint, {
            method: 'DELETE'
        });
    }
    /**
   * Upload file with progress tracking
   */ async uploadFile(endpoint, file, onProgress) {
        return new Promise((resolve)=>{
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append('file', file);
            xhr.upload.addEventListener('progress', (event)=>{
                if (event.lengthComputable && onProgress) {
                    const progress = event.loaded / event.total * 100;
                    onProgress(progress);
                }
            });
            xhr.addEventListener('load', ()=>{
                try {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const data = JSON.parse(xhr.responseText);
                        resolve({
                            success: true,
                            data
                        });
                    } else {
                        resolve({
                            success: false,
                            error: `Upload failed: ${xhr.statusText}`,
                            code: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["errorConfig"].codes.UPLOAD_FAILED
                        });
                    }
                } catch (_error) {
                    resolve({
                        success: false,
                        error: 'Failed to parse upload response',
                        code: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["errorConfig"].codes.UPLOAD_FAILED
                    });
                }
            });
            xhr.addEventListener('error', ()=>{
                resolve({
                    success: false,
                    error: 'Upload network error',
                    code: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["errorConfig"].codes.NETWORK_ERROR
                });
            });
            xhr.addEventListener('timeout', ()=>{
                resolve({
                    success: false,
                    error: 'Upload timeout',
                    code: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["errorConfig"].codes.TIMEOUT_ERROR
                });
            });
            xhr.timeout = this.timeout;
            xhr.open('POST', `${this.baseUrl}${endpoint}`);
            xhr.send(formData);
        });
    }
}
/**
 * WebSocket client for real-time updates
 */ class WebSocketClient {
    ws = null;
    url;
    reconnectAttempts = 0;
    maxReconnectAttempts;
    reconnectInterval;
    listeners = new Map();
    constructor(baseUrl){
        this.url = `${baseUrl.replace('http', 'ws')}/ws`;
        this.maxReconnectAttempts = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiConfig"].websocket.maxReconnectAttempts;
        this.reconnectInterval = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiConfig"].websocket.reconnectInterval;
    }
    /**
   * Connect to WebSocket
   */ connect() {
        return new Promise((resolve, reject)=>{
            try {
                this.ws = new WebSocket(this.url);
                this.ws.onopen = ()=>{
                    this.reconnectAttempts = 0;
                    resolve();
                };
                this.ws.onmessage = (event)=>{
                    try {
                        const message = JSON.parse(event.data);
                        this.notifyListeners(message.type, message);
                    } catch (error) {
                        console.error('Failed to parse WebSocket message:', error);
                    }
                };
                this.ws.onclose = ()=>{
                    this.handleDisconnection();
                };
                this.ws.onerror = (error)=>{
                    console.error('WebSocket error:', error);
                    reject(error);
                };
            } catch (error) {
                reject(error);
            }
        });
    }
    /**
   * Handle WebSocket disconnection with reconnection logic
   */ handleDisconnection() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(()=>{
                this.connect().catch(console.error);
            }, this.reconnectInterval * this.reconnectAttempts);
        }
    }
    /**
   * Subscribe to WebSocket messages of a specific type
   */ subscribe(type, callback) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, new Set());
        }
        this.listeners.get(type).add(callback);
    }
    /**
   * Unsubscribe from WebSocket messages
   */ unsubscribe(type, callback) {
        const typeListeners = this.listeners.get(type);
        if (typeListeners) {
            typeListeners.delete(callback);
        }
    }
    /**
   * Notify all listeners of a message type
   */ notifyListeners(type, message) {
        const typeListeners = this.listeners.get(type);
        if (typeListeners) {
            typeListeners.forEach((callback)=>{
                callback(message);
            });
        }
    }
    /**
   * Send message through WebSocket
   */ send(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        }
    }
    /**
   * Close WebSocket connection
   */ disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
    /**
   * Check if WebSocket is connected
   */ isConnected() {
        return this.ws?.readyState === WebSocket.OPEN;
    }
}
class AIRouterClient {
    httpClient;
    wsClient;
    baseUrl;
    lastHealthCheck = null;
    healthCheckCacheMs = 30000;
    constructor(baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiConfig"].strandsBaseUrl){
        this.baseUrl = baseUrl;
        this.httpClient = new HttpClient(baseUrl);
        this.wsClient = new WebSocketClient(baseUrl);
    }
    /**
   * Get the base URL being used by this client
   */ getBaseUrl() {
        return this.baseUrl;
    }
    // Document Upload Methods
    /**
   * Upload a document file
   * Requirement 1.1: Accept PDF format files
   */ async uploadDocument(file, onProgress) {
        return this.httpClient.uploadFile('/api/documents/upload', file, onProgress);
    }
    /**
   * Get upload session status with short-term caching
   */ async getUploadStatus(sessionId) {
        return this.httpClient.get(`/api/documents/upload/${sessionId}`, 30000); // 30 seconds cache
    }
    // Analysis Methods
    /**
   * Start compliance analysis
   * Requirement 2.1: Validate against core FAR/DFARS requirements
   */ async startAnalysis(proposalId, documentId, filename, s3Key) {
        // Check service health before attempting analysis
        if (!await this.isServiceHealthy()) {
            return {
                success: false,
                error: 'Strands service is not available. Please try again later.',
                code: 'SERVICE_UNAVAILABLE'
            };
        }
        return this.httpClient.post('/api/analysis/start', {
            proposal_id: proposalId,
            document_id: documentId || proposalId,
            filename: filename || 'document.pdf',
            s3_key: s3Key || `uploads/${proposalId}/${filename || 'document.pdf'}`,
            frameworks: [
                'FAR',
                'DFARS'
            ]
        });
    }
    /**
   * Get analysis session status with short-term caching
   */ async getAnalysisStatus(sessionId) {
        return this.httpClient.get(`/api/analysis/${sessionId}`, 15000); // 15 seconds cache
    }
    /**
   * Cancel analysis session
   */ async cancelAnalysis(sessionId) {
        return this.httpClient.delete(`/api/analysis/${sessionId}`);
    }
    // Results Methods
    /**
   * Get compliance analysis results with longer caching
   * Requirement 3.1: Show compliance status and findings
   */ async getResults(sessionId) {
        return this.httpClient.get(`/api/analysis/${sessionId}/results`, 300000); // 5 minutes cache
    }
    /**
   * Get specific compliance issue details with caching
   */ async getIssueDetails(issueId) {
        return this.httpClient.get(`/api/results/issues/${issueId}`, 600000); // 10 minutes cache
    }
    // WebSocket Methods
    /**
   * Connect to real-time updates
   */ async connectWebSocket() {
        return this.wsClient.connect();
    }
    /**
   * Subscribe to upload progress updates
   */ subscribeToUploadProgress(callback) {
        this.wsClient.subscribe('upload_progress', callback);
    }
    /**
   * Subscribe to analysis progress updates
   */ subscribeToAnalysisProgress(callback) {
        this.wsClient.subscribe('analysis_progress', callback);
    }
    /**
   * Subscribe to analysis completion
   */ subscribeToAnalysisComplete(callback) {
        this.wsClient.subscribe('analysis_complete', callback);
    }
    /**
   * Subscribe to error notifications
   */ subscribeToErrors(callback) {
        this.wsClient.subscribe('error', callback);
    }
    /**
   * Unsubscribe from WebSocket updates
   */ unsubscribe(type, callback) {
        this.wsClient.unsubscribe(type, callback);
    }
    /**
   * Disconnect from WebSocket
   */ disconnectWebSocket() {
        this.wsClient.disconnect();
    }
    /**
   * Simulate document upload using seeded data
   */ async simulateUpload(filename) {
        // Check service health
        if (!await this.isServiceHealthy()) {
            return {
                success: false,
                error: 'Strands service is not available',
                code: 'SERVICE_UNAVAILABLE'
            };
        }
        return this.httpClient.post('/api/documents/simulate-upload', {
            filename
        });
    }
    /**
   * Check WebSocket connection status
   */ isWebSocketConnected() {
        return this.wsClient.isConnected();
    }
    // Health Check
    /**
   * Check if Strands service is available
   */ async healthCheck() {
        const result = await this.httpClient.get('/api/health');
        // Update health check cache
        this.lastHealthCheck = {
            timestamp: Date.now(),
            healthy: result.success && (result.data?.status === 'healthy' || result.data?.status === 'degraded')
        };
        return result;
    }
    /**
   * Check if Strands service is healthy and ready for requests
   * Uses cached result if available and recent
   */ async isServiceHealthy() {
        // Use cached result if available and recent
        if (this.lastHealthCheck && Date.now() - this.lastHealthCheck.timestamp < this.healthCheckCacheMs) {
            return this.lastHealthCheck.healthy;
        }
        try {
            const result = await this.healthCheck();
            return result.success && (result.data?.status === 'healthy' || result.data?.status === 'degraded');
        } catch (_error) {
            // Update cache with failure
            this.lastHealthCheck = {
                timestamp: Date.now(),
                healthy: false
            };
            return false;
        }
    }
    /**
   * Wait for service to become healthy with timeout
   */ async waitForService(timeoutMs = 30000) {
        const startTime = Date.now();
        const checkInterval = 2000; // Check every 2 seconds
        while(Date.now() - startTime < timeoutMs){
            if (await this.isServiceHealthy()) {
                return true;
            }
            await new Promise((resolve)=>setTimeout(resolve, checkInterval));
        }
        return false;
    }
    /**
   * Get detailed service status including all health checks
   */ async getServiceStatus() {
        try {
            const result = await this.healthCheck();
            return {
                healthy: result.success && (result.data?.status === 'healthy' || result.data?.status === 'degraded'),
                baseUrl: this.baseUrl,
                status: result.data?.status,
                version: result.data?.version,
                checks: result.data?.checks,
                lastChecked: Date.now(),
                error: result.success ? undefined : result.error
            };
        } catch (error) {
            return {
                healthy: false,
                baseUrl: this.baseUrl,
                lastChecked: Date.now(),
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }
}
/**
 * Smart API client factory that routes requests appropriately
 * 
 * SECURITY: In browser context, always use same-origin (window.location.origin)
 * to route requests through Next.js API routes. This avoids CORS issues and
 * keeps the backend URL private. The Next.js server-side routes will proxy
 * to the real backend.
 */ function createAIRouterClient() {
    // In browser context, always use same-origin to avoid CORS
    // Requests go through Next.js API routes which proxy to backend
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Server-side: use the configured backend URL
    // Import configuration dynamically to avoid circular dependencies
    let config;
    try {
        const configModule = __turbopack_context__.r("[project]/proposal-prepper-web/src/config/api-config.ts [app-route] (ecmascript)");
        config = configModule.apiConfiguration;
    } catch (_error) {
        // Fallback configuration if api-config is not available
        const baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiConfig"].useMockApis ? 'http://localhost:3000' : __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiConfig"].strandsBaseUrl;
        config = {
            baseUrl,
            useMock: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiConfig"].useMockApis
        };
    }
    return new AIRouterClient(config.baseUrl);
}
function createAIRouterClientWithConfig(baseUrl, _useMock = false) {
    return new AIRouterClient(baseUrl);
}
const aiRouterClient = createAIRouterClient();
}),
"[project]/proposal-prepper-services/src/ai-router-integration.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
/**
 * AI Router Integration
 *
 * Provides high-level integration utilities for the AI routing service.s utilities for managing the integration between the web service
 * and the Strands service, including health monitoring, service discovery,
 * and error recovery.
 */ __turbopack_context__.s([
    "AIRouterIntegration",
    ()=>AIRouterIntegration,
    "AIRouterIntegrationUtils",
    ()=>AIRouterIntegrationUtils,
    "aiRouterIntegration",
    ()=>aiRouterIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/config/api-config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-services/src/ai-router-client.ts [app-route] (ecmascript)");
;
;
class AIRouterIntegration {
    client;
    status = null;
    statusListeners = new Set();
    healthCheckInterval = null;
    healthCheckIntervalMs = 30000;
    constructor(client = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["aiRouterClient"]){
        this.client = client;
        // Listen for configuration changes
        __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiConfigManager"].subscribe((config)=>{
            // Assuming AIRouterClient can be re-instantiated with a new base URL if needed
            // Or, if it's a singleton, its internal config might need updating.
            // For now, we'll assume it's re-instantiated if the config changes.
            // This part of the original code was specific to StrandsApiClient and its baseUrl.
            // If AIRouterClient doesn't have a baseUrl in the same way, this might need adjustment.
            // Sticking to the provided diff, which doesn't explicitly change this line.
            // However, the original `this.client = new StrandsApiClient(config.baseUrl);`
            // implies `AIRouterClient` should also be able to take a `baseUrl`.
            // Given the diff only changes the constructor signature, I'll keep the subscription logic as is,
            // but it might be a logical inconsistency if AIRouterClient doesn't use baseUrl.
            // For now, I'll assume `AIRouterClient` can be constructed with `config.baseUrl` if needed,
            // or that `aiRouterClient` itself handles config updates.
            // The diff does not explicitly change the body of the constructor beyond the signature.
            // So, the original body remains, but `StrandsApiClient` becomes `AIRouterClient`.
            this.client = new __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AIRouterClient"](config.baseUrl); // Assuming AIRouterClient constructor takes baseUrl
            this.checkServiceHealth();
        });
    }
    /**
   * Get the current Strands API client
   */ getClient() {
        return this.client;
    }
    /**
   * Get current service integration status
   */ getStatus() {
        return this.status;
    }
    /**
   * Check service health and update status
   */ async checkServiceHealth() {
        try {
            // Use getServiceStatus which exists on AIRouterClient
            const serviceStatus = await this.client.getServiceStatus();
            this.status = {
                connected: true,
                healthy: serviceStatus.healthy,
                baseUrl: serviceStatus.baseUrl,
                lastChecked: Date.now(),
                error: serviceStatus.error,
                checks: serviceStatus.checks,
                version: serviceStatus.version
            };
        } catch (error) {
            this.status = {
                connected: false,
                healthy: false,
                baseUrl: this.client.getBaseUrl(),
                lastChecked: Date.now(),
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
        // Notify listeners
        this.notifyStatusListeners();
        return this.status;
    }
    /**
   * Start periodic health monitoring
   */ startHealthMonitoring() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
        }
        // Initial check
        this.checkServiceHealth();
        // Periodic checks
        this.healthCheckInterval = setInterval(()=>{
            this.checkServiceHealth();
        }, this.healthCheckIntervalMs);
    }
    /**
   * Stop periodic health monitoring
   */ stopHealthMonitoring() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
            this.healthCheckInterval = null;
        }
    }
    /**
   * Subscribe to status changes
   */ subscribeToStatus(listener) {
        this.statusListeners.add(listener);
        // Send current status immediately if available
        if (this.status) {
            listener(this.status);
        }
        return ()=>this.statusListeners.delete(listener);
    }
    /**
   * Notify all status listeners
   */ notifyStatusListeners() {
        if (this.status) {
            this.statusListeners.forEach((listener)=>listener(this.status));
        }
    }
    /**
   * Wait for service to become available
   */ async waitForService(timeoutMs = 60000) {
        const startTime = Date.now();
        while(Date.now() - startTime < timeoutMs){
            await this.checkServiceHealth();
            if (this.status?.healthy) {
                return true;
            }
            // Wait before next check
            await new Promise((resolve)=>setTimeout(resolve, 2000));
        }
        return false;
    }
    /**
   * Attempt to recover service connection
   */ async recoverConnection() {
        // Try different base URLs if the current one fails
        const fallbackUrls = [
            'http://strands:8080',
            'http://localhost:8080',
            'http://127.0.0.1:8080'
        ];
        for (const url of fallbackUrls){
            try {
                const testClient = new __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AIRouterClient"](url);
                const healthy = await testClient.isServiceHealthy();
                if (healthy) {
                    // Update configuration to use this URL
                    __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiConfigManager"].updateConfiguration({
                        baseUrl: url
                    });
                    await this.checkServiceHealth();
                    return true;
                }
            } catch (_error) {}
        }
        return false;
    }
    /**
   * Get service readiness for operations
   */ isReadyForOperations() {
        return this.status?.healthy === true;
    }
    /**
   * Get human-readable status message
   */ getStatusMessage() {
        if (!this.status) {
            return 'Service status unknown';
        }
        if (this.status.healthy) {
            return `Service healthy (${this.status.version || 'unknown version'})`;
        }
        if (this.status.connected) {
            return `Service connected but unhealthy: ${this.status.error || 'Unknown issue'}`;
        }
        return `Service unavailable: ${this.status.error || 'Cannot connect'}`;
    }
}
const aiRouterIntegration = new AIRouterIntegration();
const AIRouterIntegrationUtils = {
    /**
   * Initialize service integration for the application
   */ async initialize () {
        aiRouterIntegration.startHealthMonitoring();
        // Wait for initial health check
        await aiRouterIntegration.checkServiceHealth();
    },
    /**
   * Cleanup service integration
   */ cleanup () {
        aiRouterIntegration.stopHealthMonitoring();
    },
    /**
   * Check if service is ready and show user-friendly error if not
   */ async ensureServiceReady () {
        const status = await aiRouterIntegration.checkServiceHealth();
        if (status.healthy) {
            return {
                ready: true
            };
        }
        let message = 'The analysis service is currently unavailable.';
        if (!status.connected) {
            message += ' Please ensure the AI Router service is running.';
        } else if (status.error) {
            message += ` Error: ${status.error}`;
        }
        return {
            ready: false,
            message
        };
    },
    /**
   * Get current service configuration
   */ getServiceConfig () {
        const status = aiRouterIntegration.getStatus();
        const client = aiRouterIntegration.getClient();
        return {
            baseUrl: client.getBaseUrl(),
            healthy: status?.healthy || false,
            version: status?.version
        };
    }
};
}),
"[project]/proposal-prepper-middleware/src/ai-router-adapter.ts [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/proposal-prepper-middleware/src/ai-router-adapter.ts'\n\nExpected a semicolon");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/proposal-prepper-web/src/app/api/documents/upload/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */ /**
 * Next.js API Route for Document Upload
 *
 * This route now uses the Strands integration adapter for end-to-end workflow.
 * Connects to real Strands service with fallback to mock for development.
 */ __turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$middleware$2f$src$2f$ai$2d$router$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-middleware/src/ai-router-adapter.ts [app-route] (ecmascript)");
;
async function POST(req) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$middleware$2f$src$2f$ai$2d$router$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AIRouterHandlers"].handleDocumentUpload(req);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8dc89f8d._.js.map
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/proposal-prepper-web/src/components/ui/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
/**
 * UI Component Library Integration
 *
 * Centralized exports and configuration for @17sierra/ui components
 * used in the threshold functionality. Provides a consistent interface
 * for importing UI components across the application.
 */ // Re-export commonly used components from @17sierra/ui
// These will be the primary UI building blocks for threshold components
__turbopack_context__.s([
    "thresholdTheme",
    ()=>thresholdTheme,
    "variants",
    ()=>variants
]);
;
const thresholdTheme = {
    colors: {
        // Status colors for upload and analysis states
        upload: {
            pending: 'hsl(var(--muted))',
            uploading: 'hsl(var(--primary))',
            processing: 'hsl(var(--secondary))',
            completed: 'hsl(var(--success))',
            failed: 'hsl(var(--destructive))'
        },
        analysis: {
            queued: 'hsl(var(--muted))',
            extracting: 'hsl(var(--primary))',
            analyzing: 'hsl(var(--primary))',
            validating: 'hsl(var(--secondary))',
            completed: 'hsl(var(--success))',
            failed: 'hsl(var(--destructive))'
        },
        compliance: {
            pass: 'hsl(var(--success))',
            warning: 'hsl(var(--warning))',
            fail: 'hsl(var(--destructive))'
        }
    }
};
const variants = {
    button: {
        upload: 'bg-blue-600 hover:bg-blue-700 text-white',
        analyze: 'bg-green-600 hover:bg-green-700 text-white',
        results: 'bg-purple-600 hover:bg-purple-700 text-white'
    },
    badge: {
        status: {
            pending: 'bg-gray-100 text-gray-800',
            processing: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            failed: 'bg-red-100 text-red-800'
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-web/src/config/app.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_71e9c2d2cf8cafae81b603ed19f33f35/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
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
    /** Base URL for Strands service - Docker container or localhost */ strandsBaseUrl: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_STRANDS_URL || __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.STRANDS_SERVICE_URL || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ''),
    /** Use mock APIs for development (when external services aren't available) */ useMockApis: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_USE_MOCK_APIS === 'true',
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-web/src/types/app.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
/**
 * Application Type Definitions
 *
 * Core TypeScript interfaces and types for the Proposal Prepper application.
 * These types define the data models used across the upload, analysis,
 * and results presentation components.
 */ /**
 * Upload Session Management
 *
 * Tracks the state and progress of document upload operations.
 * Used by the Upload Manager component to provide user feedback
 * and handle upload lifecycle events.
 */ __turbopack_context__.s([
    "AnalysisStatus",
    ()=>AnalysisStatus,
    "IssueSeverity",
    ()=>IssueSeverity,
    "NotificationType",
    ()=>NotificationType,
    "UploadStatus",
    ()=>UploadStatus,
    "ViewType",
    ()=>ViewType
]);
var UploadStatus = /*#__PURE__*/ function(UploadStatus) {
    UploadStatus["PENDING"] = "pending";
    UploadStatus["UPLOADING"] = "uploading";
    UploadStatus["PROCESSING"] = "processing";
    UploadStatus["COMPLETED"] = "completed";
    UploadStatus["FAILED"] = "failed";
    return UploadStatus;
}({});
var AnalysisStatus = /*#__PURE__*/ function(AnalysisStatus) {
    AnalysisStatus["QUEUED"] = "queued";
    AnalysisStatus["EXTRACTING"] = "extracting";
    AnalysisStatus["ANALYZING"] = "analyzing";
    AnalysisStatus["VALIDATING"] = "validating";
    AnalysisStatus["COMPLETED"] = "completed";
    AnalysisStatus["FAILED"] = "failed";
    return AnalysisStatus;
}({});
var ViewType = /*#__PURE__*/ function(ViewType) {
    ViewType["DASHBOARD"] = "dashboard";
    ViewType["UPLOAD"] = "upload";
    ViewType["ANALYSIS"] = "analysis";
    ViewType["RESULTS"] = "results";
    ViewType["SETTINGS"] = "settings";
    return ViewType;
}({});
var NotificationType = /*#__PURE__*/ function(NotificationType) {
    NotificationType["INFO"] = "info";
    NotificationType["SUCCESS"] = "success";
    NotificationType["WARNING"] = "warning";
    NotificationType["ERROR"] = "error";
    return NotificationType;
}({});
var IssueSeverity = /*#__PURE__*/ function(IssueSeverity) {
    IssueSeverity["CRITICAL"] = "critical";
    IssueSeverity["WARNING"] = "warning";
    IssueSeverity["INFO"] = "info";
    return IssueSeverity;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-web/src/utils/performance.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
            return ("TURBOPACK compile-time value", "object") !== 'undefined' && window.localStorage !== undefined;
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
}
function lazyLoadImage(img, src) {
    if (("TURBOPACK compile-time value", "object") === 'undefined' || !('IntersectionObserver' in window)) {
        img.src = src;
        return;
    }
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if (entry.isIntersecting) {
                img.src = src;
                observer.unobserve(img);
            }
        });
    }, {
        threshold: 0.1
    });
    observer.observe(img);
}
(function(PerformanceMonitor) {
    const marks = new Map();
    function mark(name) {
        if (("TURBOPACK compile-time value", "object") !== 'undefined' && window.performance) {
            window.performance.mark(name);
            marks.set(name, Date.now());
        }
    }
    PerformanceMonitor.mark = mark;
    function measure(name, startMark, endMark) {
        if (("TURBOPACK compile-time value", "object") === 'undefined' || !window.performance) {
            // Fallback measurement
            const startTime = marks.get(startMark);
            const endTime = endMark ? marks.get(endMark) : Date.now();
            return startTime && endTime ? endTime - startTime : null;
        }
        try {
            if (endMark) {
                window.performance.measure(name, startMark, endMark);
            } else {
                window.performance.measure(name, startMark);
            }
            const entries = window.performance.getEntriesByName(name, 'measure');
            return entries.length > 0 ? entries[entries.length - 1].duration : null;
        } catch (error) {
            console.warn('Performance measurement failed:', error);
            return null;
        }
    }
    PerformanceMonitor.measure = measure;
    function getNavigationTiming() {
        if (("TURBOPACK compile-time value", "object") === 'undefined' || !window.performance?.timing) {
            return null;
        }
        const timing = window.performance.timing;
        return {
            domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
            loadComplete: timing.loadEventEnd - timing.navigationStart,
            domInteractive: timing.domInteractive - timing.navigationStart,
            firstPaint: timing.responseEnd - timing.navigationStart
        };
    }
    PerformanceMonitor.getNavigationTiming = getNavigationTiming;
})(PerformanceMonitor || (PerformanceMonitor = {}));
const apiCache = new BrowserCache('proposal-prepper-api', 10 * 60 * 1000); // 10 minutes
const uiStateCache = new MemoryCache(60 * 1000); // 1 minute
const resultsCache = new BrowserCache('proposal-prepper-results', 60 * 60 * 1000); // 1 hour
;
var PerformanceMonitor;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-services/src/ai-router-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/config/app.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/utils/performance.ts [app-client] (ecmascript)");
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
        this.timeout = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiConfig"].requestTimeout;
        this.maxRetries = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiConfig"].maxRetries;
        this.retryDelay = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiConfig"].retryDelay;
    }
    /**
   * Make HTTP request with retry logic and caching
   * Performance optimization for Requirement 5.1
   */ async makeRequest(endpoint, options = {}, cacheKey, cacheTTL) {
        // Check cache for GET requests
        if (options.method === 'GET' && cacheKey) {
            const cached = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiCache"].get(cacheKey);
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
        __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerformanceMonitor"].mark(`${requestId}-start`);
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
                    __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiCache"].set(cacheKey, data, cacheTTL);
                }
                // Performance monitoring
                __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerformanceMonitor"].mark(`${requestId}-end`);
                const duration = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$utils$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerformanceMonitor"].measure(requestId, `${requestId}-start`, `${requestId}-end`);
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
            error: lastError?.message || __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorConfig"].defaultErrorMessage,
            code: this.getErrorCode(lastError)
        };
    }
    /**
   * Get appropriate error code based on error type
   */ getErrorCode(error) {
        if (!error) return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorConfig"].codes.NETWORK_ERROR;
        if (error.name === 'AbortError') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorConfig"].codes.TIMEOUT_ERROR;
        }
        if (error.message.includes('HTTP 4')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorConfig"].codes.VALIDATION_FAILED;
        }
        // Check for specific connection errors
        if (error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND') || error.message.includes('ECONNRESET')) {
            return 'SERVICE_UNAVAILABLE';
        }
        if (error.message.includes('HTTP 5')) {
            return 'SERVICE_ERROR';
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorConfig"].codes.NETWORK_ERROR;
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
                            code: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorConfig"].codes.UPLOAD_FAILED
                        });
                    }
                } catch (_error) {
                    resolve({
                        success: false,
                        error: 'Failed to parse upload response',
                        code: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorConfig"].codes.UPLOAD_FAILED
                    });
                }
            });
            xhr.addEventListener('error', ()=>{
                resolve({
                    success: false,
                    error: 'Upload network error',
                    code: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorConfig"].codes.NETWORK_ERROR
                });
            });
            xhr.addEventListener('timeout', ()=>{
                resolve({
                    success: false,
                    error: 'Upload timeout',
                    code: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorConfig"].codes.TIMEOUT_ERROR
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
        this.maxReconnectAttempts = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiConfig"].websocket.maxReconnectAttempts;
        this.reconnectInterval = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiConfig"].websocket.reconnectInterval;
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
    constructor(baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiConfig"].strandsBaseUrl){
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
    if ("TURBOPACK compile-time truthy", 1) {
        return new AIRouterClient(window.location.origin);
    }
    //TURBOPACK unreachable
    ;
    // Server-side: use the configured backend URL
    // Import configuration dynamically to avoid circular dependencies
    let config;
}
function createAIRouterClientWithConfig(baseUrl, _useMock = false) {
    return new AIRouterClient(baseUrl);
}
const aiRouterClient = createAIRouterClient();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-services/src/upload-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
/**
 * Upload Service
 *
 * Service layer for managing document uploads and integrating with the Strands API.
 * Provides upload session management, progress tracking, and error handling.
 * Implements requirements 1.1, 1.2, 1.3, 1.4, and 1.5 for upload functionality.
 */ __turbopack_context__.s([
    "UploadService",
    ()=>UploadService,
    "uploadService",
    ()=>uploadService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/config/app.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/types/app.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-services/src/ai-router-client.ts [app-client] (ecmascript)");
;
;
;
class UploadService {
    activeSessions = new Map();
    eventHandlers = {};
    /**
   * Set event handlers for upload events
   */ setEventHandlers(handlers) {
        this.eventHandlers = {
            ...this.eventHandlers,
            ...handlers
        };
    }
    /**
   * Upload a document file
   * Requirement 1.1: Accept PDF format files
   * Requirement 1.5: Show upload progress and status
   */ async uploadDocument(file, sessionId) {
        // Create or update session
        const session = sessionId && this.activeSessions.has(sessionId) ? {
            ...this.activeSessions.get(sessionId),
            status: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].UPLOADING
        } : {
            id: sessionId || `upload_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
            filename: file.name,
            fileSize: file.size,
            mimeType: file.type,
            status: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].UPLOADING,
            progress: 0,
            startedAt: new Date()
        };
        this.activeSessions.set(session.id, session);
        try {
            // Upload file with progress tracking
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].uploadDocument(file, (progress)=>{
                const updatedSession = {
                    ...session,
                    progress
                };
                this.activeSessions.set(session.id, updatedSession);
                this.eventHandlers.onProgress?.(session.id, progress);
            });
            if (response.success && response.data) {
                // Update session with server response
                const completedSession = {
                    ...session,
                    id: response.data.id,
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].COMPLETED,
                    progress: 100,
                    completedAt: new Date()
                };
                // Remove the original session if the ID changed
                if (session.id !== completedSession.id) {
                    this.activeSessions.delete(session.id);
                }
                this.activeSessions.set(completedSession.id, completedSession);
                this.eventHandlers.onComplete?.(completedSession.id, completedSession);
                return {
                    success: true,
                    sessionId: completedSession.id
                };
            } else {
                const error = response.error || 'Upload failed';
                const failedSession = {
                    ...session,
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].FAILED,
                    errorMessage: error
                };
                this.activeSessions.set(session.id, failedSession);
                this.eventHandlers.onError?.(session.id, error);
                return {
                    success: false,
                    sessionId: session.id,
                    error
                };
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Upload failed';
            const failedSession = {
                ...session,
                status: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].FAILED,
                errorMessage
            };
            this.activeSessions.set(session.id, failedSession);
            this.eventHandlers.onError?.(session.id, errorMessage);
            return {
                success: false,
                sessionId: session.id,
                error: errorMessage
            };
        }
    }
    /**
   * Get upload session status
   * Requirement 1.5: Show upload progress and status
   */ async getUploadStatus(sessionId) {
        // Check local session first
        const localSession = this.activeSessions.get(sessionId);
        if (localSession && localSession.status !== __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].COMPLETED) {
            return localSession;
        }
        // Query server for completed sessions
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].getUploadStatus(sessionId);
            if (response.success && response.data) {
                const session = this.mapApiResponseToSession(response.data);
                this.activeSessions.set(sessionId, session);
                return session;
            }
        } catch (error) {
            console.error('Failed to get upload status:', error);
        }
        return localSession || null;
    }
    /**
   * Get all active upload sessions
   */ getActiveSessions() {
        return Array.from(this.activeSessions.values());
    }
    /**
   * Cancel an upload session
   */ cancelUpload(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (session && session.status === __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].UPLOADING) {
            const cancelledSession = {
                ...session,
                status: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].FAILED,
                errorMessage: 'Upload cancelled by user'
            };
            this.activeSessions.set(sessionId, cancelledSession);
            return true;
        }
        return false;
    }
    /**
   * Clear completed or failed sessions
   */ clearSession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (session && (session.status === __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].COMPLETED || session.status === __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].FAILED)) {
            this.activeSessions.delete(sessionId);
            return true;
        }
        return false;
    }
    /**
   * Clear all sessions
   */ clearAllSessions() {
        this.activeSessions.clear();
    }
    /**
   * Validate file before upload
   * Requirement 1.1: PDF format validation
   * Requirement 1.2: File size validation
   */ validateFile(file) {
        // Check file type (requirement 1.1: PDF format only)
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadConfig"].acceptedTypes.includes(file.type)) {
            return {
                isValid: false,
                error: 'Only PDF files are accepted for upload.',
                errorCode: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorConfig"].codes.VALIDATION_FAILED
            };
        }
        // Check file size limits (requirement 1.2)
        if (file.size > __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadConfig"].maxFileSize) {
            const maxSizeMB = Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadConfig"].maxFileSize / (1024 * 1024));
            return {
                isValid: false,
                error: `File size exceeds the maximum limit of ${maxSizeMB}MB.`,
                errorCode: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorConfig"].codes.VALIDATION_FAILED
            };
        }
        if (file.size < __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadConfig"].minFileSize) {
            return {
                isValid: false,
                error: 'File is too small. Please select a valid PDF document.',
                errorCode: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorConfig"].codes.VALIDATION_FAILED
            };
        }
        // Check filename validity
        if (file.name.length > 255) {
            return {
                isValid: false,
                error: 'Filename is too long. Maximum 255 characters allowed.',
                errorCode: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorConfig"].codes.VALIDATION_FAILED
            };
        }
        return {
            isValid: true
        };
    }
    /**
   * Map API response to internal session format
   */ mapApiResponseToSession(apiResponse) {
        return {
            id: apiResponse.id,
            filename: apiResponse.filename,
            fileSize: apiResponse.fileSize,
            mimeType: apiResponse.mimeType,
            status: this.mapApiStatusToLocal(apiResponse.status),
            progress: apiResponse.progress,
            startedAt: new Date(apiResponse.startedAt),
            completedAt: apiResponse.completedAt ? new Date(apiResponse.completedAt) : undefined,
            errorMessage: apiResponse.errorMessage
        };
    }
    /**
   * Map API status to local status enum
   */ mapApiStatusToLocal(apiStatus) {
        switch(apiStatus){
            case 'pending':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].PENDING;
            case 'uploading':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].UPLOADING;
            case 'processing':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].PROCESSING;
            case 'completed':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].COMPLETED;
            case 'failed':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].FAILED;
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$types$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadStatus"].PENDING;
        }
    }
    /**
   * Subscribe to real-time upload progress updates via WebSocket
   */ async subscribeToRealTimeUpdates() {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].connectWebSocket();
            __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].subscribeToUploadProgress((message)=>{
                const sessionId = message.sessionId;
                const session = this.activeSessions.get(sessionId);
                // Type guard for progress data
                const data = message.data;
                if (session && typeof data.progress === 'number') {
                    const updatedSession = {
                        ...session,
                        progress: data.progress
                    };
                    this.activeSessions.set(sessionId, updatedSession);
                    this.eventHandlers.onProgress?.(sessionId, data.progress);
                }
            });
        } catch (error) {
            console.error('Failed to subscribe to real-time updates:', error);
        }
    }
    /**
   * Unsubscribe from real-time updates
   */ unsubscribeFromRealTimeUpdates() {
        __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].disconnectWebSocket();
    }
}
const uploadService = new UploadService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-web/src/components/analysis/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */ /**
 * Analysis session status enumeration
 * Tracks the current state of document analysis
 */ __turbopack_context__.s([
    "AnalysisStatus",
    ()=>AnalysisStatus,
    "IssueSeverity",
    ()=>IssueSeverity
]);
var AnalysisStatus = /*#__PURE__*/ function(AnalysisStatus) {
    AnalysisStatus["QUEUED"] = "queued";
    AnalysisStatus["EXTRACTING"] = "extracting";
    AnalysisStatus["ANALYZING"] = "analyzing";
    AnalysisStatus["VALIDATING"] = "validating";
    AnalysisStatus["COMPLETED"] = "completed";
    AnalysisStatus["FAILED"] = "failed";
    return AnalysisStatus;
}({});
var IssueSeverity = /*#__PURE__*/ function(IssueSeverity) {
    IssueSeverity["CRITICAL"] = "critical";
    IssueSeverity["WARNING"] = "warning";
    IssueSeverity["INFO"] = "info";
    return IssueSeverity;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-web/src/config/api-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_71e9c2d2cf8cafae81b603ed19f33f35/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
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
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env[name] || fallback;
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
    if ("TURBOPACK compile-time truthy", 1) {
        // Check URL path for mock indicator
        if (window.location.pathname.includes('/mock')) {
            return true;
        }
        // Check localStorage override
        const mockOverride = localStorage.getItem('use-mock-api');
        if (mockOverride !== null) {
            return mockOverride === 'true';
        }
    }
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
        if ("TURBOPACK compile-time truthy", 1) {
            // Browser environment - use current origin for Next.js routes
            return window.location.origin;
        } else //TURBOPACK unreachable
        ;
    }
    // Real Strands API URL - prioritize Docker container networking
    const realUrl = getEnvVar(ENV_VARS.STRANDS_API_URL) || getEnvVar('STRANDS_SERVICE_URL');
    if (realUrl) return realUrl;
    // Default real API URL - use Docker service name for server-side, localhost for client-side
    if ("TURBOPACK compile-time truthy", 1) {
        // Browser environment - use localhost
        return 'http://localhost:8080';
    } else //TURBOPACK unreachable
    ;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-services/src/ai-router-integration.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/config/api-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-services/src/ai-router-client.ts [app-client] (ecmascript)");
;
;
class AIRouterIntegration {
    client;
    status = null;
    statusListeners = new Set();
    healthCheckInterval = null;
    healthCheckIntervalMs = 30000;
    constructor(client = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"]){
        this.client = client;
        // Listen for configuration changes
        __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiConfigManager"].subscribe((config)=>{
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
            this.client = new __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AIRouterClient"](config.baseUrl); // Assuming AIRouterClient constructor takes baseUrl
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
                const testClient = new __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AIRouterClient"](url);
                const healthy = await testClient.isServiceHealthy();
                if (healthy) {
                    // Update configuration to use this URL
                    __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiConfigManager"].updateConfiguration({
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-services/src/analysis-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
/**
 * Analysis Service
 *
 * Service layer for managing compliance analysis and integrating with the Strands API.
 * Provides analysis session management, progress tracking, and results retrieval.
 * Implements requirements 2.1, 2.2, 2.3, 2.4, and 2.5 for analysis functionality.
 */ __turbopack_context__.s([
    "AnalysisService",
    ()=>AnalysisService,
    "analysisService",
    ()=>analysisService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/components/analysis/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/config/app.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-services/src/ai-router-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$integration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-services/src/ai-router-integration.ts [app-client] (ecmascript)");
;
;
;
;
class AnalysisService {
    activeSessions = new Map();
    eventHandlers = {};
    /**
   * Set event handlers for analysis events
   */ setEventHandlers(handlers) {
        this.eventHandlers = {
            ...this.eventHandlers,
            ...handlers
        };
    }
    /**
   * Start compliance analysis
   * Requirement 2.1: Validate against core FAR/DFARS requirements
   * Requirement 2.4: Generate basic compliance status
   */ async startAnalysis(request) {
        try {
            // Check if service is ready before attempting analysis
            const serviceReady = await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$integration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AIRouterIntegrationUtils"].ensureServiceReady();
            if (!serviceReady.ready) {
                return {
                    success: false,
                    sessionId: '',
                    error: serviceReady.message || 'Analysis service is not available'
                };
            }
            // Start analysis with Strands API
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].startAnalysis(request.proposalId, request.proposalId, request.documentId);
            if (response.success && response.data) {
                // Create local session from API response
                const session = this.mapApiResponseToSession(response.data);
                this.activeSessions.set(session.id, session);
                // Start progress monitoring
                this.monitorAnalysisProgress(session.id);
                return {
                    success: true,
                    sessionId: session.id
                };
            } else {
                const error = response.error || 'Failed to start analysis';
                return {
                    success: false,
                    sessionId: '',
                    error
                };
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Analysis start failed';
            return {
                success: false,
                sessionId: '',
                error: errorMessage
            };
        }
    }
    /**
   * Get analysis session status
   * Requirement 2.4: Generate basic compliance status
   */ async getAnalysisStatus(sessionId) {
        // Check local session first
        const localSession = this.activeSessions.get(sessionId);
        if (localSession && localSession.status !== __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].COMPLETED) {
            return localSession;
        }
        // Query server for latest status
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].getAnalysisStatus(sessionId);
            if (response.success && response.data) {
                const session = this.mapApiResponseToSession(response.data);
                this.activeSessions.set(sessionId, session);
                return session;
            }
        } catch (error) {
            console.error('Failed to get analysis status:', error);
        }
        return localSession || null;
    }
    /**
   * Cancel analysis session
   * Requirement 2.5: Error handling and recovery options
   */ async cancelAnalysis(sessionId) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].cancelAnalysis(sessionId);
            if (response.success) {
                const session = this.activeSessions.get(sessionId);
                if (session) {
                    const cancelledSession = {
                        ...session,
                        status: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].FAILED,
                        currentStep: 'Analysis cancelled',
                        errorMessage: 'Analysis cancelled by user'
                    };
                    this.activeSessions.set(sessionId, cancelledSession);
                }
                return true;
            }
        } catch (error) {
            console.error('Failed to cancel analysis:', error);
        }
        return false;
    }
    /**
   * Get all active analysis sessions
   */ getActiveSessions() {
        return Array.from(this.activeSessions.values());
    }
    /**
   * Clear completed or failed sessions
   */ clearSession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (session && (session.status === __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].COMPLETED || session.status === __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].FAILED)) {
            this.activeSessions.delete(sessionId);
            return true;
        }
        return false;
    }
    /**
   * Clear all sessions
   */ clearAllSessions() {
        this.activeSessions.clear();
    }
    /**
   * Get Strands service status
   */ async getServiceStatus() {
        const _status = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$integration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterIntegration"].getStatus();
        const config = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$integration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AIRouterIntegrationUtils"].getServiceConfig();
        return {
            healthy: config.healthy,
            message: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$integration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterIntegration"].getStatusMessage(),
            baseUrl: config.baseUrl,
            version: config.version
        };
    }
    /**
   * Initialize service integration
   */ async initializeServiceIntegration() {
        await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$integration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AIRouterIntegrationUtils"].initialize();
    }
    /**
   * Monitor analysis progress with polling
   * Requirement 2.4: Analysis progress tracking
   */ async monitorAnalysisProgress(sessionId) {
        const pollInterval = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analysisConfig"].progressUpdateInterval;
        let attempts = 0;
        const maxAttempts = Math.floor(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$config$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analysisConfig"].analysisTimeout / pollInterval);
        const poll = async ()=>{
            try {
                const session = await this.getAnalysisStatus(sessionId);
                if (!session) {
                    return; // Session not found, stop polling
                }
                // Notify progress
                this.eventHandlers.onProgress?.(sessionId, session.progress, session.currentStep);
                // Check if analysis is complete
                if (session.status === __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].COMPLETED) {
                    this.eventHandlers.onComplete?.(sessionId, session);
                    return;
                }
                // Check if analysis failed
                if (session.status === __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].FAILED) {
                    this.eventHandlers.onError?.(sessionId, session.errorMessage || 'Analysis failed');
                    return;
                }
                // Continue polling if still in progress
                attempts++;
                if (attempts < maxAttempts && (session.status === __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].QUEUED || session.status === __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].EXTRACTING || session.status === __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].ANALYZING || session.status === __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].VALIDATING)) {
                    setTimeout(poll, pollInterval);
                } else if (attempts >= maxAttempts) {
                    // Timeout
                    const timeoutSession = {
                        ...session,
                        status: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].FAILED,
                        errorMessage: 'Analysis timeout'
                    };
                    this.activeSessions.set(sessionId, timeoutSession);
                    this.eventHandlers.onError?.(sessionId, 'Analysis timeout');
                }
            } catch (error) {
                console.error('Error polling analysis progress:', error);
                this.eventHandlers.onError?.(sessionId, 'Failed to monitor analysis progress');
            }
        };
        // Start polling
        setTimeout(poll, pollInterval);
    }
    /**
   * Subscribe to real-time analysis progress updates via WebSocket
   * Requirement 2.4: Real-time progress tracking
   */ async subscribeToRealTimeUpdates() {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].connectWebSocket();
            __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].subscribeToAnalysisProgress((message)=>{
                const sessionId = message.sessionId;
                const session = this.activeSessions.get(sessionId);
                // Type guard for progress data
                const data = message.data;
                if (session && typeof data.progress === 'number') {
                    const updatedSession = {
                        ...session,
                        progress: data.progress,
                        currentStep: data.currentStep || session.currentStep
                    };
                    this.activeSessions.set(sessionId, updatedSession);
                    this.eventHandlers.onProgress?.(sessionId, data.progress, updatedSession.currentStep);
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].subscribeToAnalysisComplete((message)=>{
                const sessionId = message.sessionId;
                const session = this.activeSessions.get(sessionId);
                if (session) {
                    const completedSession = {
                        ...session,
                        status: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].COMPLETED,
                        progress: 100,
                        completedAt: new Date()
                    };
                    this.activeSessions.set(sessionId, completedSession);
                    this.eventHandlers.onComplete?.(sessionId, completedSession);
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].subscribeToErrors((message)=>{
                const sessionId = message.sessionId;
                const session = this.activeSessions.get(sessionId);
                if (session) {
                    // Type guard for error data
                    const data = message.data;
                    const failedSession = {
                        ...session,
                        status: __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].FAILED,
                        errorMessage: data.error || 'Analysis failed'
                    };
                    this.activeSessions.set(sessionId, failedSession);
                    this.eventHandlers.onError?.(sessionId, failedSession.errorMessage);
                }
            });
        } catch (error) {
            console.error('Failed to subscribe to real-time updates:', error);
        }
    }
    /**
   * Unsubscribe from real-time updates
   */ unsubscribeFromRealTimeUpdates() {
        __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].disconnectWebSocket();
    }
    /**
   * Validate analysis request parameters
   * Requirement 2.1: FAR/DFARS validation framework
   */ validateAnalysisRequest(request) {
        if (!request.proposalId || request.proposalId.trim().length === 0) {
            return {
                isValid: false,
                error: 'Proposal ID is required for analysis'
            };
        }
        if (request.proposalId.length > 128) {
            return {
                isValid: false,
                error: 'Proposal ID is too long'
            };
        }
        // Validate frameworks if specified
        if (request.frameworks) {
            const validFrameworks = [
                'FAR',
                'DFARS'
            ];
            const invalidFrameworks = request.frameworks.filter((f)=>!validFrameworks.includes(f));
            if (invalidFrameworks.length > 0) {
                return {
                    isValid: false,
                    error: `Invalid frameworks: ${invalidFrameworks.join(', ')}`
                };
            }
        }
        return {
            isValid: true
        };
    }
    /**
   * Retry failed analysis
   * Requirement 2.5: Error recovery options
   */ async retryAnalysis(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session) {
            return {
                success: false,
                error: 'Session not found'
            };
        }
        if (session.status !== __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].FAILED) {
            return {
                success: false,
                error: 'Can only retry failed analyses'
            };
        }
        // Start new analysis with same proposal ID
        const request = {
            proposalId: session.proposalId,
            documentId: session.proposalId,
            frameworks: [
                'FAR',
                'DFARS'
            ]
        };
        const result = await this.startAnalysis(request);
        if (result.success) {
            // Clear old failed session
            this.activeSessions.delete(sessionId);
            return {
                success: true,
                newSessionId: result.sessionId
            };
        }
        return {
            success: false,
            error: result.error
        };
    }
    /**
   * Map API response to internal session format
   */ mapApiResponseToSession(apiResponse) {
        return {
            id: apiResponse.id,
            proposalId: apiResponse.proposalId,
            status: this.mapApiStatusToLocal(apiResponse.status),
            progress: apiResponse.progress,
            startedAt: new Date(apiResponse.startedAt),
            completedAt: apiResponse.completedAt ? new Date(apiResponse.completedAt) : undefined,
            currentStep: apiResponse.currentStep,
            estimatedCompletion: apiResponse.estimatedCompletion ? new Date(apiResponse.estimatedCompletion) : undefined
        };
    }
    /**
   * Map API status to local status enum
   */ mapApiStatusToLocal(apiStatus) {
        switch(apiStatus){
            case 'queued':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].QUEUED;
            case 'extracting':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].EXTRACTING;
            case 'analyzing':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].ANALYZING;
            case 'validating':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].VALIDATING;
            case 'completed':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].COMPLETED;
            case 'failed':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].FAILED;
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].QUEUED;
        }
    }
}
const analysisService = new AnalysisService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-web/src/components/results/types.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */ __turbopack_context__.s([
    "ComplianceStatus",
    ()=>ComplianceStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/components/analysis/types.ts [app-client] (ecmascript)");
;
var ComplianceStatus = /*#__PURE__*/ function(ComplianceStatus) {
    ComplianceStatus["PASS"] = "pass";
    ComplianceStatus["FAIL"] = "fail";
    ComplianceStatus["WARNING"] = "warning";
    return ComplianceStatus;
}({});
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-services/src/results-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
/**
 * Results Service
 *
 * Service layer for managing compliance analysis results and integrating with the Strands API.
 * Provides results retrieval, issue details, and regulatory references.
 * Implements requirements 3.1, 3.2, 3.3, 3.4, and 3.5 for results functionality.
 */ __turbopack_context__.s([
    "ResultsService",
    ()=>ResultsService,
    "resultsService",
    ()=>resultsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$results$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/components/results/types.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/components/analysis/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-services/src/ai-router-client.ts [app-client] (ecmascript)");
;
;
class ResultsService {
    resultsCache = new Map();
    eventHandlers = {};
    /**
   * Set event handlers for results events
   */ setEventHandlers(handlers) {
        this.eventHandlers = {
            ...this.eventHandlers,
            ...handlers
        };
    }
    /**
   * Get compliance analysis results
   * Requirement 3.1: Show compliance status (pass/fail/warning)
   * Requirement 3.2: List identified compliance issues
   */ async getResults(proposalId, useCache = true) {
        // Check cache first if requested
        if (useCache && this.resultsCache.has(proposalId)) {
            const cachedResults = this.resultsCache.get(proposalId);
            return {
                success: true,
                results: cachedResults
            };
        }
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].getResults(proposalId);
            if (response.success && response.data) {
                const results = this.mapApiResponseToResults(response.data);
                // Cache the results
                this.resultsCache.set(proposalId, results);
                // Notify listeners
                this.eventHandlers.onResultsUpdate?.(proposalId, results);
                return {
                    success: true,
                    results
                };
            } else {
                const error = response.error || 'Failed to retrieve results';
                this.eventHandlers.onError?.(proposalId, error);
                return {
                    success: false,
                    error
                };
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Results retrieval failed';
            this.eventHandlers.onError?.(proposalId, errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        }
    }
    /**
   * Get specific compliance issue details
   * Requirement 3.5: Allow users to see specific issue locations
   */ async getIssueDetails(sessionId, issueId) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].getIssueDetails(issueId);
            if (response.success && response.data) {
                return {
                    success: true,
                    issue: response.data
                };
            } else {
                const error = response.error || 'Failed to retrieve issue details';
                return {
                    success: false,
                    error
                };
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Issue details retrieval failed';
            return {
                success: false,
                error: errorMessage
            };
        }
    }
    /**
   * Get regulatory references for issues
   * Requirement 3.4: Reference specific FAR/DFARS sections
   */ getRegulatoryReferences(results) {
        const references = new Map();
        // Collect all regulatory references from issues
        results.issues.forEach((issue)=>{
            if (issue.regulation) {
                // Extract framework (FAR, DFARS) and section from regulation
                const parts = issue.regulation.split(' ');
                const framework = parts[0]; // e.g., "FAR" or "DFARS"
                const section = parts.slice(1).join(' '); // e.g., "52.204-1"
                if (!references.has(framework)) {
                    references.set(framework, new Set());
                }
                references.get(framework).add(section);
            }
        });
        // Convert to array format
        return Array.from(references.entries()).map(([framework, sections])=>({
                framework,
                sections: Array.from(sections).sort(),
                count: sections.size
            }));
    }
    /**
   * Get remediation guidance for issues
   * Requirement 3.3: Include basic remediation recommendations
   */ getRemediationGuidance(issueId, results) {
        if (!results) return null;
        const issue = results.issues.find((i)=>i.id === issueId);
        if (!issue || !issue.remediation) return null;
        return issue.remediation;
    }
    /**
   * Filter issues by severity
   */ filterIssuesBySeverity(results, severity) {
        return results.issues.filter((issue)=>issue.severity === severity);
    }
    /**
   * Get issue statistics
   */ getIssueStatistics(results) {
        const stats = {
            total: results.issues.length,
            critical: 0,
            warning: 0,
            info: 0,
            byFramework: []
        };
        const frameworkCounts = new Map();
        results.issues.forEach((issue)=>{
            // Count by severity
            switch(issue.severity){
                case __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IssueSeverity"].CRITICAL:
                    stats.critical++;
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IssueSeverity"].WARNING:
                    stats.warning++;
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IssueSeverity"].INFO:
                    stats.info++;
                    break;
            }
            // Count by framework
            if (issue.regulation) {
                // Extract framework (FAR, DFARS) from regulation
                const framework = issue.regulation.split(' ')[0]; // e.g., "FAR" or "DFARS"
                frameworkCounts.set(framework, (frameworkCounts.get(framework) || 0) + 1);
            }
        });
        // Convert framework counts to array
        stats.byFramework = Array.from(frameworkCounts.entries()).map(([framework, count])=>({
                framework,
                count
            }));
        return stats;
    }
    /**
   * Export results to different formats
   */ async exportResults(proposalId, format = 'json') {
        const resultsResponse = await this.getResults(proposalId);
        if (!resultsResponse.success || !resultsResponse.results) {
            return {
                success: false,
                error: resultsResponse.error || 'No results to export'
            };
        }
        const results = resultsResponse.results;
        try {
            switch(format){
                case 'json':
                    return {
                        success: true,
                        data: JSON.stringify(results, null, 2)
                    };
                case 'csv':
                    {
                        const csvData = this.convertToCSV(results);
                        return {
                            success: true,
                            data: csvData
                        };
                    }
                case 'pdf':
                    // For threshold implementation, return JSON format
                    // In full implementation, this would generate a PDF
                    return {
                        success: true,
                        data: JSON.stringify(results, null, 2)
                    };
                default:
                    return {
                        success: false,
                        error: 'Unsupported export format'
                    };
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Export failed';
            return {
                success: false,
                error: errorMessage
            };
        }
    }
    /**
   * Clear cached results
   */ clearCache(proposalId) {
        if (proposalId) {
            this.resultsCache.delete(proposalId);
        } else {
            this.resultsCache.clear();
        }
    }
    /**
   * Get cached results
   */ getCachedResults(proposalId) {
        return this.resultsCache.get(proposalId) || null;
    }
    /**
   * Check if results are available for a proposal
   */ async hasResults(proposalId) {
        // Check cache first
        if (this.resultsCache.has(proposalId)) {
            return true;
        }
        // Check with API
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$ai$2d$router$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiRouterClient"].getResults(proposalId);
            return response.success && !!response.data;
        } catch  {
            return false;
        }
    }
    /**
   * Convert results to CSV format
   */ convertToCSV(results) {
        const headers = [
            'Issue ID',
            'Severity',
            'Title',
            'Description',
            'Framework',
            'Section',
            'Reference',
            'Remediation'
        ];
        const rows = [
            headers.join(',')
        ];
        results.issues.forEach((issue)=>{
            const row = [
                issue.id,
                issue.severity,
                `"${issue.title.replace(/"/g, '""')}"`,
                `"${issue.description.replace(/"/g, '""')}"`,
                issue.regulation || '',
                issue.regulation || '',
                issue.regulation || '',
                issue.remediation ? `"${issue.remediation.replace(/"/g, '""')}"` : ''
            ];
            rows.push(row.join(','));
        });
        return rows.join('\n');
    }
    /**
   * Map API response to internal results format
   */ mapApiResponseToResults(apiResponse) {
        return {
            sessionId: apiResponse.id,
            proposalId: apiResponse.proposalId,
            status: this.mapApiStatusToLocal(apiResponse.status),
            overallScore: this.calculateOverallScore(apiResponse.issues),
            issues: apiResponse.issues.map(this.mapApiIssueToLocal),
            metadata: {
                totalPages: 1,
                processingTime: 0,
                rulesChecked: this.extractRulesChecked(apiResponse.issues),
                completedAt: new Date(apiResponse.generatedAt),
                issueCounts: {
                    critical: apiResponse.summary.criticalIssues,
                    warning: apiResponse.summary.warningIssues,
                    info: apiResponse.summary.totalIssues - apiResponse.summary.criticalIssues - apiResponse.summary.warningIssues
                }
            }
        };
    }
    /**
   * Map API status to local status enum
   */ mapApiStatusToLocal(apiStatus) {
        switch(apiStatus){
            case 'pass':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$results$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ComplianceStatus"].PASS;
            case 'fail':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$results$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ComplianceStatus"].FAIL;
            case 'warning':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$results$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ComplianceStatus"].WARNING;
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$results$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ComplianceStatus"].WARNING;
        }
    }
    /**
   * Map API issue to local issue format
   */ mapApiIssueToLocal = (apiIssue)=>{
        return {
            id: apiIssue.id,
            severity: this.mapApiSeverityToLocal(apiIssue.severity),
            title: apiIssue.title,
            description: apiIssue.description,
            regulation: apiIssue.regulation ? apiIssue.regulation.reference : '',
            location: apiIssue.location ? {
                page: apiIssue.location.page,
                section: apiIssue.location.section,
                lineNumber: 0
            } : undefined,
            remediation: apiIssue.remediation
        };
    };
    /**
   * Map API severity to local severity enum
   */ mapApiSeverityToLocal(apiSeverity) {
        switch(apiSeverity){
            case 'critical':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IssueSeverity"].CRITICAL;
            case 'warning':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IssueSeverity"].WARNING;
            case 'info':
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IssueSeverity"].INFO;
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IssueSeverity"].INFO;
        }
    }
    /**
   * Calculate overall score from issues
   */ calculateOverallScore(issues) {
        if (issues.length === 0) return 100;
        const criticalPenalty = issues.filter((i)=>i.severity === 'critical').length * 20;
        const warningPenalty = issues.filter((i)=>i.severity === 'warning').length * 10;
        const infoPenalty = issues.filter((i)=>i.severity === 'info').length * 5;
        const totalPenalty = criticalPenalty + warningPenalty + infoPenalty;
        return Math.max(0, 100 - totalPenalty);
    }
    /**
   * Extract rules checked from issues
   */ extractRulesChecked(issues) {
        const rules = new Set();
        issues.forEach((issue)=>{
            if (issue.regulation) {
                rules.add(issue.regulation.reference);
            }
        });
        return Array.from(rules);
    }
}
const resultsService = new ResultsService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-web/src/components/agent-interface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_71e9c2d2cf8cafae81b603ed19f33f35/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCheck$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/file-check.js [app-client] (ecmascript) <export default as FileCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_71e9c2d2cf8cafae81b603ed19f33f35/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/components/ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/@17sierra+ui@0.2.5_@types+react-dom@19.2.3_@types+react@19.2.7__@types+react@19.2.7_rea_bff31ee3cb8c4d9acca46be2761aafb7/node_modules/@17sierra/ui/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$upload$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-services/src/upload-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$analysis$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-services/src/analysis-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$results$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-services/src/results-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/components/analysis/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
// Map analysis status to step information
const analysisSteps = [
    {
        id: 1,
        message: 'Uploading and processing document...',
        status: 'pending',
        agent: 'coordinator',
        details: 'Document Upload'
    },
    {
        id: 2,
        message: 'Extracting document structure and text...',
        status: 'pending',
        agent: 'rag',
        details: 'Text Extraction'
    },
    {
        id: 3,
        message: 'Validating against FAR/DFARS requirements...',
        status: 'pending',
        agent: 'compliance',
        details: 'Compliance Analysis'
    },
    {
        id: 4,
        message: 'Checking regulatory clause compliance...',
        status: 'pending',
        agent: 'compliance',
        details: 'Validation Check'
    },
    {
        id: 5,
        message: 'Synthesizing compliance report...',
        status: 'pending',
        agent: 'writer',
        details: 'Report Generation'
    }
];
// Map AnalysisStatus to step index
function getStepIndexFromStatus(status) {
    switch(status){
        case __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].QUEUED:
            return 0;
        case __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].EXTRACTING:
            return 1;
        case __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].ANALYZING:
            return 2;
        case __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].VALIDATING:
            return 3;
        case __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].COMPLETED:
            return 4;
        case __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$analysis$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisStatus"].FAILED:
            return -1;
        default:
            return 0;
    }
}
const AgentInterface = ({ activeProject, onAnalysisStart, onAnalysisComplete, onAnalysisError })=>{
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('steps');
    const [steps, setSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSending, setIsSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAnalysisComplete, setIsAnalysisComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedFile, setSelectedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isUploading, setIsUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadError, setUploadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [analysisSessionId, setAnalysisSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollToBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AgentInterface.useCallback[scrollToBottom]": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["AgentInterface.useCallback[scrollToBottom]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AgentInterface.useEffect": ()=>{
            scrollToBottom();
        }
    }["AgentInterface.useEffect"], [
        scrollToBottom
    ]);
    // Handle file selection
    const handleFileSelect = (event)=>{
        const file = event.target.files?.[0];
        if (file) {
            // Validate file
            const validation = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$upload$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadService"].validateFile(file);
            if (!validation.isValid) {
                setUploadError(validation.error || 'Invalid file');
                return;
            }
            setSelectedFile(file);
            setUploadError(null);
        }
    };
    // Handle upload and analysis
    const handleUploadAndAnalyze = async ()=>{
        if (!selectedFile) return;
        setIsUploading(true);
        setUploadError(null);
        setSteps(analysisSteps.map((step)=>({
                ...step,
                status: 'pending'
            })));
        setIsAnalysisComplete(false);
        setMessages([]);
        // Notify parent that analysis is starting
        onAnalysisStart();
        try {
            // Step 1: Upload document
            setSteps((prev)=>prev.map((step, idx)=>idx === 0 ? {
                        ...step,
                        status: 'running'
                    } : step));
            const uploadResult = await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$upload$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadService"].uploadDocument(selectedFile);
            if (!uploadResult.success) {
                throw new Error(uploadResult.error || 'Upload failed');
            }
            // Mark upload complete, start analysis
            setSteps((prev)=>prev.map((step, idx)=>idx === 0 ? {
                        ...step,
                        status: 'complete'
                    } : idx === 1 ? {
                        ...step,
                        status: 'running'
                    } : step));
            // Step 2-5: Start analysis
            const analysisResult = await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$analysis$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analysisService"].startAnalysis({
                proposalId: uploadResult.sessionId,
                documentId: uploadResult.sessionId,
                frameworks: [
                    'FAR',
                    'DFARS'
                ]
            });
            if (!analysisResult.success) {
                throw new Error(analysisResult.error || 'Analysis failed to start');
            }
            setAnalysisSessionId(analysisResult.sessionId);
            // Set up event handlers for progress updates
            __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$analysis$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analysisService"].setEventHandlers({
                onProgress: (sessionId, progress, currentStep)=>{
                    // Update steps based on current step info
                    const session = __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$analysis$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analysisService"].getActiveSessions().find((s)=>s.id === sessionId);
                    if (session) {
                        const stepIndex = getStepIndexFromStatus(session.status);
                        setSteps((prev)=>prev.map((step, idx)=>{
                                if (idx < stepIndex) return {
                                    ...step,
                                    status: 'complete'
                                };
                                if (idx === stepIndex) return {
                                    ...step,
                                    status: 'running'
                                };
                                return step;
                            }));
                    }
                },
                onComplete: async (sessionId, session)=>{
                    // Mark all steps complete
                    setSteps((prev)=>prev.map((step)=>({
                                ...step,
                                status: 'complete'
                            })));
                    setIsAnalysisComplete(true);
                    setIsUploading(false);
                    // Fetch results
                    try {
                        const resultsResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$services$2f$src$2f$results$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resultsService"].getResults(session.proposalId);
                        if (resultsResponse.success && resultsResponse.results) {
                            const results = resultsResponse.results;
                            const issueCount = results.issues.length;
                            const criticalCount = results.issues.filter((i)=>i.severity === 'critical').length;
                            setMessages([
                                {
                                    role: 'bot',
                                    content: `Analysis complete. I found ${issueCount} compliance issue${issueCount !== 1 ? 's' : ''} (${criticalCount} critical). The proposal has a ${results.overallScore}% compliance score. You can view the full details in the report panel.`
                                }
                            ]);
                            setActiveTab('results');
                            // Notify parent with the results
                            onAnalysisComplete(results);
                        }
                    } catch (err) {
                        console.error('Failed to fetch results:', err);
                        onAnalysisError('Failed to fetch analysis results');
                    }
                },
                onError: (sessionId, error)=>{
                    setSteps((prev)=>prev.map((step, idx)=>{
                            const runningIdx = prev.findIndex((s)=>s.status === 'running');
                            if (idx === runningIdx || runningIdx === -1 && idx === prev.length - 1) {
                                return {
                                    ...step,
                                    status: 'error'
                                };
                            }
                            return step;
                        }));
                    setUploadError(error);
                    setIsUploading(false);
                    onAnalysisError(error);
                }
            });
        // Start monitoring (polling for progress)
        // The analysis service handles this internally
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            setUploadError(errorMessage);
            setSteps((prev)=>prev.map((step, idx)=>{
                    if (step.status === 'running') return {
                        ...step,
                        status: 'error'
                    };
                    return step;
                }));
            setIsUploading(false);
            onAnalysisError(errorMessage);
        }
    };
    const handleSendMessage = async ()=>{
        if (!inputValue.trim()) return;
        const userMessage = {
            role: 'user',
            content: inputValue
        };
        setMessages((prev)=>[
                ...prev,
                userMessage
            ]);
        setInputValue('');
        setIsSending(true);
        // For now, provide a contextual response
        // In full implementation, this would query an AI for follow-up questions
        setTimeout(()=>{
            const botMessage = {
                role: 'bot',
                content: "I can help you understand the compliance findings. Ask me about specific FAR/DFARS clauses, remediation steps, or how to address the identified issues."
            };
            setMessages((prev)=>[
                    ...prev,
                    botMessage
                ]);
            setIsSending(false);
        }, 1000);
    };
    const getAgentIcon = (agent)=>{
        switch(agent){
            case 'coordinator':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                    size: 14,
                    className: "text-blue-500"
                }, void 0, false, {
                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                    lineNumber: 267,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            case 'rag':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {
                    size: 14,
                    className: "text-purple-500"
                }, void 0, false, {
                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                    lineNumber: 269,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            case 'compliance':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                    size: 14,
                    className: "text-green-500"
                }, void 0, false, {
                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                    lineNumber: 271,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            case 'writer':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCheck$3e$__["FileCheck"], {
                    size: 14,
                    className: "text-orange-500"
                }, void 0, false, {
                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                    lineNumber: 273,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                    size: 14,
                    className: "text-gray-500"
                }, void 0, false, {
                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                    lineNumber: 275,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
        }
    };
    // Helper for SearchIcon
    const SearchIcon = ({ size, className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: size,
            height: size,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: className,
            "aria-label": "Search",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "11",
                    cy: "11",
                    r: "8"
                }, void 0, false, {
                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                    lineNumber: 294,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "m21 21-4.3-4.3"
                }, void 0, false, {
                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                    lineNumber: 295,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
            lineNumber: 281,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0));
    const getStepIcon = (status)=>{
        switch(status){
            case 'complete':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                    size: 20,
                    className: "text-green-500"
                }, void 0, false, {
                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                    lineNumber: 302,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            case 'running':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    size: 20,
                    className: "text-blue-500 animate-spin"
                }, void 0, false, {
                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                    lineNumber: 304,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            case 'error':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                    size: 20,
                    className: "text-red-500"
                }, void 0, false, {
                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                    lineNumber: 306,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-5 h-5 rounded-full border-2 border-gray-200"
                }, void 0, false, {
                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                    lineNumber: 308,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 flex flex-col h-full bg-white relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto scrollbar-hide p-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mx-auto w-full space-y-8",
                    children: [
                        !activeProject && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-blue-50 w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center text-blue-600 shadow-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        size: 40
                                    }, void 0, false, {
                                        fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                        lineNumber: 319,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                    lineNumber: 318,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-slate-900 mb-3 tracking-tight",
                                    children: "AI Regulatory Assistant"
                                }, void 0, false, {
                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                    lineNumber: 321,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 max-w-md mx-auto mb-10 text-lg leading-relaxed",
                                    children: "Upload your proposal to analyze against FAR/DFARS requirements using our multi-agent compliance engine."
                                }, void 0, false, {
                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                    lineNumber: 324,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center gap-4 max-w-md mx-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ref: fileInputRef,
                                            type: "file",
                                            accept: ".pdf,application/pdf",
                                            onChange: handleFileSelect,
                                            className: "hidden"
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                            lineNumber: 330,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>fileInputRef.current?.click(),
                                            className: "flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md hover:bg-blue-50/30 transition-all group bg-white w-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        size: 24
                                                    }, void 0, false, {
                                                        fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-left",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold text-slate-800 text-base",
                                                            children: selectedFile ? selectedFile.name : 'Select Proposal PDF'
                                                        }, void 0, false, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                            lineNumber: 347,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-500 mt-1 leading-relaxed",
                                                            children: selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : 'Upload a PDF document for compliance analysis'
                                                        }, void 0, false, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                            lineNumber: 350,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                            lineNumber: 338,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        uploadError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg w-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                uploadError
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                            lineNumber: 360,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        selectedFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Button"], {
                                            onClick: handleUploadAndAnalyze,
                                            disabled: isUploading,
                                            className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-3",
                                            children: isUploading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        size: 16,
                                                        className: "animate-spin mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Analyzing..."
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCheck$3e$__["FileCheck"], {
                                                        size: 16,
                                                        className: "mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Start Compliance Analysis"
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                            lineNumber: 367,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                    lineNumber: 329,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                            lineNumber: 317,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        activeProject && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col h-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex border-b border-gray-200 mb-6 bg-white sticky top-0 z-10 pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setActiveTab('steps'),
                                            className: `pb-3 px-1 text-sm font-medium mr-6 transition-colors border-b-2 ${activeTab === 'steps' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-slate-800'}`,
                                            children: "Live Analysis"
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                            lineNumber: 392,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setActiveTab('results'),
                                            className: `pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${activeTab === 'results' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-slate-800'}`,
                                            children: "Results & Chat"
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                            lineNumber: 402,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                    lineNumber: 391,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                activeTab === 'steps' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4 animate-in fade-in duration-300",
                                    children: [
                                        steps.map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex gap-3 p-4 rounded-xl border transition-all ${step.status === 'running' ? 'bg-blue-50/50 border-blue-100 shadow-sm' : step.status === 'error' ? 'bg-red-50/50 border-red-100' : 'bg-white border-gray-100'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 shrink-0",
                                                        children: getStepIcon(step.status)
                                                    }, void 0, false, {
                                                        fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                        lineNumber: 424,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-1",
                                                                children: [
                                                                    getAgentIcon(step.agent || 'coordinator'),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] font-bold uppercase tracking-wider text-gray-400",
                                                                        children: step.details
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                                        lineNumber: 430,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                                lineNumber: 428,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `text-sm font-medium ${step.status === 'pending' ? 'text-gray-400' : step.status === 'error' ? 'text-red-600' : 'text-slate-700'}`,
                                                                children: step.message
                                                            }, void 0, false, {
                                                                fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                                lineNumber: 434,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                        lineNumber: 427,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, step.id, true, {
                                                fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                lineNumber: 417,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))),
                                        isAnalysisComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 p-4 bg-green-50 border border-green-100 rounded-xl text-sm text-green-800 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-2 bg-green-100 rounded-full",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                        lineNumber: 449,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                    lineNumber: 448,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold",
                                                            children: "Analysis Complete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                            lineNumber: 452,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-green-700",
                                                            children: "All compliance checks have finished. View results in the chat tab."
                                                        }, void 0, false, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                            lineNumber: 453,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                            lineNumber: 447,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                    lineNumber: 415,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                activeTab === 'results' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6 animate-in fade-in duration-300 pb-4",
                                    children: [
                                        messages.map((message, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex gap-4 ${message.role === 'user' ? 'justify-end' : ''}`,
                                                children: [
                                                    message.role === 'bot' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 p-1",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                            size: 18,
                                                            className: "text-indigo-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                            lineNumber: 472,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `flex-1 max-w-xl ${message.role === 'user' ? 'flex justify-end' : ''}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `p-4 rounded-2xl text-slate-800 leading-relaxed text-sm shadow-sm ${message.role === 'bot' ? 'bg-white border border-gray-100 rounded-tl-none' : 'bg-blue-600 text-white rounded-br-none'}`,
                                                            children: message.content
                                                        }, void 0, false, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                            lineNumber: 480,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                        lineNumber: 476,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                lineNumber: 465,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))),
                                        isSending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4 animate-pulse",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 p-1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                        size: 18,
                                                        className: "text-indigo-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                        lineNumber: 494,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none text-slate-800 leading-relaxed text-sm w-32 h-12 flex items-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-2 h-2 bg-gray-300 rounded-full animate-bounce",
                                                                    style: {
                                                                        animationDelay: '0ms'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                                    lineNumber: 499,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-2 h-2 bg-gray-300 rounded-full animate-bounce",
                                                                    style: {
                                                                        animationDelay: '150ms'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                                    lineNumber: 503,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-2 h-2 bg-gray-300 rounded-full animate-bounce",
                                                                    style: {
                                                                        animationDelay: '300ms'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                                    lineNumber: 507,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                            lineNumber: 498,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                        lineNumber: 497,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                            lineNumber: 492,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: messagesEndRef
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                            lineNumber: 516,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                    lineNumber: 463,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                            lineNumber: 390,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                    lineNumber: 315,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                lineNumber: 314,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/80 backdrop-blur-md p-4 border-t border-gray-200 shrink-0 z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mx-auto w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Textarea"], {
                                    value: inputValue,
                                    onChange: (e)=>setInputValue(e.target.value),
                                    onKeyDown: (e)=>{
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    },
                                    placeholder: activeProject ? 'Ask follow-up questions...' : 'Upload a proposal to start analysis.',
                                    className: "w-full p-4 pr-14 text-sm resize-none bg-white min-h-[56px] shadow-sm border-gray-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl transition-all",
                                    rows: 1,
                                    disabled: !activeProject || isSending
                                }, void 0, false, {
                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                    lineNumber: 527,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-3 right-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Button"], {
                                        size: "icon",
                                        className: `h-8 w-8 rounded-lg transition-all ${inputValue ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`,
                                        disabled: !inputValue || isSending || !activeProject,
                                        onClick: handleSendMessage,
                                        children: isSending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            size: 16,
                                            className: "animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                            lineNumber: 550,
                                            columnNumber: 30
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                            lineNumber: 550,
                                            columnNumber: 79
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                        lineNumber: 544,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                    lineNumber: 543,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                            lineNumber: 526,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mt-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-gray-400 font-medium",
                                children: "AI can make mistakes. Review generated compliance reports."
                            }, void 0, false, {
                                fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                                lineNumber: 555,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                            lineNumber: 554,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                    lineNumber: 525,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
                lineNumber: 524,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/proposal-prepper-web/src/components/agent-interface.tsx",
        lineNumber: 313,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AgentInterface, "vXzRc+W3vMsQEzwT/z0rt43My70=");
_c = AgentInterface;
const __TURBOPACK__default__export__ = AgentInterface;
var _c;
__turbopack_context__.k.register(_c, "AgentInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-web/src/components/layout/sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_71e9c2d2cf8cafae81b603ed19f33f35/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_71e9c2d2cf8cafae81b603ed19f33f35/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/@17sierra+ui@0.2.5_@types+react-dom@19.2.3_@types+react@19.2.7__@types+react@19.2.7_rea_bff31ee3cb8c4d9acca46be2761aafb7/node_modules/@17sierra/ui/dist/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const Sidebar = ({ activeProject, setActiveProject, resetDemo, isOpen })=>{
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-slate-50 border-gray-200 flex flex-col h-full shrink-0 transition-all duration-300 ease-in-out overflow-hidden shadow-inner ${isOpen ? 'w-[280px] border-r opacity-100' : 'w-0 border-r-0 opacity-0'}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-[280px] flex flex-col h-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 pt-5 pb-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Button"], {
                        onClick: resetDemo,
                        className: "w-full text-sm font-medium shadow-sm bg-indigo-600 hover:bg-indigo-700 text-white transition-colors h-10 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 16,
                                strokeWidth: 2.5
                            }, void 0, false, {
                                fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            "New Compliance Check"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-2 mt-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex p-1 bg-gray-200/50 rounded-lg mx-2 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setActiveTab('all'),
                                className: `flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-gray-500 hover:text-slate-700 hover:bg-gray-200/50'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                        lineNumber: 43,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Recent"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setActiveTab('favorites'),
                                className: `flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'favorites' ? 'bg-white text-slate-800 shadow-sm' : 'text-gray-500 hover:text-slate-700 hover:bg-gray-200/50'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Saved"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-4 py-2 custom-scrollbar",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-wider flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    size: 10
                                }, void 0, false, {
                                    fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " Today"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            role: "button",
                            tabIndex: 0,
                            onClick: ()=>setActiveProject('proj-1'),
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter' || e.key === ' ') {
                                    setActiveProject('proj-1');
                                }
                            },
                            className: `w-full text-left p-3 rounded-xl border transition-all relative cursor-pointer ${activeProject === 'proj-1' ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 'bg-white border-transparent hover:border-gray-200 hover:bg-gray-50'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `p-2 rounded-md ${activeProject === 'proj-1' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-500'} transition-colors`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                                lineNumber: 82,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `font-medium text-sm truncate ${activeProject ? 'text-blue-700' : 'text-slate-700'}`,
                                                    children: "SaaS Proposal - DOE"
                                                }, void 0, false, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                                    lineNumber: 85,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[11px] text-gray-400 mt-1 flex justify-between items-center font-medium",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "10:23 AM"
                                                        }, void 0, false, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                                            lineNumber: 91,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex items-center gap-1 text-slate-400",
                                                            children: [
                                                                "92% ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-1.5 h-1.5 rounded-full bg-green-500 inline-block"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                                                    lineNumber: 93,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                                            lineNumber: 92,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                            lineNumber: 84,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    className: "absolute right-2 top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                        size: 14,
                                        className: "text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                activeProject && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full border border-blue-200 p-0.5 text-blue-600 shadow-sm z-10 w-5 h-5 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                        lineNumber: 109,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-3 border-t border-gray-200 bg-slate-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] text-center text-gray-300 font-mono",
                        children: "v2.1.0-mesh"
                    }, void 0, false, {
                        fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/proposal-prepper-web/src/components/layout/sidebar.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Sidebar, "7vguO2KxQmUV88wYqyuAWP6PjbE=");
_c = Sidebar;
const __TURBOPACK__default__export__ = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-web/src/components/layout/top-bar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_71e9c2d2cf8cafae81b603ed19f33f35/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-client] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/panel-left-close.js [app-client] (ecmascript) <export default as PanelLeftClose>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftOpen$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/panel-left-open.js [app-client] (ecmascript) <export default as PanelLeftOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/components/ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/@17sierra+ui@0.2.5_@types+react-dom@19.2.3_@types+react@19.2.7__@types+react@19.2.7_rea_bff31ee3cb8c4d9acca46be2761aafb7/node_modules/@17sierra/ui/dist/index.js [app-client] (ecmascript) <locals>");
'use client';
;
;
;
const TopBar = ({ toggleSidebar, isSidebarOpen })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-between shadow-sm z-20 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 text-slate-800 font-semibold text-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        onClick: toggleSidebar,
                        className: "h-9 w-9 text-slate-500 hover:text-primary hover:bg-primary/5 transition-colors",
                        title: isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar',
                        children: isSidebarOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__["PanelLeftClose"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                            lineNumber: 22,
                            columnNumber: 28
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftOpen$3e$__["PanelLeftOpen"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                            lineNumber: 22,
                            columnNumber: 59
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm shadow-indigo-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "leading-tight",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            "ATARC Agentic AI Lab",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full border border-amber-200 uppercase font-bold tracking-wider",
                                                children: "Alpha"
                                            }, void 0, false, {
                                                fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                                                lineNumber: 32,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                                        lineNumber: 30,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] text-gray-400 font-normal tracking-wide",
                                        children: "PROPOSAL PREPPER WORKSPACE"
                                    }, void 0, false, {
                                        fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                                        lineNumber: 36,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        className: "h-9 w-9 text-slate-400 hover:text-slate-600",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        className: "h-9 w-9 text-slate-400 hover:text-slate-600 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"
                            }, void 0, false, {
                                fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-6 bg-gray-200 mx-1"
                    }, void 0, false, {
                        fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        className: "h-9 w-9 text-slate-400 hover:text-slate-600",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Avatar"], {
                        className: "h-9 w-9 text-xs border border-gray-100 shadow-sm cursor-pointer hover:ring-2 hover:ring-indigo-100 transition-all",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AvatarFallback"], {
                            className: "bg-indigo-50 text-indigo-700 font-bold",
                            children: "AF"
                        }, void 0, false, {
                            fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/proposal-prepper-web/src/components/layout/top-bar.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = TopBar;
const __TURBOPACK__default__export__ = TopBar;
var _c;
__turbopack_context__.k.register(_c, "TopBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-web/src/components/report-preview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_71e9c2d2cf8cafae81b603ed19f33f35/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/@17sierra+ui@0.2.5_@types+react-dom@19.2.3_@types+react@19.2.7__@types+react@19.2.7_rea_bff31ee3cb8c4d9acca46be2761aafb7/node_modules/@17sierra/ui/dist/index.js [app-client] (ecmascript) <locals>");
'use client';
;
;
;
const ReportPreview = ({ isVisible })=>{
    if (!isVisible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 bg-slate-50 border-l border-gray-200 h-full flex flex-col animate-in slide-in-from-right duration-500 z-10 shadow-xl max-w-[50%] min-w-[500px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-20 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                size: 18,
                                className: "text-blue-600"
                            }, void 0, false, {
                                fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                lineNumber: 17,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold text-slate-800 text-sm",
                                children: "Compliance Report Preview"
                            }, void 0, false, {
                                fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                lineNumber: 18,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                className: "h-8 text-xs gap-1.5 hidden md:flex",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                        lineNumber: 22,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Fullscreen"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Button"], {
                                size: "sm",
                                className: "h-8 text-xs gap-1.5 bg-slate-900 hover:bg-slate-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                        lineNumber: 25,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Download PDF"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 p-6 md:p-8 overflow-y-auto bg-gray-50/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white shadow-lg rounded-sm w-full max-w-[800px] mx-auto p-10 md:p-14 relative ring-1 ring-gray-900/5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-start mb-10 border-b-2 border-slate-900 pb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-3xl font-bold text-slate-900 mb-2 tracking-tight",
                                            children: "Compliance Validation Report"
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 35,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 text-sm font-medium",
                                            children: "Generated by ATARC Compliance Agent"
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 38,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-md inline-block mb-1",
                                            children: "Ref: PROP-2024-001"
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-500 flex items-center justify-end gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " Dec 04, 2025"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 46,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-8 w-1 bg-blue-600 rounded-full"
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 55,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-slate-800 uppercase tracking-wider text-sm",
                                            children: "Executive Summary"
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 56,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 leading-relaxed mb-6 font-serif text-justify",
                                    children: [
                                        "The submitted proposal",
                                        ' ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "text-slate-900",
                                            children: '"Cloud Modernization Initiative"'
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " has been analyzed against the current Federal Acquisition Regulation (FAR) and Defense Federal Acquisition Regulation Supplement (DFARS). The document scored a",
                                        ' ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-green-100 text-green-800 px-1 py-0.5 rounded font-bold",
                                            children: "92% compliance rating"
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-green-50 border border-green-200 rounded-lg p-5 flex gap-4 items-start shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-green-100 p-2 rounded-full shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 24,
                                                className: "text-green-600"
                                            }, void 0, false, {
                                                fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                lineNumber: 73,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "text-green-900 block mb-1 text-base",
                                                    children: "Status: Compliant"
                                                }, void 0, false, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-green-800 leading-relaxed",
                                                    children: "This proposal meets all mandatory formatting and inclusion requirements for the targeted solicitation. No critical blocking issues were found."
                                                }, void 0, false, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-8 w-1 bg-slate-800 rounded-full"
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-slate-800 uppercase tracking-wider text-sm",
                                            children: "Detailed Findings"
                                        }, void 0, false, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "group border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all bg-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "bg-gray-100 text-gray-600 text-[10px] font-mono px-1.5 py-0.5 rounded border border-gray-200",
                                                                    children: "FAR 52.204-24"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                                    lineNumber: 99,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-sm text-slate-800",
                                                                    children: "Telecommunications Representation"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                                    lineNumber: 102,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                            lineNumber: 98,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Badge"], {
                                                            variant: "secondary",
                                                            className: "bg-green-100 text-green-700 border-green-200 font-bold hover:bg-green-100",
                                                            children: "PASS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                            lineNumber: 106,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500 pl-1 border-l-2 border-gray-200 ml-1",
                                                    children: "Representation Regarding Certain Telecommunications and Video Surveillance Services or Equipment is present and signed by authorized representative."
                                                }, void 0, false, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "group border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all bg-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "bg-gray-100 text-gray-600 text-[10px] font-mono px-1.5 py-0.5 rounded border border-gray-200",
                                                                    children: "FORMAT"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                                    lineNumber: 123,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-sm text-slate-800",
                                                                    children: "Biosketch Format (SciENcv)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                                    lineNumber: 126,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                            lineNumber: 122,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Badge"], {
                                                            variant: "secondary",
                                                            className: "bg-green-100 text-green-700 border-green-200 font-bold hover:bg-green-100",
                                                            children: "PASS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                            lineNumber: 130,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500 pl-1 border-l-2 border-gray-200 ml-1",
                                                    children: "All personnel biosketches adhere to the required SciENcv structure and page limits."
                                                }, void 0, false, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 120,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "group border border-yellow-200 rounded-lg p-4 bg-yellow-50/30 hover:shadow-md transition-all",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "bg-yellow-100 text-yellow-800 text-[10px] font-mono px-1.5 py-0.5 rounded border border-yellow-200",
                                                                    children: "REVIEW"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                                    lineNumber: 147,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-sm text-yellow-900",
                                                                    children: "Budget Justification"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                                    lineNumber: 150,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                            lineNumber: 146,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f40$17sierra$2b$ui$40$0$2e$2$2e$5_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$react$40$19$2e$2$2e$7_rea_bff31ee3cb8c4d9acca46be2761aafb7$2f$node_modules$2f40$17sierra$2f$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Badge"], {
                                                            variant: "secondary",
                                                            className: "bg-yellow-100 text-yellow-800 border-yellow-200 font-bold hover:bg-yellow-100",
                                                            children: "WARNING"
                                                        }, void 0, false, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                            lineNumber: 154,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2 items-start pl-1 border-l-2 border-yellow-300 ml-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                            size: 14,
                                                            className: "text-yellow-600 mt-0.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-yellow-800",
                                                            children: "Budget justification length is exactly at the limit (5 pages). Review for brevity recommended to avoid potential truncation checks."
                                                        }, void 0, false, {
                                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                            lineNumber: 163,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                            lineNumber: 144,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-12 text-center border-t border-gray-100 pt-8 text-[10px] text-gray-400 uppercase tracking-widest",
                            children: "CONFIDENTIAL - PROPRIETARY INFORMATION - DO NOT DISTRIBUTE"
                        }, void 0, false, {
                            fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/proposal-prepper-web/src/components/report-preview.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ReportPreview;
const __TURBOPACK__default__export__ = ReportPreview;
var _c;
__turbopack_context__.k.register(_c, "ReportPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proposal-prepper-web/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_71e9c2d2cf8cafae81b603ed19f33f35/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_@opentelemetry+api@1.9.0_@playwright+test@1.57.0_react-_71e9c2d2cf8cafae81b603ed19f33f35/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$agent$2d$interface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/components/agent-interface.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/components/layout/sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$layout$2f$top$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/components/layout/top-bar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$report$2d$preview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proposal-prepper-web/src/components/report-preview.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function App() {
    _s();
    const [activeProject, setActiveProject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showReport, setShowReport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [analysisResults, setAnalysisResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Called when analysis starts (file selected and upload begins)
    const handleAnalysisStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "App.useCallback[handleAnalysisStart]": ()=>{
            setActiveProject('analyzing');
            setShowReport(false);
            setAnalysisResults(null);
        }
    }["App.useCallback[handleAnalysisStart]"], []);
    // Called when analysis completes successfully with results
    const handleAnalysisComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "App.useCallback[handleAnalysisComplete]": (results)=>{
            setAnalysisResults(results);
            setShowReport(true);
        }
    }["App.useCallback[handleAnalysisComplete]"], []);
    // Called when analysis fails
    const handleAnalysisError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "App.useCallback[handleAnalysisError]": (error)=>{
            console.error('Analysis failed:', error);
        // Keep activeProject set so user can see the error state
        }
    }["App.useCallback[handleAnalysisError]"], []);
    const resetDemo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "App.useCallback[resetDemo]": ()=>{
            setActiveProject(null);
            setShowReport(false);
            setAnalysisResults(null);
            if (!isSidebarOpen) {
                setSidebarOpen(true);
            }
        }
    }["App.useCallback[resetDemo]"], [
        isSidebarOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen bg-background flex flex-col font-body text-slate-800 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$layout$2f$top$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                toggleSidebar: ()=>setSidebarOpen(!isSidebarOpen),
                isSidebarOpen: isSidebarOpen
            }, void 0, false, {
                fileName: "[project]/proposal-prepper-web/src/app/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 overflow-hidden h-[calc(100vh-64px)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        activeProject: activeProject,
                        setActiveProject: setActiveProject,
                        resetDemo: resetDemo,
                        isOpen: isSidebarOpen
                    }, void 0, false, {
                        fileName: "[project]/proposal-prepper-web/src/app/page.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 flex relative bg-white shadow-inner-xl m-0 md:my-2 md:mr-2 md:rounded-lg overflow-hidden border-t md:border border-gray-200/80 transition-all duration-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$agent$2d$interface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                activeProject: activeProject,
                                onAnalysisStart: handleAnalysisStart,
                                onAnalysisComplete: handleAnalysisComplete,
                                onAnalysisError: handleAnalysisError
                            }, void 0, false, {
                                fileName: "[project]/proposal-prepper-web/src/app/page.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$_71e9c2d2cf8cafae81b603ed19f33f35$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$proposal$2d$prepper$2d$web$2f$src$2f$components$2f$report$2d$preview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                isVisible: showReport,
                                results: analysisResults
                            }, void 0, false, {
                                fileName: "[project]/proposal-prepper-web/src/app/page.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/proposal-prepper-web/src/app/page.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/proposal-prepper-web/src/app/page.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/proposal-prepper-web/src/app/page.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(App, "4VemEzZUtdBSEkQAfSIAYNVPUIc=");
_c = App;
var _c;
__turbopack_context__.k.register(_c, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_a914040d._.js.map
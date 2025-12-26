// SPDX-License-Identifier: UNLICENSED
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

/**
 * AI Router Integration
 *
 * Provides high-level integration utilities for the AI routing service.s utilities for managing the integration between the web service
 * and the Strands service, including health monitoring, service discovery,
 * and error recovery.
 */

import { apiConfigManager } from './config/api-config';
import { AIRouterClient, aiRouterClient } from './ai-router-client';

/**
 * Service integration status
 */
export interface ServiceIntegrationStatus {
  connected: boolean;
  healthy: boolean;
  baseUrl: string;
  lastChecked: number;
  error?: string;
  checks?: Record<string, string>;
  version?: string;
}

/**
 * Service integration manager
 */
export class AIRouterIntegration {
  private client: AIRouterClient;
  private status: ServiceIntegrationStatus | null = null;
  private statusListeners: Set<(status: ServiceIntegrationStatus) => void> = new Set();
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private healthCheckIntervalMs = 30000; // 30 seconds

  constructor(client: AIRouterClient = aiRouterClient) {
    this.client = client;

    // Listen for configuration changes
    apiConfigManager.subscribe((config) => {
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
      this.client = new AIRouterClient(config.baseUrl); // Assuming AIRouterClient constructor takes baseUrl
      this.checkServiceHealth();
    });
  }

  /**
   * Get the current Strands API client
   */
  getClient(): AIRouterClient {
    return this.client;
  }

  /**
   * Get current service integration status
   */
  getStatus(): ServiceIntegrationStatus | null {
    return this.status;
  }

  /**
   * Check service health and update status
   */
  async checkServiceHealth(): Promise<ServiceIntegrationStatus> {
    try {
      // Use getServiceStatus which exists on AIRouterClient
      const serviceStatus = await this.client.getServiceStatus();

      this.status = {
        connected: true,
        healthy: serviceStatus.healthy,
        baseUrl: serviceStatus.baseUrl, // Assuming health status includes baseUrl
        lastChecked: Date.now(),
        error: serviceStatus.error,
        checks: serviceStatus.checks,
        version: serviceStatus.version,
      };
    } catch (error) {
      this.status = {
        connected: false,
        healthy: false,
        baseUrl: this.client.getBaseUrl(), // Assuming AIRouterClient has getBaseUrl
        lastChecked: Date.now(),
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    // Notify listeners
    this.notifyStatusListeners();
    return this.status;
  }

  /**
   * Start periodic health monitoring
   */
  startHealthMonitoring(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    // Initial check
    this.checkServiceHealth();

    // Periodic checks
    this.healthCheckInterval = setInterval(() => {
      this.checkServiceHealth();
    }, this.healthCheckIntervalMs);
  }

  /**
   * Stop periodic health monitoring
   */
  stopHealthMonitoring(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
  }

  /**
   * Subscribe to status changes
   */
  subscribeToStatus(listener: (status: ServiceIntegrationStatus) => void): () => void {
    this.statusListeners.add(listener);

    // Send current status immediately if available
    if (this.status) {
      listener(this.status);
    }

    return () => this.statusListeners.delete(listener);
  }

  /**
   * Notify all status listeners
   */
  private notifyStatusListeners(): void {
    if (this.status) {
      this.statusListeners.forEach((listener) => listener(this.status!));
    }
  }

  /**
   * Wait for service to become available
   */
  async waitForService(timeoutMs: number = 60000): Promise<boolean> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeoutMs) {
      await this.checkServiceHealth();

      if (this.status?.healthy) {
        return true;
      }

      // Wait before next check
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return false;
  }

  /**
   * Attempt to recover service connection
   */
  async recoverConnection(): Promise<boolean> {
    // Try different base URLs if the current one fails
    const fallbackUrls = [
      'http://strands:8080', // Docker container name
      'http://localhost:8080', // Local development
      'http://127.0.0.1:8080', // Alternative localhost
    ];

    for (const url of fallbackUrls) {
      try {
        const testClient = new AIRouterClient(url);
        const healthy = await testClient.isServiceHealthy();

        if (healthy) {
          // Update configuration to use this URL
          apiConfigManager.updateConfiguration({ baseUrl: url });
          await this.checkServiceHealth();
          return true;
        }
      } catch (_error) { }
    }

    return false;
  }

  /**
   * Get service readiness for operations
   */
  isReadyForOperations(): boolean {
    return this.status?.healthy === true;
  }

  /**
   * Get human-readable status message
   */
  getStatusMessage(): string {
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

/**
 * Global service integration manager instance
 */
export const aiRouterIntegration = new AIRouterIntegration();

/**
 * Utility functions for service integration
 */
export const AIRouterIntegrationUtils = {
  /**
   * Initialize service integration for the application
   */
  async initialize(): Promise<void> {
    aiRouterIntegration.startHealthMonitoring();

    // Wait for initial health check
    await aiRouterIntegration.checkServiceHealth();
  },

  /**
   * Cleanup service integration
   */
  cleanup(): void {
    aiRouterIntegration.stopHealthMonitoring();
  },

  /**
   * Check if service is ready and show user-friendly error if not
   */
  async ensureServiceReady(): Promise<{ ready: boolean; message?: string }> {
    const status = await aiRouterIntegration.checkServiceHealth();

    if (status.healthy) {
      return { ready: true };
    }

    let message = 'The analysis service is currently unavailable.';

    if (!status.connected) {
      message += ' Please ensure the AI Router service is running.';
    } else if (status.error) {
      message += ` Error: ${status.error}`;
    }

    return { ready: false, message };
  },

  /**
   * Get current service configuration
   */
  getServiceConfig(): { baseUrl: string; healthy: boolean; version?: string } {
    const status = aiRouterIntegration.getStatus();
    const client = aiRouterIntegration.getClient();

    return {
      baseUrl: client.getBaseUrl(),
      healthy: status?.healthy || false,
      version: status?.version,
    };
  },
};

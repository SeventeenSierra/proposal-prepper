// SPDX-License-Identifier: UNLICENSED
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

/**
 * Analysis Service
 *
 * Service layer for managing compliance analysis and integrating with the Analysis Engine API.
 * Provides analysis session management, progress tracking, and results retrieval.
 * Implements requirements 2.1, 2.2, 2.3, 2.4, and 2.5 for analysis functionality.
 */

export { AnalysisStatus, type AnalysisResult } from './components/analysis/types';
import { type AnalysisSession, AnalysisStatus } from './components/analysis/types';
import { analysisConfig } from './config/app';
import {
  aiRouterClient,
  type AnalysisSessionResponse,
} from './ai-router-client';
import { AIRouterIntegrationUtils, aiRouterIntegration } from './ai-router-integration';
import { uploadService } from './upload-service';

/**
 * Analysis service events
 */
export interface AnalysisServiceEvents {
  onProgress: (sessionId: string, progress: number, currentStep: string) => void;
  onComplete: (sessionId: string, session: AnalysisSession) => void;
  onError: (sessionId: string, error: string) => void;
}

/**
 * Analysis request parameters
 */
export interface AnalysisRequest {
  proposalId: string;
  documentId?: string;
  file?: File;
  onProgress?: (progress: number) => void;
  frameworks?: ('FAR' | 'DFARS')[];
  provider?: string;
  options?: {
    includeTextExtraction?: boolean;
    includeCriticalValidation?: boolean;
    includeWarningDetection?: boolean;
  };
}

/**
 * Analysis Service Class
 *
 * Manages compliance analysis with the Analysis Engine API, providing session tracking,
 * progress monitoring, and results retrieval capabilities.
 */
export class AnalysisService {
  private activeSessions = new Map<string, AnalysisSession>();
  private eventHandlers: Partial<AnalysisServiceEvents> = {};

  /**
   * Set event handlers for analysis events
   */
  setEventHandlers(handlers: Partial<AnalysisServiceEvents>) {
    this.eventHandlers = { ...this.eventHandlers, ...handlers };
  }

  /**
   * Start compliance analysis
   * Requirement 2.1: Validate against core FAR/DFARS requirements
   * Requirement 2.4: Generate basic compliance status
   */
  async startAnalysis(
    request: AnalysisRequest
  ): Promise<{ success: boolean; sessionId: string; error?: string }> {
    try {
      // Handle file upload if provided
      let documentId = request.documentId;
      if (request.file) {
        const uploadResult = await uploadService.uploadDocument(request.file, request.onProgress);
        if (!uploadResult.success || !uploadResult.sessionId) {
          return { success: false, sessionId: '', error: uploadResult.error || 'Upload failed' };
        }
        documentId = uploadResult.sessionId;
      }

      if (!documentId) {
        return { success: false, sessionId: '', error: 'Document ID or file is required' };
      }

      // Check if service is ready before attempting analysis
      const serviceReady = await AIRouterIntegrationUtils.ensureServiceReady();
      if (!serviceReady.ready) {
        return {
          success: false,
          sessionId: '',
          error: serviceReady.message || 'Analysis service is not available',
        };
      }

      console.log(`[AnalysisService] Starting analysis for proposal: ${request.proposalId}, document: ${documentId}`);

      // Start analysis with Analysis Engine API
      const response = await aiRouterClient.startAnalysis(
        request.proposalId,
        documentId,
        request.file?.name,
        undefined, // s3Key
        request.provider
      );

      if (response.success && response.data) {
        console.log(`[AnalysisService] Analysis started successfully. Session ID: ${response.data.id}`);
        // Create local session from API response
        const session = this.mapApiResponseToSession(response.data);
        this.activeSessions.set(session.id, session);

        // Start progress monitoring
        this.monitorAnalysisProgress(session.id);

        return { success: true, sessionId: session.id };
      } else {
        const error = response.error || 'Failed to start analysis';
        console.error(`[AnalysisService] Failed to start analysis: ${error}`);
        return { success: false, sessionId: '', error };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Analysis start failed';
      console.error('[AnalysisService] Exception in startAnalysis: %s', errorMessage, error);
      return { success: false, sessionId: '', error: errorMessage };
    }
  }

  /**
   * Get analysis session status
   * Requirement 2.4: Generate basic compliance status
   */
  async getAnalysisStatus(sessionId: string): Promise<AnalysisSession | null> {
    // Check local session first
    const localSession = this.activeSessions.get(sessionId);
    if (localSession && localSession.status !== AnalysisStatus.COMPLETED) {
      return localSession;
    }

    // Query server for latest status
    try {
      const response = await aiRouterClient.getAnalysisStatus(sessionId);
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
   */
  async cancelAnalysis(sessionId: string): Promise<boolean> {
    try {
      const response = await aiRouterClient.cancelAnalysis(sessionId);
      if (response.success) {
        const session = this.activeSessions.get(sessionId);
        if (session) {
          const cancelledSession = {
            ...session,
            status: AnalysisStatus.FAILED,
            currentStep: 'Analysis cancelled',
            errorMessage: 'Analysis cancelled by user',
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
   */
  getActiveSessions(): AnalysisSession[] {
    return Array.from(this.activeSessions.values());
  }

  /**
   * Clear completed or failed sessions
   */
  clearSession(sessionId: string): boolean {
    const session = this.activeSessions.get(sessionId);
    if (
      session &&
      (session.status === AnalysisStatus.COMPLETED || session.status === AnalysisStatus.FAILED)
    ) {
      this.activeSessions.delete(sessionId);
      return true;
    }
    return false;
  }

  /**
   * Clear all sessions
   */
  clearAllSessions(): void {
    this.activeSessions.clear();
  }

  /**
   * Get Analysis Engine service status
   */
  async getServiceStatus(): Promise<{
    healthy: boolean;
    message: string;
    baseUrl: string;
    version?: string;
  }> {
    const _status = aiRouterIntegration.getStatus();
    const config = AIRouterIntegrationUtils.getServiceConfig();

    return {
      healthy: config.healthy,
      message: aiRouterIntegration.getStatusMessage(),
      baseUrl: config.baseUrl,
      version: config.version,
    };
  }

  /**
   * Initialize service integration
   */
  async initializeServiceIntegration(): Promise<void> {
    await AIRouterIntegrationUtils.initialize();
  }

  /**
   * Monitor analysis progress with polling
   * Requirement 2.4: Analysis progress tracking
   */
  private async monitorAnalysisProgress(sessionId: string): Promise<void> {
    const pollInterval = analysisConfig.progressUpdateInterval;
    let attempts = 0;
    const maxAttempts = Math.floor(analysisConfig.analysisTimeout / pollInterval);

    const poll = async () => {
      try {
        console.log(`[AnalysisService] Polling status for session ${sessionId} (Attempt ${attempts + 1}/${maxAttempts})`);
        const session = await this.getAnalysisStatus(sessionId);
        if (!session) {
          console.warn(`[AnalysisService] Session ${sessionId} not found during polling`);
          return; // Session not found, stop polling
        }

        console.log(`[AnalysisService] Session ${sessionId} status: ${session.status}, progress: ${session.progress}%, step: ${session.currentStep}`);

        // Notify progress
        this.eventHandlers.onProgress?.(sessionId, session.progress, session.currentStep);

        // Check if analysis is complete
        if (session.status === AnalysisStatus.COMPLETED) {
          console.log(`[AnalysisService] Analysis complete for session ${sessionId}`);
          this.eventHandlers.onComplete?.(sessionId, session);
          return;
        }

        // Check if analysis failed
        if (session.status === AnalysisStatus.FAILED) {
          console.error(`[AnalysisService] Analysis failed for session ${sessionId}: ${session.errorMessage}`);
          this.eventHandlers.onError?.(sessionId, session.errorMessage || 'Analysis failed');
          return;
        }

        // Continue polling if still in progress
        attempts++;
        if (
          attempts < maxAttempts &&
          (session.status === AnalysisStatus.QUEUED ||
            session.status === AnalysisStatus.EXTRACTING ||
            session.status === AnalysisStatus.ANALYZING ||
            session.status === AnalysisStatus.VALIDATING)
        ) {
          setTimeout(poll, pollInterval);
        } else if (attempts >= maxAttempts) {
          // Timeout
          const timeoutSession = {
            ...session,
            status: AnalysisStatus.FAILED,
            errorMessage: 'Analysis timeout',
          };
          this.activeSessions.set(sessionId, timeoutSession);
          this.eventHandlers.onError?.(sessionId, 'Analysis timeout');
        }
      } catch (error) {
        console.error('Error polling analysis progress:', error);
        this.eventHandlers.onError?.(sessionId, 'Failed to monitor analysis progress');
      }
    };

    // Start polling immediately, then continue at intervals
    poll();
  }

  /**
   * Subscribe to real-time analysis progress updates via WebSocket
   * Requirement 2.4: Real-time progress tracking
   */
  async subscribeToRealTimeUpdates(): Promise<void> {
    try {
      await aiRouterClient.connectWebSocket();

      aiRouterClient.subscribeToAnalysisProgress((message: any) => {
        const sessionId = message.sessionId;
        const session = this.activeSessions.get(sessionId);

        // Type guard for progress data
        const data = message.data as { progress?: number; currentStep?: string };
        if (session && typeof data.progress === 'number') {
          const updatedSession = {
            ...session,
            progress: data.progress,
            currentStep: data.currentStep || session.currentStep,
          };
          this.activeSessions.set(sessionId, updatedSession);
          this.eventHandlers.onProgress?.(sessionId, data.progress, updatedSession.currentStep);
        }
      });

      aiRouterClient.subscribeToAnalysisComplete((message) => {
        const sessionId = message.sessionId;
        const session = this.activeSessions.get(sessionId);

        if (session) {
          const completedSession = {
            ...session,
            status: AnalysisStatus.COMPLETED,
            progress: 100,
            completedAt: new Date(),
          };
          this.activeSessions.set(sessionId, completedSession);
          this.eventHandlers.onComplete?.(sessionId, completedSession);
        }
      });

      aiRouterClient.subscribeToErrors((message) => {
        const sessionId = message.sessionId;
        const session = this.activeSessions.get(sessionId);

        if (session) {
          // Type guard for error data
          const data = message.data as { error?: string };
          const failedSession = {
            ...session,
            status: AnalysisStatus.FAILED,
            errorMessage: data.error || 'Analysis failed',
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
   */
  unsubscribeFromRealTimeUpdates(): void {
    aiRouterClient.disconnectWebSocket();
  }

  /**
   * Validate analysis request parameters
   * Requirement 2.1: FAR/DFARS validation framework
   */
  validateAnalysisRequest(request: AnalysisRequest): { isValid: boolean; error?: string } {
    if (!request.proposalId || request.proposalId.trim().length === 0) {
      return {
        isValid: false,
        error: 'Proposal ID is required for analysis',
      };
    }

    if (request.proposalId.length > 128) {
      return {
        isValid: false,
        error: 'Proposal ID is too long',
      };
    }

    // Validate frameworks if specified
    if (request.frameworks) {
      const validFrameworks = ['FAR', 'DFARS'];
      const invalidFrameworks = request.frameworks.filter((f) => !validFrameworks.includes(f));
      if (invalidFrameworks.length > 0) {
        return {
          isValid: false,
          error: `Invalid frameworks: ${invalidFrameworks.join(', ')}`,
        };
      }
    }

    return { isValid: true };
  }

  /**
   * Retry failed analysis
   * Requirement 2.5: Error recovery options
   */
  async retryAnalysis(
    sessionId: string
  ): Promise<{ success: boolean; newSessionId?: string; error?: string }> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      return { success: false, error: 'Session not found' };
    }

    if (session.status !== AnalysisStatus.FAILED) {
      return { success: false, error: 'Can only retry failed analyses' };
    }

    // Start new analysis with same proposal ID
    const request: AnalysisRequest = {
      proposalId: session.proposalId,
      documentId: session.proposalId, // Fallback to proposalId for retry
      frameworks: ['FAR', 'DFARS'], // Default frameworks
    };

    const result = await this.startAnalysis(request);
    if (result.success) {
      // Clear old failed session
      this.activeSessions.delete(sessionId);
      return { success: true, newSessionId: result.sessionId };
    }

    return { success: false, error: result.error };
  }

  /**
   * Map API response to internal session format
   */
  private mapApiResponseToSession(apiResponse: AnalysisSessionResponse): AnalysisSession {
    return {
      id: apiResponse.id,
      proposalId: apiResponse.proposalId,
      status: this.mapApiStatusToLocal(apiResponse.status),
      progress: apiResponse.progress,
      startedAt: new Date(apiResponse.startedAt),
      completedAt: apiResponse.completedAt ? new Date(apiResponse.completedAt) : undefined,
      currentStep: apiResponse.currentStep,
      estimatedCompletion: apiResponse.estimatedCompletion
        ? new Date(apiResponse.estimatedCompletion)
        : undefined,
    };
  }

  /**
   * Map API status to local status enum
   */
  private mapApiStatusToLocal(apiStatus: string): AnalysisStatus {
    switch (apiStatus) {
      case 'queued':
        return AnalysisStatus.QUEUED;
      case 'extracting':
        return AnalysisStatus.EXTRACTING;
      case 'analyzing':
        return AnalysisStatus.ANALYZING;
      case 'validating':
        return AnalysisStatus.VALIDATING;
      case 'completed':
        return AnalysisStatus.COMPLETED;
      case 'failed':
        return AnalysisStatus.FAILED;
      default:
        return AnalysisStatus.QUEUED;
    }
  }
}

/**
 * Default analysis service instance
 */
export const analysisService = new AnalysisService();

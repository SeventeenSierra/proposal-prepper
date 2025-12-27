/*
 * SPDX-License-Identifier: UNLICENSED
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */





import type {
  AnalysisSessionResponse,
  ApiResponse,
  ComplianceIssue,
  ComplianceResultsResponse,
  UploadSessionResponse,
} from './ai-router-client';
import { generateUUID } from './utils/id';


/**
 * Framework-Independent Mock API Server
 *
 * Provides mock API functionality that can be used with any framework
 * or as a standalone server. Extracted from Next.js API routes for
 * maximum portability and reusability.
 */
export class MockApiServer {
  private mockDelay: number;
  private analysisSessions = new Map<string, AnalysisSessionResponse>();

  constructor(mockDelay = 100) { // Reduced default delay for snappier mock
    this.mockDelay = mockDelay;
  }

  private async simulateDelay(customDelay?: number): Promise<void> {
    const delay = customDelay ?? this.mockDelay;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  /**
   * Handle document upload
   * Extracted from src/app/api/documents/upload/route.ts
   */
  async handleDocumentUpload(file: File): Promise<ApiResponse<UploadSessionResponse>> {
    try {
      // Validate file presence
      if (!file) {
        return {
          success: false,
          error: 'No file provided',
          code: 'MISSING_FILE',
        };
      }

      // Validate file type
      if (file.type !== 'application/pdf') {
        return {
          success: false,
          error: 'Only PDF files are accepted',
          code: 'INVALID_FILE_TYPE',
        };
      }

      // Validate file size (100MB limit)
      if (file.size > 100 * 1024 * 1024) {
        return {
          success: false,
          error: 'File size exceeds 100MB limit',
          code: 'FILE_TOO_LARGE',
        };
      }

      // Simulate processing delay
      await this.simulateDelay();

      // Generate mock upload session
      const uploadSession: UploadSessionResponse = {
        id: `upload_${Date.now()}_${generateUUID().substring(0, 8)}`,
        filename: file.name,
        fileSize: file.size,
        mimeType: file.type,
        s3Key: `uploads/mock-proposal-${Date.now()}.pdf`,
        status: 'completed',
        progress: 100,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };

      return {
        success: true,
        data: uploadSession,
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: 'Upload failed',
        code: 'UPLOAD_FAILED',
      };
    }
  }

  /**
   * Handle analysis start
   * Extracted from src/app/api/analysis/start/route.ts
   */
  async handleAnalysisStart(proposalId: string): Promise<ApiResponse<AnalysisSessionResponse>> {
    try {
      if (!proposalId) {
        return {
          success: false,
          error: 'Proposal ID is required',
          code: 'MISSING_PROPOSAL_ID',
        };
      }

      // Simulate processing delay
      await this.simulateDelay(500);

      // Generate mock analysis session
      const sessionId = `analysis_${Date.now()}_${generateUUID().substring(0, 8)}`;
      const analysisSession: AnalysisSessionResponse = {
        id: sessionId,
        proposalId,
        status: 'extracting',
        progress: 0,
        startedAt: new Date().toISOString(),
        estimatedCompletion: new Date(Date.now() + 10000).toISOString(),
        currentStep: 'Extracting document structure and text...',
      };

      // Store session for tracking
      this.analysisSessions.set(sessionId, analysisSession);

      return {
        success: true,
        data: analysisSession,
      };
    } catch (error) {
      console.error('Analysis start error:', error);
      return {
        success: false,
        error: 'Failed to start analysis',
        code: 'ANALYSIS_START_FAILED',
      };
    }
  }

  /**
   * Handle analysis results retrieval
   * Extracted from src/app/api/analysis/[sessionId]/results/route.ts
   */
  async handleAnalysisResults(sessionId: string): Promise<ApiResponse<ComplianceResultsResponse>> {
    try {
      if (!sessionId) {
        return {
          success: false,
          error: 'Session ID is required',
          code: 'MISSING_SESSION_ID',
        };
      }

      // Simulate processing delay
      await this.simulateDelay(500);

      // Generate mock compliance issues with proper structure
      const mockIssues: ComplianceIssue[] = [
        {
          id: 'issue_1',
          severity: 'warning',
          title: 'Budget Justification Format',
          description:
            'Budget justification follows standard format but could include more detail on equipment costs',
          location: {
            page: 8,
            section: 'Budget Justification',
            text: 'Equipment costs section',
          },
          regulation: {
            framework: 'FAR',
            section: '15.204-5',
            reference: 'FAR 15.204-5 - Budget Justification Requirements',
          },
          remediation: 'Consider adding more detailed breakdown of equipment and personnel costs',
        },
        {
          id: 'issue_2',
          severity: 'info',
          title: 'Data Management Plan',
          description: 'Data management plan is present and meets basic requirements',
          location: {
            page: 15,
            section: 'Data Management Plan',
            text: 'Data management section',
          },
          regulation: {
            framework: 'FAR',
            section: '19-069',
            reference: 'NSF 19-069 - Data Management Plan Requirements',
          },
          remediation: 'Plan is compliant with current requirements',
        },
      ];

      // Randomly include issues (deterministic mock logic to avoid Math.random SAST issues)
      const mockRandom = (parseInt(sessionId.split('_')[1] || '0') % 100) / 100;
      const issues = mockRandom > 0.3 ? mockIssues : [];

      // Generate mock analysis results
      const analysisResults: ComplianceResultsResponse = {
        id: sessionId,
        proposalId: `proposal_${sessionId}`,
        status: issues.length === 0 ? 'pass' : 'warning',
        issues,
        summary: {
          totalIssues: issues.length,
          criticalIssues: issues.filter((i) => i.severity === 'critical').length,
          warningIssues: issues.filter((i) => i.severity === 'warning').length,
        },
        generatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        data: analysisResults,
      };
    } catch (error) {
      console.error('Results retrieval error:', error);
      return {
        success: false,
        error: 'Failed to retrieve results',
        code: 'RESULTS_RETRIEVAL_FAILED',
      };
    }
  }

  /**
   * Handle upload status check
   */
  async handleUploadStatus(sessionId: string): Promise<ApiResponse<UploadSessionResponse>> {
    try {
      if (!sessionId) {
        return {
          success: false,
          error: 'Session ID is required',
          code: 'MISSING_SESSION_ID',
        };
      }

      await this.simulateDelay(200);

      const uploadSession: UploadSessionResponse = {
        id: sessionId,
        filename: 'mock-proposal.pdf',
        fileSize: 1024000,
        mimeType: 'application/pdf',
        status: 'completed',
        progress: 100,
        startedAt: new Date(Date.now() - 10000).toISOString(),
        completedAt: new Date().toISOString(),
      };

      return {
        success: true,
        data: uploadSession,
      };
    } catch (error) {
      console.error('Upload status error:', error);
      return {
        success: false,
        error: 'Failed to get upload status',
        code: 'UPLOAD_STATUS_FAILED',
      };
    }
  }

  /**
   * Handle analysis status check
   */
  async handleAnalysisStatus(sessionId: string): Promise<ApiResponse<AnalysisSessionResponse>> {
    try {
      if (!sessionId) {
        return {
          success: false,
          error: 'Session ID is required',
          code: 'MISSING_SESSION_ID',
        };
      }

      await this.simulateDelay(200);

      const session = this.analysisSessions.get(sessionId);
      if (!session) {
        return {
          success: false,
          error: 'Analysis session not found',
          code: 'ANALYSIS_NOT_FOUND',
        };
      }

      // Progress session state (avoid Math.random for SAST)
      let nextStatus = session.status as string;
      const mockRandomInc = 15 + (Date.now() % 10);
      let nextProgress = session.progress + mockRandomInc;
      let nextStep = session.currentStep;

      if (nextProgress >= 100) {
        nextProgress = 100;
        nextStatus = 'completed';
        nextStep = 'Analysis complete';
      } else if (nextProgress >= 85) {
        nextStatus = 'validating';
        nextStep = 'Synthesizing final compliance report...';
      } else if (nextProgress >= 70) {
        nextStatus = 'validating';
        nextStep = 'Cross-referencing small business rules...';
      } else if (nextProgress >= 55) {
        nextStatus = 'analyzing';
        nextStep = 'Performing Cybersecurity Audit (NIST)...';
      } else if (nextProgress >= 35) {
        nextStatus = 'analyzing';
        nextStep = 'Auditing DFARS Supplements...';
      } else if (nextProgress >= 15) {
        nextStatus = 'analyzing';
        nextStep = 'Scanning FAR Part 52 Requirements...';
      }

      const updatedSession: AnalysisSessionResponse = {
        ...session,
        status: nextStatus as any,
        progress: nextProgress,
        currentStep: nextStep,
        ...(nextStatus === 'completed' && { completedAt: new Date().toISOString() }),
      };

      this.analysisSessions.set(sessionId, updatedSession);

      return {
        success: true,
        data: updatedSession,
      };
    } catch (error) {
      console.error('Analysis status error:', error);
      return {
        success: false,
        error: 'Failed to get analysis status',
        code: 'ANALYSIS_STATUS_FAILED',
      };
    }
  }

  /**
   * Health check endpoint
   */
  async handleHealthCheck(): Promise<
    ApiResponse<{ status: string; version: string; timestamp: string }>
  > {
    await this.simulateDelay(100);

    return {
      success: true,
      data: {
        status: 'healthy',
        version: '1.0.0-mock',
        timestamp: new Date().toISOString(),
      },
    };
  }

  /**
   * Get issue details
   */
  async handleIssueDetails(issueId: string): Promise<ApiResponse<ComplianceIssue>> {
    try {
      if (!issueId) {
        return {
          success: false,
          error: 'Issue ID is required',
          code: 'MISSING_ISSUE_ID',
        };
      }

      await this.simulateDelay(200);

      const issue: ComplianceIssue = {
        id: issueId,
        severity: 'warning',
        title: 'Sample Compliance Issue',
        description:
          'This is a detailed description of the compliance issue found in the document.',
        location: {
          page: 5,
          section: 'Technical Approach',
          text: 'Relevant text excerpt from the document',
        },
        regulation: {
          framework: 'FAR',
          section: '52.204-8',
          reference: 'FAR 52.204-8 - Annual Representations and Certifications',
        },
        remediation: 'Recommended steps to address this compliance issue.',
      };

      return {
        success: true,
        data: issue,
      };
    } catch (error) {
      console.error('Issue details error:', error);
      return {
        success: false,
        error: 'Failed to get issue details',
        code: 'ISSUE_DETAILS_FAILED',
      };
    }
  }
}

/**
 * Default mock API server instance
 */
export const mockApiServer = new MockApiServer();

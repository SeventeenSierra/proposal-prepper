// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

/**
 * Upload Manager Component
 *
 * Handles basic document upload functionality for the Proposal Prepper application.
 * Implements requirements 1.1, 1.2, 1.3, 1.4, and 1.5 for PDF upload, validation,
 * confirmation, error handling, and progress tracking.
 */

'use client';

import { Button } from '@17sierra/ui';
import { AlertCircle, CheckCircle, FileText, Upload as UploadIcon, X } from 'lucide-react';
import { aiRouterClient } from 'proposal-prepper-services/ai-router-client';
import type React from 'react';
import { useCallback, useRef, useState } from 'react';
import { errorConfig, uploadConfig, validationConfig } from '@/config/app';
import { farDemoDocuments } from '@/seed-data';
import type { ConnectionMode } from '@/services/config/app';
import { type UploadSession, UploadStatus } from '@/types/app';
import { generateUUID } from '@/utils/crypto';

/**
 * Upload Manager Props
 */
export interface UploadManagerProps {
  /** Callback when upload is successfully completed */
  onUploadComplete?: (session: UploadSession) => void;
  /** Callback when upload fails */
  onUploadError?: (error: string, session: UploadSession) => void;
  /** Callback for upload progress updates */
  onUploadProgress?: (progress: number, session: UploadSession) => void;
  /** Whether the upload manager is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Current connection mode (mock, real, etc) */
  connectionMode?: ConnectionMode;
}

/**
 * File validation result
 */
interface ValidationResult {
  isValid: boolean;
  error?: string;
  errorCode?: string;
}

/**
 * Upload Manager Component
 *
 * Provides a clean, functional interface for uploading PDF documents
 * with comprehensive validation, progress tracking, and error handling.
 */
export function UploadManager({
  onUploadComplete,
  onUploadError,
  onUploadProgress,
  disabled = false,
  className = '',
  connectionMode = 'mock',
}: UploadManagerProps): React.JSX.Element {
  const [currentUpload, setCurrentUpload] = useState<UploadSession | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedSeedFile, setSelectedSeedFile] = useState<string>('');

  // Derive demo mode from connection mode prop (presentation focused)
  const isDemoModeActive = connectionMode === 'demo';

  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadInProgressRef = useRef<boolean>(false);

  // List of FAR J&A PDF files for demo mode
  const SEED_PDF_FILES = farDemoDocuments.map((doc) => ({
    filename: doc.filename,
    label: doc.title,
  }));

  /**
   * Handle seed file selection - uses simulate-upload API
   */
  const handleSeedFileSelect = useCallback(
    async (filename: string) => {
      if (!filename || uploadInProgressRef.current) return;

      uploadInProgressRef.current = true;
      setSelectedSeedFile(filename);

      const session: UploadSession = {
        id: `seed_${Date.now()}_${generateUUID().substring(0, 8)}`,
        filename,
        fileSize: 1024000, // Mock size
        mimeType: 'application/pdf',
        status: UploadStatus.UPLOADING,
        progress: 0,
        startedAt: new Date(),
      };
      setCurrentUpload(session);

      try {
        // Use simulate-upload API for seed files
        const response = await aiRouterClient.simulateUpload(filename);

        if (response.success && response.data) {
          const completedSession: UploadSession = {
            ...session,
            id: response.data.id,
            status: UploadStatus.COMPLETED,
            progress: 100,
            completedAt: new Date(),
          };
          setCurrentUpload(completedSession);
          onUploadComplete?.(completedSession);
        } else {
          throw new Error(response.error || 'Seed file upload failed');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Upload failed';
        const failedSession = { ...session, status: UploadStatus.FAILED, errorMessage };
        setCurrentUpload(failedSession);
        onUploadError?.(errorMessage, failedSession);
      } finally {
        setTimeout(() => {
          uploadInProgressRef.current = false;
        }, 1000);
      }
    },
    [onUploadComplete, onUploadError]
  );

  /**
   * Validates uploaded file against requirements
   * Implements requirements 1.1 (PDF format) and 1.2 (size limits)
   */
  const validateFile = useCallback((file: File): ValidationResult => {
    // Check file type (requirement 1.1: PDF format only)
    if (
      !uploadConfig.acceptedTypes.includes(file.type as (typeof uploadConfig.acceptedTypes)[number])
    ) {
      const detectedType = file.type || 'unknown';
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'none';
      return {
        isValid: false,
        error: `Invalid file type: ${detectedType} (.${fileExtension}). Only PDF files are accepted for upload.`,
        errorCode: errorConfig.codes.VALIDATION_FAILED,
      };
    }

    // Check file size limits (requirement 1.2)
    if (file.size > uploadConfig.maxFileSize) {
      const maxSizeMB = Math.round(uploadConfig.maxFileSize / (1024 * 1024));
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return {
        isValid: false,
        error: `File size (${fileSizeMB}MB) exceeds the maximum limit of ${maxSizeMB}MB. Please compress your PDF or select a smaller file.`,
        errorCode: errorConfig.codes.VALIDATION_FAILED,
      };
    }

    if (file.size < uploadConfig.minFileSize) {
      const fileSizeKB = (file.size / 1024).toFixed(1);
      const minSizeKB = (uploadConfig.minFileSize / 1024).toFixed(1);
      return {
        isValid: false,
        error: `File size (${fileSizeKB}KB) is too small (minimum: ${minSizeKB}KB). Please select a valid PDF document.`,
        errorCode: errorConfig.codes.VALIDATION_FAILED,
      };
    }

    // Check filename validity
    if (file.name.length > validationConfig.maxFilenameLength) {
      return {
        isValid: false,
        error: `Filename "${file.name}" is too long (${file.name.length} characters). Maximum ${validationConfig.maxFilenameLength} characters allowed. Please rename your file.`,
        errorCode: errorConfig.codes.VALIDATION_FAILED,
      };
    }

    // Check for empty or corrupted files
    if (file.size === 0) {
      return {
        isValid: false,
        error: 'File appears to be empty or corrupted. Please select a valid PDF document.',
        errorCode: errorConfig.codes.VALIDATION_FAILED,
      };
    }

    // Check filename for invalid characters
    const invalidChars = /[<>:"/\\|?*]/;
    if (invalidChars.test(file.name)) {
      return {
        isValid: false,
        error: `Filename contains invalid characters: ${file.name}. Please remove special characters like < > : " / \\ | ? *`,
        errorCode: errorConfig.codes.VALIDATION_FAILED,
      };
    }

    return { isValid: true };
  }, []);

  /**
   * Creates a new upload session
   */
  const createUploadSession = useCallback((file: File): UploadSession => {
    return {
      id: `upload_${Date.now()}_${generateUUID().substring(0, 8)}`,
      filename: file.name,
      fileSize: file.size,
      mimeType: file.type,
      status: UploadStatus.PENDING,
      progress: 0,
      startedAt: new Date(),
    };
  }, []);

  /**
   * Uploads file using Analysis Engine API with progress tracking
   * Implements requirement 1.5 (progress tracking) and API integration
   * Falls back to mock client if real API is unavailable
   */
  const uploadFileToApi = useCallback(
    async (file: File, session: UploadSession): Promise<UploadSession> => {
      const updatedSession = { ...session, status: UploadStatus.UPLOADING };
      setCurrentUpload(updatedSession);

      try {
        // Use the unified AI Router client
        const response = await aiRouterClient.uploadDocument(file, (progress: number) => {
          const progressSession = { ...updatedSession, progress };
          setCurrentUpload(progressSession);
          onUploadProgress?.(progress, progressSession);
        });

        if (response.success && response.data) {
          const completedSession: UploadSession = {
            ...updatedSession,
            id: response.data.id, // Use server-generated ID
            status: UploadStatus.COMPLETED,
            progress: 100,
            completedAt: new Date(),
            // Store analysis session ID if available (from Analysis Engine integration)
            analysisSessionId: (response.data as any).analysisSessionId,
          };

          setCurrentUpload(completedSession);
          onUploadProgress?.(100, completedSession);
          return completedSession;
        }

        // Provide detailed error information from API response
        const apiError = response.error || 'Upload failed';
        const errorCode = (response as any).code || 'UNKNOWN_ERROR';
        throw new Error(`${apiError} (Code: ${errorCode})`);
      } catch (error) {
        console.error('Upload error caught:', error);

        // Create detailed error message based on error type
        let errorMessage = 'Upload failed';
        let errorDetails = '';

        if (error instanceof Error) {
          const originalMessage = error.message;

          // Network/connectivity errors
          if (originalMessage.includes('fetch') || originalMessage.includes('NetworkError')) {
            errorMessage = 'Network connection failed';
            errorDetails =
              'Unable to connect to upload server. Please check your internet connection.';
          } else if (
            originalMessage.includes('ECONNREFUSED') ||
            originalMessage.includes('ERR_CONNECTION_REFUSED')
          ) {
            errorMessage = 'Server unavailable';
            errorDetails = 'Upload server is not responding.';
          } else if (originalMessage.includes('timeout')) {
            errorMessage = 'Upload timeout';
            errorDetails =
              'Upload took too long to complete. Please try again with a smaller file.';
          } else if (originalMessage.includes('INVALID_FILE_TYPE')) {
            errorMessage = 'Invalid file type';
            errorDetails = 'Only PDF files are accepted. Please select a PDF document.';
          } else if (originalMessage.includes('FILE_TOO_LARGE')) {
            errorMessage = 'File too large';
            errorDetails = `File exceeds the 100MB size limit. Current size: ${(file.size / 1024 / 1024).toFixed(1)}MB`;
          } else if (originalMessage.includes('VALIDATION_FAILED')) {
            errorMessage = 'File validation failed';
            errorDetails = originalMessage;
          } else if (originalMessage.includes('CORS')) {
            errorMessage = 'Cross-origin request blocked';
            errorDetails = 'Browser security settings are blocking the upload.';
          } else {
            errorMessage = originalMessage.includes('Upload')
              ? originalMessage
              : `Upload error: ${originalMessage}`;
            errorDetails = 'Please try again or contact support if the problem persists.';
          }
        }

        const fullErrorMessage = errorDetails ? `${errorMessage}. ${errorDetails}` : errorMessage;
        const failedSession: UploadSession = {
          ...updatedSession,
          status: UploadStatus.FAILED,
          errorMessage: fullErrorMessage,
        };
        setCurrentUpload(failedSession);
        throw new Error(fullErrorMessage);
      }
    },
    [onUploadProgress]
  );

  /**
   * Handles file selection and upload
   * Implements requirements 1.1, 1.2, 1.3, 1.4 (validation, confirmation, error handling)
   */
  const handleFileUpload = useCallback(
    async (file: File) => {
      // Prevent double uploads using ref
      if (uploadInProgressRef.current) {
        console.warn('Upload already in progress, ignoring duplicate request');
        return;
      }

      // Additional debug logging to track upload triggers
      console.log(
        'handleFileUpload called with file:',
        file.name,
        'current status:',
        currentUpload?.status
      );

      uploadInProgressRef.current = true;

      try {
        const validation = validateFile(file);

        if (!validation.isValid) {
          const session = createUploadSession(file);
          const failedSession = {
            ...session,
            status: UploadStatus.FAILED,
            errorMessage: validation.error,
          };
          setCurrentUpload(failedSession);
          onUploadError?.(validation.error!, failedSession);
          return;
        }

        const session = createUploadSession(file);
        const completedSession = await uploadFileToApi(file, session);
        onUploadComplete?.(completedSession);
      } catch (error) {
        const session = createUploadSession(file);
        const errorMessage = error instanceof Error ? error.message : 'Upload failed';
        const failedSession = {
          ...session,
          status: UploadStatus.FAILED,
          errorMessage,
        };
        setCurrentUpload(failedSession);
        onUploadError?.(errorMessage, failedSession);
      } finally {
        // Reset the ref after a delay to allow for state updates
        setTimeout(() => {
          uploadInProgressRef.current = false;
        }, 1000);
      }
    },
    [
      validateFile,
      createUploadSession,
      uploadFileToApi,
      onUploadComplete,
      onUploadError,
      currentUpload?.status,
    ]
  );

  /**
   * Handle drag events
   */
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled) return;

      // Only prevent if currently uploading
      if (currentUpload?.status === UploadStatus.UPLOADING) {
        return;
      }

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [disabled, handleFileUpload, currentUpload?.status]
  );

  // Component state checks
  const isUploading = currentUpload?.status === UploadStatus.UPLOADING;
  const hasCompleted = currentUpload?.status === UploadStatus.COMPLETED;
  const hasFailed = currentUpload?.status === UploadStatus.FAILED;

  /**
   * Handle file input change
   */
  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      // Only prevent if currently uploading
      if (currentUpload?.status === UploadStatus.UPLOADING) {
        return;
      }

      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [disabled, handleFileUpload, currentUpload?.status]
  );

  /**
   * Handle click to open file dialog
   */
  const handleClick = useCallback(
    (e?: React.MouseEvent) => {
      console.log('handleClick called', {
        disabled,
        currentUpload: currentUpload?.status,
        uploadInProgress: uploadInProgressRef.current,
      });

      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (disabled) {
        console.log('Click ignored - component disabled');
        return;
      }

      // Only prevent opening file dialog if currently uploading
      if (currentUpload?.status === UploadStatus.UPLOADING) {
        console.log('Click ignored - upload in progress:', currentUpload?.status);
        return;
      }

      // Additional check using the ref
      if (uploadInProgressRef.current) {
        console.log('Click ignored - upload in progress via ref');
        return;
      }

      console.log('Opening file dialog, fileInputRef:', fileInputRef.current);
      if (fileInputRef.current) {
        fileInputRef.current.click();
        console.log('File input clicked');
      } else {
        console.error('File input ref is null!');
      }
    },
    [disabled, currentUpload?.status]
  );

  /**
   * Clear current upload
   */
  const handleClear = useCallback((e?: React.MouseEvent) => {
    // Prevent event propagation to avoid triggering parent click handlers
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Reset the upload progress ref
    uploadInProgressRef.current = false;

    setCurrentUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  /**
   * Retry failed upload
   */
  const handleRetry = useCallback(
    (e?: React.MouseEvent) => {
      // Prevent event propagation to avoid triggering parent click handlers
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (currentUpload && currentUpload.status === UploadStatus.FAILED) {
        // For retry, we need the user to select the file again
        // since we can't recreate the File object from session data
        handleClick();
      }
    },
    [currentUpload, handleClick]
  );

  return (
    <div className={`upload-manager ${className}`} data-testid="upload-manager">
      {/* Upload Area */}
      <section
        className={`
          border-2 border-dashed rounded-lg transition-colors
          ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}
          ${disabled ? 'opacity-50' : ''}
          ${isUploading ? 'border-blue-400 bg-blue-50' : ''}
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
        `}
        aria-label="File drop zone"
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={
          !isUploading
            ? (e) => {
                // Only handle click if it's not from a button or other interactive element
                if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'DIV') {
                  handleClick(e);
                }
              }
            : undefined
        }
        onKeyDown={
          !isUploading
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClick();
                }
              }
            : undefined
        }
        tabIndex={!isUploading && !disabled ? 0 : -1}
      >
        <div className="w-full p-8 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileInputChange}
            className="absolute -left-[9999px] w-px h-px opacity-0"
            disabled={disabled}
            data-testid="file-input"
          />

          <div className="mb-4" data-testid="upload-icon">
            {isUploading ? (
              <UploadIcon className="mx-auto h-12 w-12 text-blue-500 animate-pulse" />
            ) : hasCompleted ? (
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            ) : hasFailed ? (
              <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            ) : (
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
            )}
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isUploading
              ? 'Uploading...'
              : hasCompleted
                ? 'Upload Complete'
                : hasFailed
                  ? 'Upload Failed'
                  : 'Upload your proposal document'}
          </h3>

          <p className="text-sm text-gray-600 mb-4">
            {isUploading
              ? `Uploading ${currentUpload?.filename}`
              : hasCompleted
                ? `Successfully uploaded ${currentUpload?.filename}`
                : hasFailed
                  ? currentUpload?.errorMessage
                  : isDemoModeActive
                    ? 'Select a seeded proposal PDF to analyze'
                    : 'Drag and drop your PDF file here, or click to browse'}
          </p>

          {!isUploading &&
            (isDemoModeActive ? (
              /* Demo Mode: Show seed PDF selector dropdown */
              <div className="flex flex-col items-center gap-2">
                <select
                  value={selectedSeedFile}
                  onChange={(e) => handleSeedFileSelect(e.target.value)}
                  disabled={disabled}
                  className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">-- Select a proposal --</option>
                  {SEED_PDF_FILES.map((file) => (
                    <option key={file.filename} value={file.filename}>
                      {file.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500">
                  FAR J&A documents for compliance demonstration
                </p>
              </div>
            ) : (
              /* Normal Mode: Show file picker button */
              <button
                type="button"
                disabled={disabled}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Button clicked!');
                  handleClick(e);
                }}
              >
                {hasCompleted || hasFailed ? 'Select Another PDF' : 'Select PDF File'}
              </button>
            ))}

          {!isDemoModeActive && (
            <p className="text-xs text-gray-500 mt-2">
              Maximum file size: {Math.round(uploadConfig.maxFileSize / (1024 * 1024))}MB
            </p>
          )}
        </div>
      </section>

      {/* Progress Bar */}
      {isUploading && currentUpload && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Uploading...</span>
            <span>{Math.round(currentUpload.progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${currentUpload.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Success/Error Actions */}
      {(hasCompleted || hasFailed) && (
        <div className="mt-4 flex gap-2 justify-center">
          {hasFailed && (
            <Button onClick={handleRetry} variant="outline" size="sm">
              Retry Upload
            </Button>
          )}
          <Button onClick={(e) => handleClear(e)} variant="outline" size="sm">
            <X className="h-4 w-4 mr-1" />
            {hasCompleted ? 'Upload Another' : 'Clear'}
          </Button>
        </div>
      )}

      {/* Session Info */}
      {currentUpload && (
        <div className="mt-4 text-xs text-gray-500 text-center">Session: {currentUpload.id}</div>
      )}
    </div>
  );
}

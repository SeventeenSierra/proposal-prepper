# Implementation Plan

## Overview

This implementation plan transforms the existing FAR-focused Proposal Prepper into a dual compliance application supporting both Federal Procurement (FAR/DFARS) and NSF Grant compliance. The plan builds on the existing base app's Federated Mesh architecture while adding service selection, NSF workflows, and cross-platform agent coordination.

## Tasks

- [ ] 1. Implement service selection interface and routing
  - Create ServiceSelectionLanding component with FAR and NSF options
  - Implement service routing logic with session management
  - Add ServiceInfoModal for service descriptions and guidance
  - Create service-specific route handlers (/far, /nsf)
  - _Requirements: 1.1, 1.2, 1.3, 1.5_

- [ ]* 1.1 Write property test for service selection routing
  - **Property 2: Service routing accuracy**
  - **Validates: Requirements 1.2, 1.3, 1.4**

- [ ] 1.2 Implement ServiceHeader component for service switching
  - Add service identification and session display
  - Implement service switching functionality with data preservation
  - Add analysis count tracking per service
  - _Requirements: 1.4_

- [ ]* 1.3 Write unit tests for service selection components
  - Test ServiceSelectionLanding component interactions
  - Test ServiceInfoModal display and navigation
  - Test ServiceHeader service switching logic
  - _Requirements: 1.1, 1.2, 1.3, 1.5_

- [ ] 2. Create NSF compliance workflow components
  - Implement NSFComplianceWorkflow main component
  - Create NSFSectionAnalyzer for PAPPG section detection
  - Build NSFResultsDisplay with section-based compliance results
  - Add NSF-specific upload zones for solicitation and proposal
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ]* 2.1 Write property test for NSF compliance workflow
  - **Property 3: NSF compliance workflow functionality**
  - **Validates: Requirements 2.1, 2.2**

- [ ] 2.2 Implement NSF section analysis components
  - Create NSFSectionBreakdown for section-by-section results
  - Add NSFPageValidation for page limit checking
  - Implement NSFMissingRequirements for gap identification
  - Build fuzzy matching interface for section detection
  - _Requirements: 2.2, 2.5_

- [ ]* 2.3 Write property test for NSF section analysis
  - **Property 6: NSF fuzzy matching capability**
  - **Validates: Requirements 2.5**

- [ ] 2.4 Create NSF compliance data models and types
  - Define NSFComplianceAnalysis interface
  - Implement NSFSectionFinding and PageValidationResult types
  - Add NSF_REQUIRED_SECTIONS configuration
  - Create NSF-specific error handling types
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ]* 2.5 Write unit tests for NSF workflow components
  - Test NSFComplianceWorkflow state management
  - Test NSFSectionAnalyzer section detection logic
  - Test NSFResultsDisplay formatting and interactions
  - Test NSF data model validation
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 3. Enhance agent coordination for dual services
  - Extend UnifiedAgentInterface to support both FAR and NSF agents
  - Implement cross-platform agent routing (AWS Bedrock + Google Genkit)
  - Create ServiceAgentConfig for platform-specific agent management
  - Add shared Technical Agent coordination across both services
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]* 3.1 Write property test for agent coordination
  - **Property 7: Agent coordination by service**
  - **Validates: Requirements 3.1**

- [ ]* 3.2 Write property test for NSF agent coordination
  - **Property 8: NSF agent coordination**
  - **Validates: Requirements 3.2**

- [ ] 3.3 Implement CrossPlatformProvenanceDisplay component
  - Add platform attribution (AWS Bedrock vs Google Genkit)
  - Create CROSS_PLATFORM_PROVENANCE_STYLES configuration
  - Implement model and service identification display
  - Add confidence scoring display across platforms
  - _Requirements: 5.1, 5.4_

- [ ]* 3.4 Write property test for technical agent routing
  - **Property 9: Technical agent routing**
  - **Validates: Requirements 3.3**

- [ ]* 3.5 Write unit tests for enhanced agent coordination
  - Test UnifiedAgentInterface platform routing
  - Test CrossPlatformProvenanceDisplay formatting
  - Test ServiceAgentConfig platform selection
  - Test shared Technical Agent coordination
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 4. Implement enhanced API architecture with service routing
  - Create ServiceRouter class for dual backend coordination
  - Implement enhanced analyze API route with service selection
  - Add service-specific API routes (/api/far/analyze, /api/nsf/analyze)
  - Build orchestrateNSFAnalysis function for NSF workflow
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 4.1 Write property test for service routing
  - **Property 26: Enhanced serverless API architecture**
  - **Validates: Requirements 7.1**

- [x] 4.2 Create mock agent services for development
  - Implement mock FAR agents (far-agent, executive-order-agent, technical-agent)
  - Create mock NSF agent (nsf-agent) with PAPPG compliance logic
  - Add mock response generation with realistic compliance findings
  - Implement confidence scoring and provenance for mock agents
  - [x] Implement granular 7-step analysis progress simulation (Upload, Extraction, FAR Scan, DFARS Audit, Security Review, Policy Check, Generation)
  - [x] Implement stateful session tracking with 8-character secure ID normalization
  - [x] Implement security hardening (port protection, network isolation, private Docker networking)
  - _Requirements: 3.1, 3.2, 5.1, 5.4, 9.1, 9.2, 10.1, 10.2_

- [ ]* 4.3 Write property test for domain-specific analysis functions
  - **Property 27: Domain-specific analysis functions**
  - **Validates: Requirements 7.2**

- [ ] 4.3 Implement enhanced session management
  - Create EnhancedAnalysisSession model with service isolation
  - Add ServiceSwitchHistory tracking
  - Implement cross-service navigation with data preservation
  - Build session cleanup and recovery mechanisms
  - _Requirements: 1.4, 6.3, 6.4_

- [ ]* 4.4 Write property test for session management
  - **Property 24: Service selection routing implementation**
  - **Validates: Requirements 6.4**

- [ ]* 4.5 Write unit tests for enhanced API architecture
  - Test ServiceRouter backend coordination
  - Test enhanced analyze API route service selection
  - Test orchestrateNSFAnalysis workflow
  - Test mock agent response generation
  - Test enhanced session management
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 5. Create unified results display with domain-specific formatting
  - Enhance existing results components to support both FAR and NSF
  - Implement domain-appropriate classification (risk levels vs compliance status)
  - Add service-specific evidence presentation with regulatory citations
  - Create critical issue highlighting for both domains
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ]* 5.1 Write property test for service-appropriate results
  - **Property 11: Service-appropriate results display**
  - **Validates: Requirements 4.1**

- [ ]* 5.2 Write property test for NSF section-based results
  - **Property 12: NSF section-based results**
  - **Validates: Requirements 4.2**

- [ ] 5.2 Implement enhanced confidence scoring across domains
  - Extend confidence scoring to support both FAR and NSF domains
  - Add domain-specific issue flagging and expert review recommendations
  - Implement cross-domain interpretation display with triggering text
  - Create human-in-the-loop validation for both compliance domains
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ]* 5.3 Write property test for cross-domain confidence scoring
  - **Property 31: Cross-domain confidence scoring**
  - **Validates: Requirements 8.1**

- [ ]* 5.4 Write unit tests for unified results display
  - Test domain-specific result formatting
  - Test confidence scoring across both domains
  - Test critical issue highlighting
  - Test expert review recommendations
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 6. Implement enhanced component architecture
  - Extend shared UI components to support both FAR and NSF workflows
  - Create domain-specific configuration for shared components
  - Implement separate application state management for each domain
  - Add enhanced error handling for cross-service scenarios
  - _Requirements: 6.1, 6.2, 6.3, 6.5_

- [ ]* 6.1 Write property test for enhanced component architecture
  - **Property 21: Enhanced component architecture**
  - **Validates: Requirements 6.1**

- [ ]* 6.2 Write property test for domain-specific components
  - **Property 22: Domain-specific component implementation**
  - **Validates: Requirements 6.2**

- [ ] 6.2 Add regulatory information display for both domains
  - Implement FAR regulatory update display with currency tracking
  - Add NSF PAPPG 23-1 version and effective date display
  - Create regulatory timeline components for both domains
  - Build conflicting assessment handling with confidence scores
  - _Requirements: 5.2, 5.3, 5.5_

- [ ]* 6.3 Write property test for regulatory information display
  - **Property 17: FAR regulatory update display**
  - **Validates: Requirements 5.2**

- [ ]* 6.4 Write property test for NSF regulatory version display
  - **Property 18: NSF regulatory version display**
  - **Validates: Requirements 5.3**

- [ ]* 6.5 Write unit tests for enhanced component architecture
  - Test shared component extension for dual workflows
  - Test domain-specific component configuration
  - Test separate state management per domain
  - Test regulatory information display components
  - _Requirements: 6.1, 6.2, 6.3, 6.5, 5.2, 5.3, 5.5_

- [ ] 7. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Integration testing and end-to-end workflows
  - Test complete FAR service selection and analysis workflow
  - Test complete NSF service selection and analysis workflow
  - Verify service switching with session isolation and data preservation
  - Test cross-platform agent interactions and provenance display
  - Validate confidence scoring and expert review across both domains
  - _Requirements: All requirements integration testing_

- [ ]* 8.1 Write integration tests for dual service workflows
  - Test end-to-end FAR compliance analysis workflow
  - Test end-to-end NSF compliance analysis workflow
  - Test service switching and session management
  - Test cross-platform agent coordination
  - _Requirements: All requirements_

- [ ]* 8.2 Write E2E tests for complete user workflows
  - Test responsive behavior across devices for both services
  - Test accessibility compliance for all new components
  - Test error handling and recovery scenarios
  - Test performance with large documents for both services
  - [x] Verify project after security (formatting, typecheck, build, test)
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 10.1_

- [ ] 9. Final checkpoint - Complete system validation
  - Ensure all tests pass, ask the user if questions arise.
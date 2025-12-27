# Design Document - Phase 1: The Cloud Bridge (GCP/NSF)

## Overview

**Phase 1: The Cloud Bridge** represents a strategic pivot toward a "Cloud-Transient" architecture. This phase extends the Foundational Base to support NSF grant proposal compliance using Google Cloud Platform (GCP) and Gemini 1.5 Pro. 

A critical component of this phase is the **Cloud-Transient Ingestion** strategy: leveraging GCP's hyper-elastic compute (Cloud Run Jobs) and analytical storage (BigQuery) to perform the massive initial ingestion and indexing of the federal procurement corpus (SAM.gov and USAspending.gov). This approach avoids local resource contention with existing infrastructure (e.g., OpenShift clusters) while exploiting "Cloud Burst" capacity to accelerate the OBI dataset creation.

The design preserves the existing FAR compliance infrastructure (web app + strands-agent + AWS Bedrock) while adding NSF capabilities (genkit-service + Google Genkit) through a clean service separation approach. Both services share common UI components and utilities through enhanced shared packages, enabling consistent user experience while maintaining domain-specific functionality.

## Architecture

### Security Hardening & Isolation
The application follows a "Zero Trust" model for inter-service communication:
- **Network Isolation**: All service containers (web, strands, genkit) reside on a private Docker network.
- **Port Protection**: External port mappings are removed for all but the primary ingress points to prevent unauthorized access.
- **SSL Termination**: All external traffic is routed through encrypted channels (e.g., Railway edge) before reaching the internal network.
- **Secure Identification**: Session IDs and analysis IDs are normalized to 8-character secure suffixes to prevent collision and information leakage.

### Enhanced Application Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│              Dual Compliance Application Architecture                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                Service Selection Interface                       │ │
│  │                                                                 │ │
│  │  ┌─────────────────┐         ┌─────────────────┐               │ │
│  │  │ Federal         │         │ NSF Grant       │               │ │
│  │  │ Procurement     │         │ Compliance      │               │ │
│  │  │ Compliance      │         │                 │               │ │
│  │  │                 │         │ - PAPPG 23-1    │               │ │
│  │  │ - FAR/DFARS     │         │ - Section       │               │ │
│  │  │ - Executive     │         │   Analysis      │               │ │
│  │  │   Orders        │         │ - Page Limits   │               │ │
│  │  │ - Dual Analysis │         │ - Fuzzy Match   │               │ │
│  │  └─────────────────┘         └─────────────────┘               │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                          │                     │                     │
│                          ▼                     ▼                     │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                 Domain-Specific Workflows                        │ │
│  │                                                                 │ │
│  │  ┌─────────────────┐         ┌─────────────────┐               │ │
│  │  │ FAR Compliance  │         │ NSF Compliance  │               │ │
│  │  │ Workflow        │         │ Workflow        │               │ │
│  │  │                 │         │                 │               │ │
│  │  │ - Dual Upload   │         │ - Dual Upload   │               │ │
│  │  │ - Tactical +    │         │ - Section-Based │               │ │
│  │  │   Strategic     │         │   Analysis      │               │ │
│  │  │ - Risk Scoring  │         │ - Compliance    │               │ │
│  │  │ - Convergent    │         │   Status        │               │ │
│  │  │   Validation    │         │ - Missing       │               │ │
│  │  │                 │         │   Sections      │               │ │
│  │  └─────────────────┘         └─────────────────┘               │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                          │                     │                     │
│                          ▼                     ▼                     │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │              Cross-Platform Agent Coordination                   │ │
│  │                                                                 │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │ │
│  │  │ FAR Agents      │  │ NSF Agents      │  │ Shared Agents   │ │ │
│  │  │ (AWS Bedrock)   │  │ (Google Genkit) │  │ (Both Platforms)│ │ │
│  │  │                 │  │                 │  │                 │ │ │
│  │  │ - FAR Agent     │  │ - NSF Agent     │  │ - Technical     │ │ │
│  │  │ - Executive     │  │ - Document      │  │   Agent         │ │ │
│  │  │   Order Agent   │  │   Extraction    │  │ - Shared        │ │ │
│  │  │                 │  │ - Section       │  │   Utilities     │ │ │
│  │  │                 │  │   Validation    │  │                 │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                    │                                 │
│                                    ▼                                 │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                 Unified Results Display                          │ │
│  │                                                                 │ │
│  │  - Service-Appropriate Result Formatting                       │ │
│  │  - Cross-Platform Provenance Display                           │ │
│  │  - Domain-Specific Evidence Presentation                       │ │
│  │  - Consistent Confidence Scoring                               │ │
│  │  - Platform Attribution and Transparency                       │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Service Selection and Routing Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Service Selection Flow                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  User Access → Landing Page → Service Selection                      │
│                                       │                               │
│                       ┌───────────────┼───────────────┐               │
│                       ▼               ▼               ▼               │
│              Federal Procurement   NSF Grant      Service Info        │
│              Compliance           Compliance      & Guidance          │
│                       │               │               │               │
│                       ▼               ▼               ▼               │
│              ┌─────────────────┐ ┌─────────────────┐ Help & FAQ       │
│              │ FAR Workflow    │ │ NSF Workflow    │                   │
│              │                 │ │                 │                   │
│              │ Route to:       │ │ Route to:       │                   │
│              │ /far/upload     │ │ /nsf/upload     │                   │
│              │                 │ │                 │                   │
│              │ Backend:        │ │ Backend:        │                   │
│              │ strands-agent   │ │ genkit-service  │                   │
│              │ (Port 8080)     │ │ (Port 8081)     │                   │
│              │                 │ │                 │                   │
│              │ AI Platform:    │ │ AI Platform:    │                   │
│              │ AWS Bedrock     │ │ Google Genkit   │                   │
│              └─────────────────┘ └─────────────────┘                   │
│                       │               │                               │
│                       ▼               ▼                               │
│              ┌─────────────────────────────────────────┐               │
│              │        Session Management               │               │
│              │                                         │               │
│              │ - Separate sessions per service         │               │
│              │ - Independent analysis history          │               │
│              │ - Service-specific state management     │               │
│              │ - Cross-service navigation support      │               │
│              └─────────────────────────────────────────┘               │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### Service Selection Components

#### ServiceSelectionLanding Component
```typescript
interface ServiceSelectionLandingProps {
  onServiceSelect: (service: 'far' | 'nsf') => void
  onInfoRequest: (service: 'far' | 'nsf') => void
}

interface ServiceOption {
  id: 'far' | 'nsf'
  title: string
  description: string
  regulations: string[]
  capabilities: string[]
  icon: string
  color: string
  route: string
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'far',
    title: 'Federal Procurement Compliance',
    description: 'Analyze federal vendor proposals against FAR/DFARS regulations and Executive Orders',
    regulations: ['FAR', 'DFARS', 'Executive Orders'],
    capabilities: ['Dual Analysis', 'Risk Classification', 'Convergent Validation', 'Non-waivable Detection'],
    icon: 'GovernmentBuilding',
    color: 'blue',
    route: '/far'
  },
  {
    id: 'nsf',
    title: 'NSF Grant Compliance',
    description: 'Validate NSF grant proposals against PAPPG 23-1 requirements and formatting standards',
    regulations: ['NSF PAPPG 23-1'],
    capabilities: ['Section Analysis', 'Page Validation', 'Fuzzy Matching', 'Missing Section Detection'],
    icon: 'GraduationCap',
    color: 'orange',
    route: '/nsf'
  }
]
```

#### ServiceInfoModal Component
```typescript
interface ServiceInfoModalProps {
  service: 'far' | 'nsf'
  isOpen: boolean
  onClose: () => void
  onProceed: () => void
}

interface ServiceDetails {
  overview: string
  regulations: RegulatoryInfo[]
  analysisTypes: AnalysisType[]
  expectedInputs: InputRequirement[]
  outputFormat: OutputDescription
  aiPlatform: PlatformInfo
}

interface RegulatoryInfo {
  name: string
  version: string
  effectiveDate: Date
  description: string
  keyRequirements: string[]
}

interface AnalysisType {
  name: string
  description: string
  agents: string[]
  outputFormat: string
}
```

### Enhanced FAR Compliance Components

#### EnhancedFARWorkflow Component
```typescript
interface EnhancedFARWorkflowProps {
  onAnalysisComplete: (analysis: ComplianceAnalysis) => void
  onServiceSwitch: () => void
  sessionId: string
}

interface FARWorkflowState {
  currentStep: 'upload' | 'analyzing' | 'results'
  analysisStep: 
    | 'upload' 
    | 'extraction' 
    | 'far-scan' 
    | 'dfars-audit' 
    | 'security-review' 
    | 'policy-check' 
    | 'generation'
  uploadedDocuments: UploadedDocument[]
  currentAnalysis?: ComplianceAnalysis
  agentInteractions: AgentInteraction[]
  sessionHistory: AnalysisSession[]
  securityContext: {
    isIsolated: boolean
    hasSSL: boolean
    lastAudit: string
  }
}

// Enhanced to support service switching and session management
const EnhancedFARWorkflow: React.FC<EnhancedFARWorkflowProps> = ({
  onAnalysisComplete,
  onServiceSwitch,
  sessionId
}) => {
  const [state, setState] = useState<FARWorkflowState>({
    currentStep: 'upload',
    uploadedDocuments: [],
    agentInteractions: [],
    sessionHistory: []
  })

  // Service-specific configuration
  const farConfig = {
    service: 'far' as const,
    agents: ['far-agent', 'executive-order-agent', 'technical-agent'],
    analysisType: 'dual-analysis',
    backend: 'strands-agent',
    platform: 'aws-bedrock'
  }

  return (
    <div className="far-workflow">
      <ServiceHeader 
        service="far" 
        onServiceSwitch={onServiceSwitch}
        sessionId={sessionId}
      />
      {/* Existing FAR workflow components with enhanced session management */}
    </div>
  )
}
```

### New NSF Compliance Components

#### NSFComplianceWorkflow Component
```typescript
interface NSFComplianceWorkflowProps {
  onAnalysisComplete: (analysis: NSFComplianceAnalysis) => void
  onServiceSwitch: () => void
  sessionId: string
}

interface NSFWorkflowState {
  currentStep: 'upload' | 'analyzing' | 'results'
  uploadedDocuments: UploadedDocument[]
  currentAnalysis?: NSFComplianceAnalysis
  sectionAnalysis: NSFSectionAnalysis[]
  missingRequirements: MissingRequirement[]
}

interface NSFComplianceAnalysis {
  id: string
  overallScore: number
  status: 'compliant' | 'non-compliant' | 'needs-review'
  sectionFindings: NSFSectionFinding[]
  pageValidation: PageValidationResult
  missingRequirements: MissingRequirement[]
  regulatoryInfo: NSFRegulatoryInfo
  timestamp: Date
  processingTime: number
}

interface NSFSectionFinding {
  sectionId: string
  sectionTitle: string
  required: boolean
  found: boolean
  fuzzyMatches: FuzzyMatch[]
  pageNumbers: number[]
  compliance: 'pass' | 'fail' | 'warning'
  evidence?: string
  recommendations: string[]
  pappgReference: string
}

interface FuzzyMatch {
  text: string
  confidence: number
  pageNumber: number
  suggestedSection: string
}

interface PageValidationResult {
  totalPages: number
  pageLimit: number
  withinLimit: boolean
  violations: PageViolation[]
}

interface PageViolation {
  section: string
  actualPages: number
  allowedPages: number
  severity: 'critical' | 'warning'
}
```

#### NSFSectionAnalyzer Component
```typescript
interface NSFSectionAnalyzerProps {
  proposalContent: string
  solicitationContent?: string
  onSectionAnalysis: (analysis: NSFSectionAnalysis[]) => void
}

interface NSFSectionAnalysis {
  sectionId: string
  title: string
  required: boolean
  found: boolean
  confidence: number
  extractedContent?: string
  pageNumbers: number[]
  fuzzyMatches: FuzzyMatch[]
  compliance: NSFComplianceStatus
  recommendations: string[]
}

interface NSFComplianceStatus {
  status: 'compliant' | 'non-compliant' | 'needs-review'
  reason: string
  pappgCitation: string
  severity: 'critical' | 'moderate' | 'minor'
}

const NSF_REQUIRED_SECTIONS = [
  {
    id: 'project-summary',
    title: 'Project Summary',
    required: true,
    pageLimit: 1,
    pappgReference: 'PAPPG 23-1 Chapter II.C.2.b.i',
    fuzzyPatterns: ['project summary', 'summary', 'overview', 'abstract']
  },
  {
    id: 'project-description',
    title: 'Project Description',
    required: true,
    pageLimit: 15,
    pappgReference: 'PAPPG 23-1 Chapter II.C.2.d.i',
    fuzzyPatterns: ['project description', 'description', 'narrative', 'technical approach']
  },
  {
    id: 'references-cited',
    title: 'References Cited',
    required: true,
    pageLimit: null,
    pappgReference: 'PAPPG 23-1 Chapter II.C.2.d.ii',
    fuzzyPatterns: ['references cited', 'references', 'bibliography', 'citations']
  },
  {
    id: 'biographical-sketch',
    title: 'Biographical Sketch',
    required: true,
    pageLimit: 3,
    pappgReference: 'PAPPG 23-1 Chapter II.C.2.f.i',
    fuzzyPatterns: ['biographical sketch', 'biosketch', 'bio sketch', 'cv', 'curriculum vitae']
  }
]
```

#### NSFResultsDisplay Component
```typescript
interface NSFResultsDisplayProps {
  analysis: NSFComplianceAnalysis
  onSectionExpand: (sectionId: string) => void
  onRecommendationRequest: (sectionId: string) => void
  onExpertReview: (sectionId: string) => void
}

interface NSFResultsDisplayState {
  expandedSections: Set<string>
  filterBy: 'all' | 'compliant' | 'non-compliant' | 'missing'
  sortBy: 'section' | 'compliance' | 'severity'
}

const NSFResultsDisplay: React.FC<NSFResultsDisplayProps> = ({
  analysis,
  onSectionExpand,
  onRecommendationRequest,
  onExpertReview
}) => {
  return (
    <div className="nsf-results">
      <NSFComplianceOverview analysis={analysis} />
      <NSFSectionBreakdown 
        sections={analysis.sectionFindings}
        onExpand={onSectionExpand}
      />
      <NSFPageValidation validation={analysis.pageValidation} />
      <NSFMissingRequirements 
        missing={analysis.missingRequirements}
        onRecommendation={onRecommendationRequest}
      />
    </div>
  )
}
```

### Cross-Service Shared Components

#### ServiceHeader Component
```typescript
interface ServiceHeaderProps {
  service: 'far' | 'nsf'
  onServiceSwitch: () => void
  sessionId: string
  analysisCount?: number
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  service,
  onServiceSwitch,
  sessionId,
  analysisCount = 0
}) => {
  const serviceConfig = SERVICE_OPTIONS.find(s => s.id === service)
  
  return (
    <header className="service-header">
      <div className="service-info">
        <Icon name={serviceConfig?.icon} color={serviceConfig?.color} />
        <h1>{serviceConfig?.title}</h1>
        <span className="session-id">Session: {sessionId}</span>
      </div>
      <div className="service-actions">
        <span className="analysis-count">{analysisCount} analyses</span>
        <Button variant="outline" onClick={onServiceSwitch}>
          Switch Service
        </Button>
      </div>
    </header>
  )
}
```

#### UnifiedAgentInterface Component
```typescript
interface UnifiedAgentInterfaceProps {
  service: 'far' | 'nsf'
  availableAgents: AgentConfig[]
  onAgentQuery: (query: string, targetAgent?: string) => Promise<AgentResponse>
  currentAnalysis?: ComplianceAnalysis | NSFComplianceAnalysis
}

interface ServiceAgentConfig {
  far: {
    agents: ['far-agent', 'executive-order-agent', 'technical-agent']
    platform: 'aws-bedrock'
    models: {
      'far-agent': 'claude-3.5-sonnet'
      'executive-order-agent': 'claude-3.5-sonnet'
      'technical-agent': 'nova-pro'
    }
  }
  nsf: {
    agents: ['nsf-agent', 'technical-agent']
    platform: 'google-genkit'
    models: {
      'nsf-agent': 'gemini-1.5-pro'
      'technical-agent': 'gemini-1.5-pro'
    }
  }
}

const UnifiedAgentInterface: React.FC<UnifiedAgentInterfaceProps> = ({
  service,
  availableAgents,
  onAgentQuery,
  currentAnalysis
}) => {
  const serviceConfig = SERVICE_AGENT_CONFIG[service]
  
  return (
    <div className="unified-agent-interface">
      <AgentSelector 
        agents={availableAgents}
        service={service}
        platform={serviceConfig.platform}
      />
      <ChatInterface 
        onQuery={onAgentQuery}
        context={currentAnalysis}
        serviceType={service}
      />
      <ProvenanceDisplay 
        service={service}
        platform={serviceConfig.platform}
      />
    </div>
  )
}
```

#### CrossPlatformProvenanceDisplay Component
```typescript
interface CrossPlatformProvenanceDisplayProps {
  provenance: EnhancedProvenanceInfo
  showPlatform?: boolean
  showModel?: boolean
  showService?: boolean
}

interface EnhancedProvenanceInfo {
  agentId: string
  agentName: string
  service: 'far' | 'nsf'
  platform: 'aws-bedrock' | 'google-genkit'
  model: string
  timestamp: Date
  processingTime: number
  confidence: number
  backend: 'strands-agent' | 'genkit-service'
}

const CROSS_PLATFORM_PROVENANCE_STYLES = {
  'far-agent': {
    color: 'blue',
    icon: 'GovernmentBuilding',
    label: 'FAR Agent',
    platform: 'AWS Bedrock',
    model: 'Claude 3.5 Sonnet'
  },
  'executive-order-agent': {
    color: 'purple',
    icon: 'Gavel',
    label: 'Executive Order Agent',
    platform: 'AWS Bedrock',
    model: 'Claude 3.5 Sonnet'
  },
  'technical-agent': {
    color: 'green',
    icon: 'Cog',
    label: 'Technical Agent',
    platform: 'Shared',
    model: 'Nova Pro / Gemini 1.5 Pro'
  },
  'nsf-agent': {
    color: 'orange',
    icon: 'GraduationCap',
    label: 'NSF Agent',
    platform: 'Google Genkit',
    model: 'Gemini 1.5 Pro'
  }
}
```

### API Layer Enhancement

#### Enhanced Service Router
```typescript
// apps/web/src/services/ServiceRouter.ts
interface ServiceRouterConfig {
  far: {
    backend: 'strands-agent'
    baseUrl: string
    endpoints: {
      analyze: '/api/analyze'
      agents: '/api/agents'
      health: '/health'
    }
  }
  nsf: {
    backend: 'genkit-service'
    baseUrl: string
    endpoints: {
      analyze: '/api/analyze'
      sections: '/api/sections'
      health: '/health'
    }
  }
}

class ServiceRouter {
  private config: ServiceRouterConfig

  constructor(config: ServiceRouterConfig) {
    this.config = config
  }

  async routeAnalysisRequest(
    service: 'far' | 'nsf',
    documents: AnalysisDocuments,
    options?: AnalysisOptions
  ): Promise<ComplianceAnalysis | NSFComplianceAnalysis> {
    const serviceConfig = this.config[service]
    
    if (service === 'far') {
      return await this.routeToFARService(documents, options)
    } else {
      return await this.routeToNSFService(documents, options)
    }
  }

  private async routeToFARService(
    documents: AnalysisDocuments,
    options?: AnalysisOptions
  ): Promise<ComplianceAnalysis> {
    const response = await fetch(`${this.config.far.baseUrl}${this.config.far.endpoints.analyze}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        documents,
        options,
        service: 'far',
        analysisType: 'dual-analysis'
      })
    })
    
    return await response.json()
  }

  private async routeToNSFService(
    documents: AnalysisDocuments,
    options?: AnalysisOptions
  ): Promise<NSFComplianceAnalysis> {
    const response = await fetch(`${this.config.nsf.baseUrl}${this.config.nsf.endpoints.analyze}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        documents,
        options,
        service: 'nsf',
        analysisType: 'section-based'
      })
    })
    
    return await response.json()
  }
}
```

#### Enhanced API Routes
```typescript
// apps/web/src/app/api/analyze/route.ts
interface EnhancedAnalyzeRequest {
  service: 'far' | 'nsf'
  documents: {
    solicitation?: File
    proposal: File
  }
  options?: AnalysisOptions
}

export async function POST(request: Request) {
  const { service, documents, options } = await request.json() as EnhancedAnalyzeRequest
  
  // Validate service selection
  if (!['far', 'nsf'].includes(service)) {
    return NextResponse.json({ error: 'Invalid service selection' }, { status: 400 })
  }
  
  // Route to appropriate service
  const serviceRouter = new ServiceRouter(SERVICE_ROUTER_CONFIG)
  
  try {
    const analysis = await serviceRouter.routeAnalysisRequest(service, documents, options)
    return NextResponse.json(analysis)
  } catch (error) {
    return NextResponse.json({ 
      error: `${service.toUpperCase()} analysis failed`,
      details: error.message 
    }, { status: 500 })
  }
}

// Service-specific API routes
// apps/web/src/app/api/far/analyze/route.ts
export async function POST(request: Request) {
  // FAR-specific analysis logic
  return await orchestrateFARAnalysis(documents, options)
}

// apps/web/src/app/api/nsf/analyze/route.ts
export async function POST(request: Request) {
  // NSF-specific analysis logic
  return await orchestrateNSFAnalysis(documents, options)
}

async function orchestrateNSFAnalysis(
  documents: AnalysisDocuments,
  options?: AnalysisOptions
): Promise<NSFComplianceAnalysis> {
  // Extract and process documents
  const proposalContent = await extractDocumentContent(documents.proposal)
  const solicitationContent = documents.solicitation 
    ? await extractDocumentContent(documents.solicitation)
    : await getDefaultNSFRequirements()
  
  // Perform section-based analysis
  const sectionAnalysis = await performNSFSectionAnalysis({
    proposal: proposalContent,
    solicitation: solicitationContent,
    agents: ['nsf-agent']
  })
  
  // Validate page limits
  const pageValidation = await validateNSFPageLimits(proposalContent)
  
  // Identify missing requirements
  const missingRequirements = await identifyMissingNSFRequirements(sectionAnalysis)
  
  // Calculate overall compliance score
  const overallScore = calculateNSFComplianceScore(sectionAnalysis, pageValidation)
  
  return {
    id: generateAnalysisId(),
    overallScore,
    status: determineNSFComplianceStatus(overallScore),
    sectionFindings: sectionAnalysis,
    pageValidation,
    missingRequirements,
    regulatoryInfo: await getCurrentNSFRegulatoryInfo(),
    timestamp: new Date(),
    processingTime: Date.now() - startTime
  }
}
```

## Data Models

### Enhanced Session Management
```typescript
interface EnhancedAnalysisSession {
  id: string
  service: 'far' | 'nsf'
  userId?: string
  createdAt: Date
  lastUpdated: Date
  status: 'active' | 'completed' | 'expired'
  documents: {
    solicitation?: DocumentInfo
    proposal: DocumentInfo
  }
  analyses: (ComplianceAnalysis | NSFComplianceAnalysis)[]
  agentInteractions: AgentInteraction[]
  serviceHistory: ServiceSwitchHistory[]
}

interface ServiceSwitchHistory {
  fromService: 'far' | 'nsf'
  toService: 'far' | 'nsf'
  timestamp: Date
  reason?: string
  preservedData: boolean
}
```

### Cross-Service Analysis Types
```typescript
type UnifiedComplianceAnalysis = ComplianceAnalysis | NSFComplianceAnalysis

interface AnalysisMetadata {
  service: 'far' | 'nsf'
  platform: 'aws-bedrock' | 'google-genkit'
  backend: 'strands-agent' | 'genkit-service'
  analysisType: 'dual-analysis' | 'section-based'
  agents: string[]
  models: Record<string, string>
}

interface CrossServiceComparison {
  farAnalysis?: ComplianceAnalysis
  nsfAnalysis?: NSFComplianceAnalysis
  sharedFindings: SharedFinding[]
  platformDifferences: PlatformDifference[]
}

interface SharedFinding {
  category: string
  farVerdict?: string
  nsfVerdict?: string
  confidence: {
    far?: number
    nsf?: number
  }
  recommendation: string
}
```

### Service Configuration Model
```typescript
interface ServiceConfiguration {
  far: {
    name: 'Federal Procurement Compliance'
    regulations: ['FAR', 'DFARS', 'Executive Orders']
    agents: ['far-agent', 'executive-order-agent', 'technical-agent']
    analysisType: 'dual-analysis'
    backend: 'strands-agent'
    platform: 'aws-bedrock'
    models: {
      'far-agent': 'claude-3.5-sonnet'
      'executive-order-agent': 'claude-3.5-sonnet'
      'technical-agent': 'nova-pro'
    }
    capabilities: ['risk-classification', 'convergent-validation', 'non-waivable-detection']
  }
  nsf: {
    name: 'NSF Grant Compliance'
    regulations: ['NSF PAPPG 23-1']
    agents: ['nsf-agent', 'technical-agent']
    analysisType: 'section-based'
    backend: 'genkit-service'
    platform: 'google-genkit'
    models: {
      'nsf-agent': 'gemini-1.5-pro'
      'technical-agent': 'gemini-1.5-pro'
    }
    capabilities: ['section-analysis', 'page-validation', 'fuzzy-matching', 'missing-detection']
  }
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Property 1: Service selection interface consistency
*For any* application access, the service selection interface should display both Federal Procurement and NSF Grant compliance options with clear descriptions
**Validates: Requirements 1.1, 1.5**

Property 2: Service routing accuracy
*For any* service selection, Federal Procurement should route to FAR workflow and NSF Grant should route to NSF workflow with proper session management
**Validates: Requirements 1.2, 1.3, 1.4**

Property 3: NSF compliance workflow functionality
*For any* NSF service usage, it should accept PDF formats and validate against NSF PAPPG 23-1 requirements with section analysis
**Validates: Requirements 2.1, 2.2**

Property 4: NSF evidence-based results
*For any* NSF analysis, results should show evidence-based findings with exact PAPPG citations, proposal quotes, and page numbers
**Validates: Requirements 2.3**

Property 5: NSF remediation recommendations
*For any* NSF compliance issues, the system should provide specific remediation recommendations with current and required states
**Validates: Requirements 2.4**

Property 6: NSF fuzzy matching capability
*For any* NSF section analysis, the system should use fuzzy matching for header variations and highlight missing required sections
**Validates: Requirements 2.5**

Property 7: Agent coordination by service
*For any* FAR service usage, the system should coordinate FAR Agent, Executive Order Agent, and Technical Agent appropriately
**Validates: Requirements 3.1**

Property 8: NSF agent coordination
*For any* NSF service usage, the system should coordinate NSF Agent and Technical Agent with shared Technical Agent functionality
**Validates: Requirements 3.2**

Property 9: Technical agent routing
*For any* technical questions, the system should route queries to the Technical Agent regardless of selected service
**Validates: Requirements 3.3**

Property 10: Domain-appropriate regulatory citations
*For any* agent recommendations, the system should include regulatory citations appropriate to the selected compliance domain
**Validates: Requirements 3.4, 3.5**

Property 11: Service-appropriate results display
*For any* FAR service usage, results should show dual-analysis results with convergent validation
**Validates: Requirements 4.1**

Property 12: NSF section-based results
*For any* NSF service usage, results should show section-based compliance results organized by NSF proposal structure
**Validates: Requirements 4.2**

Property 13: Domain-appropriate classification
*For any* compliance findings, results should be organized using domain-appropriate classification (risk levels for FAR, compliance status for NSF)
**Validates: Requirements 4.3**

Property 14: Evidence presentation consistency
*For any* compliance findings, the system should show exact proposal quotes with regulatory citations appropriate to the selected service
**Validates: Requirements 4.4**

Property 15: Critical issue highlighting
*For any* critical compliance issues, the system should highlight domain-specific critical requirements (non-waivable for FAR, page limits for NSF)
**Validates: Requirements 4.5**

Property 16: AI service provenance transparency
*For any* analysis results, the system should show which AI service (AWS Bedrock for FAR, Google Genkit for NSF) provided each analysis
**Validates: Requirements 5.1**

Property 17: FAR regulatory update display
*For any* FAR service usage, the system should display regulatory update dates for FAR/DFARS references and Executive Order compliance checks
**Validates: Requirements 5.2**

Property 18: NSF regulatory version display
*For any* NSF service usage, the system should display NSF PAPPG 23-1 version and effective date for all compliance checks
**Validates: Requirements 5.3**

Property 19: Shared agent provenance
*For any* Technical Agent usage, the system should show clear provenance for shared Technical Agent across both domains
**Validates: Requirements 5.4**

Property 20: Conflicting assessment handling
*For any* conflicting agent assessments, the system should present both analyses with confidence scores and domain context
**Validates: Requirements 5.5**

Property 21: Enhanced component architecture
*For any* UI components, the system should extend shared UI components to support both FAR and NSF workflows
**Validates: Requirements 6.1**

Property 22: Domain-specific component implementation
*For any* NSF-specific features, the system should implement NSF-specific components (section analysis, fuzzy matching, page validation)
**Validates: Requirements 6.2**

Property 23: Separate domain state management
*For any* application state, the system should maintain separate application state for each compliance domain
**Validates: Requirements 6.3**

Property 24: Service selection routing implementation
*For any* routing requests, the system should implement service selection routing with proper session management
**Validates: Requirements 6.4**

Property 25: Shared component usage
*For any* overlapping functionality, the system should use shared components with domain-specific configuration
**Validates: Requirements 6.5**

Property 26: Enhanced serverless API architecture
*For any* API design, the system should extend serverless API functions to support service selection and routing
**Validates: Requirements 7.1**

Property 27: Domain-specific analysis functions
*For any* request processing, the system should implement domain-specific analysis functions for FAR and NSF workflows
**Validates: Requirements 7.2**

Property 28: Unified agent coordination functions
*For any* agent coordination, the system should create unified agent coordination functions supporting both AWS Bedrock and Google Genkit
**Validates: Requirements 7.3**

Property 29: Consistent response formatting
*For any* response handling, the system should provide consistent response formatting across both compliance domains
**Validates: Requirements 7.4**

Property 30: Domain-specific processing logic
*For any* processing differences, the system should implement domain-specific logic while maintaining common interfaces
**Validates: Requirements 7.5**

Property 31: Cross-domain confidence scoring
*For any* compliance assessments, the system should provide confidence scores for both FAR and NSF compliance findings
**Validates: Requirements 8.1**

Property 32: Domain-specific issue flagging
*For any* compliance issues, the system should distinguish between high-confidence violations and expert review areas for both domains
**Validates: Requirements 8.2**

Property 33: Cross-domain interpretation display
*For any* compliance interpretations, the system should show triggering proposal text for both FAR and NSF compliance flags
**Validates: Requirements 8.3**

Property 34: Dual-domain human-in-the-loop validation
*For any* complex proposal processing, the system should implement human-in-the-loop validation for both compliance domains
**Validates: Requirements 8.4**

Property 35: Domain-specific expert review recommendations
*For any* uncertain reliability, the system should recommend expert review with domain-specific context and guidance
**Validates: Requirements 8.5**

## Error Handling

### Service Selection and Routing Errors
- **Invalid service selection**: Graceful fallback to service selection page with error message
- **Routing failures**: Clear error messages with retry options and service status information
- **Session conflicts**: Automatic session cleanup and recovery with data preservation options
- **Cross-service navigation errors**: Proper state management during service switches

### NSF-Specific Processing Errors
- **Section detection failures**: Fallback to manual section identification with fuzzy matching suggestions
- **Page limit validation errors**: Clear indication of page count issues with specific recommendations
- **PAPPG reference failures**: Fallback to cached regulatory data with currency warnings
- **Fuzzy matching failures**: Manual section mapping interface with confidence indicators

### Cross-Platform Integration Errors
- **Agent coordination failures**: Fallback to available agents with degraded functionality notice
- **Platform communication errors**: Retry mechanisms with platform-specific error handling
- **Model unavailability**: Graceful degradation with alternative model suggestions
- **Confidence scoring failures**: Default confidence levels with uncertainty indicators

### Enhanced Session Management Errors
- **Service switch failures**: Preserve existing session data with clear error recovery options
- **Session isolation errors**: Prevent cross-contamination between FAR and NSF sessions
- **Data persistence failures**: Local storage fallback with sync recovery mechanisms
- **Concurrent session conflicts**: Session priority management with user notification

## Testing Strategy

### Unit Testing
Unit tests will verify individual enhancement components:
- Service selection interface and routing logic
- NSF compliance workflow components and analysis functions
- Cross-platform agent coordination and response handling
- Enhanced session management and service switching
- Unified results display and provenance components

### Property-Based Testing
Property-based tests will verify universal properties using **fast-check**. Each test will run a minimum of 100 iterations.

Tests will cover:
- Service selection routing consistency across different user choices
- Session isolation across service switches and concurrent usage
- Agent coordination accuracy across different service configurations
- Results display consistency across both FAR and NSF domains
- Confidence scoring accuracy across different analysis scenarios
- Cross-platform provenance display across different AI services

Each property-based test will be tagged with: `**Feature: app-enhancement, Property {number}: {property_text}**`

### Integration Testing
Integration tests will verify cross-service interactions:
- End-to-end service selection and analysis workflows for both FAR and NSF
- Cross-platform agent coordination and response handling
- Enhanced session management across service switches
- Unified results display with proper domain-specific formatting
- Cross-service shared component usage and configuration

### End-to-End Testing
E2E tests using Playwright will verify complete dual-service workflows:
- Select FAR service and complete federal vendor compliance analysis
- Select NSF service and complete grant proposal compliance analysis
- Switch between services and verify session isolation and data preservation
- Test cross-platform agent interactions and provenance display
- Verify enhanced confidence scoring and expert review recommendations across both domains
- Test responsive behavior and accessibility compliance for all new components
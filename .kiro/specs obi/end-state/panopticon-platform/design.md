# Design Document - Final Phase: Sovereign OBI (Local Panopticon)

## Overview

The **Final Phase: Sovereign OBI** represents the realization of the Panopticon Platform as a fully sovereign, disconnected intelligence ecosystem. Following the successful ingestion and transformation of data in the Cloud Bridge phase, the system is **repatriated** to local commodity hardware (Beelink GTR9 and Apple Mac M4).

In this end-state, the application evolves into a **Unified Intelligence Interface**—a single, immersive environment that transcends the previous dual-app structure. The technical foundation shifts to a high-performance Go-based infrastructure using the **Ent framework** for graph-based Object-Based Intelligence (OBI). Data is stored locally in PostgreSQL with **pgvector** for semantic search, and all AI inference is performed air-gapped using **Ollama** (Llama 3/Gemma). This phase achieves absolute data sovereignty and near-peer analytical capability on commodity hardware.

The system implements a "living" intelligence environment where objects (Person, Place, Event, Equipment) continuously update as new data flows in, re-evaluating relationships through AI while securing every data point at the granular cell level. This design serves as the strategic roadmap for building the future of collaborative intelligence analysis.

## Architecture

### Panopticon Platform Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           Panopticon Intelligence Platform                               │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                          Dual Application Layer                                     │ │
│  │                                                                                     │ │
│  │  ┌─────────────────────────────────┐  ┌─────────────────────────────────────────┐   │ │
│  │  │        NSF/FAR Compliance App   │  │           Neon Lab App                  │   │ │
│  │  │         (Proposal Prepper)      │  │      (Intelligence Interface)           │   │ │
│  │  │                                 │  │                                         │   │ │
│  │  │ - Federal Procurement Analysis  │  │ - Cyberpunk UI & Gaming Mechanics      │   │ │
│  │  │ - NSF Grant Compliance          │  │ - Interactive 3D Labyrinths            │   │ │
│  │  │ - Regulatory Validation         │  │ - Trust Level Progression              │   │ │
│  │  │ - Business Dashboards           │  │ - Immersive Intelligence Navigation    │   │ │
│  │  │ - Compliance Reports            │  │ - Spatial Object Relationships         │   │ │
│  │  │ - Expert Review Workflows       │  │ - Real-time Dynamic Environments       │   │ │
│  │  │                                 │  │                                         │   │ │
│  │  │ Users: Compliance Analysts      │  │ Users: Intelligence Analysts           │   │ │
│  │  │        Grant Writers            │  │        Cybersecurity Teams             │   │ │
│  │  │        Federal Vendors          │  │        Research Investigators          │   │ │
│  │  └─────────────────────────────────┘  └─────────────────────────────────────────┘   │ │
│  └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                              │                                           │
│                                              ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                    Unified Design System & Component Layer                          │ │
│  │                                                                                     │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │ │
│  │  │ @17sierra/ui    │  │ AI-Powered      │  │ PatternFly      │  │ Plasmic Visual  │ │ │
│  │  │ Component Lib   │  │ Theming Engine  │  │ Integration     │  │ Editor          │ │ │
│  │  │ - Radix UI Base │  │ - Natural Lang  │  │ - Enterprise    │  │ - Non-dev       │ │ │
│  │  │ - Tailwind CSS  │  │ - Theme Gen     │  │ - Accessibility │  │   Content       │ │ │
│  │  │ - Dual Themes   │  │ - Live Preview  │  │ - Proven UX     │  │ - Visual Design │ │ │
│  │  │ - Accessibility │  │ - Cross-App     │  │ - Gov Standards │  │ - Code Gen      │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                              │                                           │
│                                              ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                      Shared API Gateway & Service Layer                             │ │
│  │                                                                                     │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │ │
│  │  │ Compliance APIs │  │ Intelligence    │  │ Cross-App       │  │ Unified         │ │ │
│  │  │ - Document      │  │ APIs            │  │ Data Sharing    │  │ Authentication  │ │ │
│  │  │   Processing    │  │ - Spatial       │  │ - Entity        │  │ - SSO/Security  │ │ │
│  │  │ - Regulatory    │  │   Navigation    │  │   Resolution    │  │ - Session Mgmt  │ │ │
│  │  │   Validation    │  │ - Trust Levels  │  │ - Graph         │  │ - Audit Trails  │ │ │
│  │  │ - Report        │  │ - Gaming        │  │   Traversal     │  │ - Monitoring    │ │ │
│  │  │   Generation    │  │   Mechanics     │  │ - Shared Intel  │  │ - Analytics     │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                              │                                           │
│                                              ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                        Knowledge Graph & AI Layer                                   │ │
│  │                                                                                     │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │ │
│  │  │ JanusGraph      │  │ GraphRAG        │  │ Entity          │  │ Community       │ │ │
│  │  │ - Distributed   │  │ - Mistral Large │  │ Resolution      │  │ Detection       │ │ │
│  │  │ - Accumulo      │  │ - vLLM Serving  │  │ - Senzing       │  │ - Leiden Algo   │ │ │
│  │  │ - Cell Security │  │ - Air-gapped    │  │ - Real-time     │  │ - Hierarchical  │ │ │
│  │  │ - Billions of   │  │ - 128k Context  │  │ - Billions of   │  │ - Summaries     │ │ │
│  │  │   Nodes/Edges   │  │ - Local Embed   │  │   Records       │  │ - Global Query  │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                              │                                           │
│                                              ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                      Secure Storage & Processing Layer                              │ │
│  │                                                                                     │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │ │
│  │  │ Apache Accumulo │  │ Apache Iceberg  │  │ Apache Spark    │  │ MinIO/S3        │ │ │
│  │  │ - Cell-Level    │  │ - Petabyte      │  │ - Universal     │  │ - Object        │ │ │
│  │  │   Security      │  │   Scale         │  │   Connector     │  │   Storage       │ │ │
│  │  │ - Visibility    │  │ - Schema        │  │ - Kubernetes    │  │ - Raw Zone      │ │ │
│  │  │   Labels        │  │   Evolution     │  │ - ETL Pipeline  │  │ - Bronze/Silver │ │ │
│  │  │ - NSA-grade     │  │ - Time Travel   │  │ - Bulk Loading  │  │ - Gold Zones    │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                              │                                           │
│                                              ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                         Data Ingestion Layer                                        │ │
│  │                                                                                     │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │ │
│  │  │ Structured Data │  │ Semi-Structured │  │ Unstructured    │  │ Real-time       │ │ │
│  │  │ - SQL Dumps     │  │ - JSON/XML Logs │  │ - PDFs/Emails   │  │ - Streaming     │ │ │
│  │  │ - Databases     │  │ - API Responses │  │ - Media Files   │  │ - Signal Intel  │ │ │
│  │  │ - Spreadsheets  │  │ - Config Files  │  │ - Documents     │  │ - Financial     │ │ │
│  │  │ - CSV/TSV       │  │ - Log Files     │  │ - Images/Video  │  │ - Social Media  │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                           │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Object-Based Intelligence (OBI) Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                        Object-Based Intelligence Paradigm                               │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                           Living Objects Layer                                      │ │
│  │                                                                                     │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │ │
│  │  │ Person Objects  │  │ Place Objects   │  │ Event Objects   │  │ Equipment       │ │ │
│  │  │                 │  │                 │  │                 │  │ Objects         │ │ │
│  │  │ - Identity      │  │ - Geolocation   │  │ - Temporal      │  │ - Technical     │ │ │
│  │  │ - Relationships │  │ - Address       │  │ - Participants  │  │ - Serial Numbers│ │ │
│  │  │ - Activities    │  │ - Significance  │  │ - Outcomes      │  │ - Capabilities  │ │ │
│  │  │ - Attributes    │  │ - Connections   │  │ - Evidence      │  │ - Ownership     │ │ │
│  │  │ - History       │  │ - Surveillance  │  │ - Timeline      │  │ - Location      │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                              │                                           │
│                                              ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                        Dynamic Tasking Engine                                       │ │
│  │                                                                                     │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │ │
│  │  │ Data Velocity   │  │ Analyst         │  │ Alert           │  │ Subscription    │ │ │
│  │  │ Monitoring      │  │ Subscriptions   │  │ Generation      │  │ Management      │ │ │
│  │  │                 │  │                 │  │                 │  │                 │ │ │
│  │  │ - Ingestion     │  │ - Object        │  │ - Priority      │  │ - Interest      │ │ │
│  │  │   Rate          │  │   Interest      │  │   Scoring       │  │   Tracking      │ │ │
│  │  │ - Change        │  │ - Notification  │  │ - Threshold     │  │ - Preference    │ │ │
│  │  │   Detection     │  │   Preferences   │  │   Management    │  │   Learning      │ │ │
│  │  │ - Pattern       │  │ - Workload      │  │ - Escalation    │  │ - Collaboration │ │ │
│  │  │   Recognition   │  │   Balancing     │  │   Rules         │  │   Networks      │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                              │                                           │
│                                              ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                      Single Point of Truth Architecture                             │ │
│  │                                                                                     │ │
│  │  - Each object (Target X) exists as single entity in system                        │ │
│  │  - All reports referencing Target X contribute to single node                      │ │
│  │  - Eliminates duplication and ensures complete data visibility                     │ │
│  │  - Automatic consolidation when entity resolution identifies matches               │ │
│  │  - Audit trails for all object updates and analyst interactions                    │ │
│  │  - Version control and time travel capabilities for object history                 │ │
│  └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                           │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Cell-Level Security Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                         Apache Accumulo Security Model                                  │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                        Visibility Label System                                      │ │
│  │                                                                                     │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │ │
│  │  │ Classification  │  │ Compartment     │  │ Source          │  │ Need-to-Know    │ │ │
│  │  │ Labels          │  │ Controls        │  │ Protection      │  │ Enforcement     │ │ │
│  │  │                 │  │                 │  │                 │  │                 │ │ │
│  │  │ - UNCLASSIFIED  │  │ - (NSA | CIA)   │  │ - SOURCE_A      │  │ - PROJECT_X     │ │ │
│  │  │ - CONFIDENTIAL  │  │ - (FBI | DHS)   │  │ - SOURCE_B      │  │ - OPERATION_Y   │ │ │
│  │  │ - SECRET        │  │ - (DOD | STATE) │  │ - HUMINT        │  │ - ANALYST_TEAM  │ │ │
│  │  │ - TOP_SECRET    │  │ - (IC | FVEY)   │  │ - SIGINT        │  │ - CLEARANCE_LVL │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                              │                                           │
│                                              ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                      Boolean Expression Evaluation                                  │ │
│  │                                                                                     │ │
│  │  Example Labels:                                                                    │ │
│  │  - (SECRET & (NSA | CIA))                                                           │ │
│  │  - (TOP_SECRET & SOURCE_A & PROJECT_X)                                             │ │
│  │  - (CONFIDENTIAL & (FBI | DHS) & !FOREIGN_NATIONAL)                               │ │
│  │  - (UNCLASSIFIED | (SECRET & ANALYST_TEAM))                                        │ │
│  │                                                                                     │ │
│  │  User Authorization Examples:                                                       │ │
│  │  - Analyst_1: [SECRET, NSA, PROJECT_X, ANALYST_TEAM]                              │ │
│  │  - Analyst_2: [TOP_SECRET, CIA, SOURCE_A, PROJECT_X]                              │ │
│  │  - Analyst_3: [CONFIDENTIAL, FBI, ANALYST_TEAM]                                    │ │
│  │                                                                                     │ │
│  │  Result: Each analyst sees only data they are authorized to access                 │ │
│  └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                              │                                           │
│                                              ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                        Iterator-Level Enforcement                                   │ │
│  │                                                                                     │ │
│  │  - Evaluation occurs deep within storage engine (not application layer)            │ │
│  │  - Unauthorized cells are omitted from result set (invisible to user)              │ │
│  │  - No security fragmentation - all analysts query same tables                      │ │
│  │  - Partial document visibility (metadata visible, content protected)               │ │
│  │  - Performance optimized - security checks integrated with data retrieval          │ │
│  └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                           │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### Data Ingestion and Processing Components

#### UniversalDataIngestionPipeline Component
```typescript
interface UniversalDataIngestionPipelineProps {
  sources: DataSource[]
  onIngestionComplete: (result: IngestionResult) => void
  onError: (error: IngestionError) => void
}

interface DataSource {
  id: string
  type: 'structured' | 'semi-structured' | 'unstructured' | 'streaming'
  format: string // 'sql', 'json', 'xml', 'pdf', 'email', 'media', 'stream'
  location: string // URL, file path, or stream endpoint
  classification: ClassificationLevel
  sourceReliability: number // 0-100
  updateFrequency: 'real-time' | 'hourly' | 'daily' | 'weekly' | 'manual'
  visibilityLabel: string // Accumulo visibility expression
}

interface IngestionResult {
  sourceId: string
  recordsProcessed: number
  entitiesExtracted: number
  relationshipsIdentified: number
  processingTime: number
  dataZone: 'bronze' | 'silver' | 'gold'
  qualityScore: number
  errors: IngestionError[]
}

const DATA_PIPELINE_ZONES = {
  bronze: {
    description: 'Raw data in native format',
    storage: 'iceberg',
    transformation: 'none',
    purpose: 'preserve original fidelity'
  },
  silver: {
    description: 'Cleaned and standardized OBI format',
    storage: 'iceberg',
    transformation: 'entity_resolution',
    purpose: 'semantic normalization'
  },
  gold: {
    description: 'Aggregated objects and graph data',
    storage: 'accumulo_janusgraph',
    transformation: 'graph_construction',
    purpose: 'analysis and serving'
  }
}
```

#### EntityResolutionEngine Component
```typescript
interface EntityResolutionEngineProps {
  records: IncomingRecord[]
  onResolutionComplete: (result: ResolutionResult) => void
  onEntityMerge: (mergeEvent: EntityMergeEvent) => void
}

interface SenzingConfiguration {
  principleBasedResolution: boolean
  realTimeProcessing: boolean
  scalingTarget: number // billions of records
  confidenceThreshold: number // 0-100
  relationshipTypes: RelationshipType[]
}

interface RelationshipType {
  type: 'phone_number' | 'address' | 'email' | 'ssn' | 'vehicle' | 'financial_account'
  weight: number // importance in entity resolution
  fuzzyMatching: boolean
  approximateMatching: boolean
}

interface EntityMergeEvent {
  previousEntityIds: string[]
  newEntityId: string
  mergeReason: string
  confidence: number
  affectedRelationships: string[]
  timestamp: Date
  triggeringRecord: string
}

const SENZING_RELATIONSHIP_CONFIG: RelationshipType[] = [
  {
    type: 'phone_number',
    weight: 0.8,
    fuzzyMatching: false,
    approximateMatching: true // handles formatting variations
  },
  {
    type: 'address',
    weight: 0.7,
    fuzzyMatching: true,
    approximateMatching: true // handles abbreviations, typos
  },
  {
    type: 'email',
    weight: 0.9,
    fuzzyMatching: false,
    approximateMatching: false // exact match required
  }
]
```

### Knowledge Graph and AI Components

#### GraphRAGQueryEngine Component
```typescript
interface GraphRAGQueryEngineProps {
  knowledgeGraph: JanusGraphInstance
  localLLM: MistralLarge2Instance
  onQueryComplete: (result: GraphRAGResult) => void
  onProvenanceRequest: (queryId: string) => ProvenanceChain
}

interface GraphRAGConfiguration {
  model: 'mistral-large-2'
  parameters: 123_000_000_000 // 123B parameters
  contextWindow: 128_000 // 128k tokens
  servingEngine: 'vLLM'
  embeddingModel: 'nomic-embed-text'
  communityDetection: 'leiden'
  hierarchicalSummaries: boolean
  airGappedDeployment: boolean
}

interface GraphRAGResult {
  queryId: string
  globalAnswer: string
  communityContributions: CommunityContribution[]
  provenanceChain: ProvenanceChain
  confidence: number
  processingTime: number
  hallucinationRisk: 'low' | 'medium' | 'high'
  expertReviewRecommended: boolean
}

interface CommunityContribution {
  communityId: string
  summary: string
  relevanceScore: number
  sourceReports: string[]
  entityCount: number
  relationshipCount: number
}

interface ProvenanceChain {
  sourceReports: SourceReport[]
  graphCommunities: string[]
  reasoningSteps: ReasoningStep[]
  citationAccuracy: number
  auditTrail: AuditEntry[]
}
```

#### LocalLLMOrchestrator Component
```typescript
interface LocalLLMOrchestratorProps {
  models: LocalModelConfig[]
  onModelResponse: (response: LLMResponse) => void
  onModelError: (error: ModelError) => void
}

interface LocalModelConfig {
  modelId: 'mistral-large-2' | 'nomic-embed-text'
  servingEngine: 'vLLM' | 'ollama'
  endpoint: string // local endpoint
  parameters: number
  quantization?: '4-bit' | '8-bit' | 'full-precision'
  gpuRequirement: 'H100' | 'A100' | 'consumer'
  memoryRequirement: string // e.g., "80GB"
}

interface vLLMConfiguration {
  apiBase: 'http://localhost:8000/v1'
  openAICompatible: true
  pagedAttention: true
  maxTokens: 4000
  temperature: 0.1 // low for factual analysis
  topP: 0.9
  frequencyPenalty: 0.0
}

interface OllamaConfiguration {
  apiBase: 'http://localhost:11434/api'
  embeddingOptimized: true
  localRetrieval: true
  batchSize: 32
  dimensions: 768 // embedding dimensions
}
```

### Visualization and User Interface Components

#### GraphistryVisualizationEngine Component
```typescript
interface GraphistryVisualizationEngineProps {
  graphData: MassiveGraphData
  onNodeSelection: (nodeIds: string[]) => void
  onPathAnalysis: (path: GraphPath) => void
  onClusterAnalysis: (cluster: NodeCluster) => void
}

interface MassiveGraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
  nodeCount: number // millions
  edgeCount: number // millions
  renderingMode: 'gpu-accelerated'
  streamingEnabled: boolean
  clientOptimization: 'server-side'
}

interface GraphNode {
  id: string
  type: 'person' | 'place' | 'event' | 'equipment'
  label: string
  properties: Record<string, any>
  visibilityLabel: string
  classification: ClassificationLevel
  size: number // visual size based on importance
  color: string // based on type or classification
  position?: { x: number; y: number; z?: number }
}

interface GraphEdge {
  id: string
  source: string
  target: string
  type: RelationshipType
  weight: number
  confidence: number
  visibilityLabel: string
  properties: Record<string, any>
  temporal?: TemporalInfo
}

interface GraphistryConfiguration {
  gpuAcceleration: true
  serverSideRendering: true
  clientStreaming: true
  maxNodes: 10_000_000 // 10 million nodes
  maxEdges: 100_000_000 // 100 million edges
  airGappedDeployment: true
  dockerContainer: 'graphistry/graphistry-forge'
  jupyterIntegration: true // PyGraphistry support
}
```

#### CollaborativeDeconflictionInterface Component
```typescript
interface CollaborativeDeconflictionInterfaceProps {
  currentUser: AnalystProfile
  onDeconflictionAlert: (alert: DeconflictionAlert) => void
  onPSIRequest: (request: PSIRequest) => void
}

interface DeconflictionAlert {
  alertId: string
  conflictType: 'same_target' | 'overlapping_investigation' | 'resource_conflict'
  involvedAnalysts: AnalystProfile[]
  targetEntity: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  recommendedAction: 'coordinate' | 'deconflict' | 'merge_efforts' | 'separate_domains'
  timestamp: Date
  autoResolution?: boolean
}

interface PSIRequest {
  requestId: string
  requestingTeam: string
  targetList: string[] // encrypted/hashed
  protocol: 'diffie-hellman' | 'homomorphic-encryption'
  confidentialityLevel: 'standard' | 'high' | 'maximum'
  timeLimit: number // hours
  approvalRequired: boolean
}

interface CaseExplorerModel {
  analystId: string
  entityId: string
  accessType: 'query' | 'deep_analysis' | 'checkout' | 'subscription'
  timestamp: Date
  duration?: number
  purpose?: string
  classification: ClassificationLevel
}

const DECONFLICTION_PROTOCOLS = {
  operational: {
    name: 'Case Explorer Model',
    description: 'Log analyst interest and generate alerts for overlaps',
    implementation: 'real-time monitoring',
    scope: 'same organization'
  },
  cryptographic: {
    name: 'Private Set Intersection (PSI)',
    description: 'Blind target list comparison between teams',
    implementation: 'OpenMined PSI library',
    scope: 'cross-organization'
  }
}
```

### Security and Access Control Components

#### CellLevelSecurityManager Component
```typescript
interface CellLevelSecurityManagerProps {
  userAuthorizations: UserAuthorization[]
  onAccessDenied: (denial: AccessDenialEvent) => void
  onAuditEvent: (event: SecurityAuditEvent) => void
}

interface UserAuthorization {
  userId: string
  clearanceLevel: ClassificationLevel
  compartments: string[] // e.g., ['NSA', 'CIA', 'PROJECT_X']
  sources: string[] // e.g., ['SOURCE_A', 'HUMINT']
  needToKnow: string[] // e.g., ['OPERATION_Y', 'ANALYST_TEAM']
  expirationDate?: Date
  restrictions?: string[]
}

interface VisibilityLabelEvaluator {
  evaluateAccess(label: string, authorizations: string[]): boolean
  parseLabel(label: string): ParsedLabel
  combineLabels(labels: string[]): string
  validateLabel(label: string): boolean
}

interface ParsedLabel {
  classification: ClassificationLevel
  compartments: string[]
  sources: string[]
  needToKnow: string[]
  booleanExpression: string
}

interface AccumuloSecurityConfiguration {
  cellLevelSecurity: true
  visibilityLabels: true
  iteratorLevelEnforcement: true
  partialDocumentVisibility: true
  securityFragmentationPrevention: true
  auditLogging: true
  performanceOptimization: true
}
```

### Infrastructure and Deployment Components

#### KubernetesClusterManager Component
```typescript
interface KubernetesClusterManagerProps {
  nodeConfigurations: NodeConfiguration[]
  onScalingEvent: (event: ScalingEvent) => void
  onResourceAlert: (alert: ResourceAlert) => void
}

interface NodeConfiguration {
  nodeType: 'compute' | 'gpu' | 'storage' | 'network'
  specifications: NodeSpecs
  count: number
  autoScaling: boolean
  resourceLimits: ResourceLimits
}

interface NodeSpecs {
  cpu: string // e.g., "64 cores"
  memory: string // e.g., "512GB RAM"
  storage: string // e.g., "10TB NVMe SSD"
  gpu?: string // e.g., "8x NVIDIA H100"
  network: string // e.g., "100GbE"
}

interface InfrastructureRequirements {
  concurrentUsers: 100
  dataScale: 'petabytes'
  processingType: 'in-memory-spark' | 'accumulo-caching' | 'gpu-inference'
  networkRequirement: '100GbE' | 'InfiniBand'
  storageType: 'NVMe-SSD'
  securityLevel: 'air-gapped'
}

const HARDWARE_SPECIFICATIONS = {
  compute: {
    cpu: 'High-RAM nodes for Spark processing',
    memory: '256GB+ for in-memory operations',
    storage: 'Fast NVMe for Accumulo WAL',
    network: '100GbE for shuffle traffic'
  },
  gpu: {
    model: 'NVIDIA H100 or A100',
    purpose: 'Mistral Large 2 inference',
    memory: '80GB+ for 123B parameter model',
    quantization: '4-bit to 8-bit for efficiency'
  },
  network: {
    interconnect: '100GbE or InfiniBand',
    purpose: 'Spark shuffle and GraphRAG algorithms',
    latency: 'Low latency for real-time queries',
    bandwidth: 'High bandwidth for bulk transfers'
  }
}
```

## Data Models

### Object-Based Intelligence Models
```typescript
interface IntelligenceObject {
  id: string
  type: 'person' | 'place' | 'event' | 'equipment'
  primaryIdentifier: string
  aliases: string[]
  attributes: Record<string, AttributeValue>
  relationships: Relationship[]
  reports: ReportReference[]
  timeline: TemporalEvent[]
  confidence: number
  lastUpdated: Date
  visibilityLabel: string
  classification: ClassificationLevel
  subscribers: AnalystSubscription[]
}

interface AttributeValue {
  value: any
  confidence: number
  source: string
  timestamp: Date
  visibilityLabel: string
}

interface Relationship {
  id: string
  targetObjectId: string
  type: RelationshipType
  strength: number
  confidence: number
  evidence: Evidence[]
  temporal: TemporalInfo
  visibilityLabel: string
}

interface AnalystSubscription {
  analystId: string
  subscriptionType: 'updates' | 'alerts' | 'changes' | 'relationships'
  priority: 'low' | 'medium' | 'high' | 'critical'
  filters?: SubscriptionFilter[]
  createdAt: Date
  lastNotified?: Date
}
```

### Security and Classification Models
```typescript
interface ClassificationLevel {
  level: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET'
  compartments: string[]
  sources: string[]
  needToKnow: string[]
  foreignRelease?: boolean
  declassificationDate?: Date
}

interface SecurityAuditEvent {
  eventId: string
  eventType: 'access_granted' | 'access_denied' | 'data_modified' | 'query_executed'
  userId: string
  resourceId: string
  timestamp: Date
  details: Record<string, any>
  classification: ClassificationLevel
  success: boolean
  ipAddress?: string
  userAgent?: string
}
```

### Graph and Analysis Models
```typescript
interface KnowledgeGraphSchema {
  nodes: {
    person: PersonNodeSchema
    place: PlaceNodeSchema
    event: EventNodeSchema
    equipment: EquipmentNodeSchema
  }
  edges: {
    relationships: RelationshipEdgeSchema[]
    temporal: TemporalEdgeSchema[]
    spatial: SpatialEdgeSchema[]
  }
  security: {
    cellLevelLabels: boolean
    inheritedSecurity: boolean
    queryFiltering: boolean
  }
}

interface GraphRAGCommunity {
  communityId: string
  nodes: string[]
  edges: string[]
  summary: string
  topics: string[]
  significance: number
  lastUpdated: Date
  parentCommunity?: string
  childCommunities: string[]
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Property 1: Heterogeneous data ingestion capability
*For any* data source type (structured, semi-structured, unstructured), the platform should successfully ingest and process the data through the Bronze-Silver-Gold pipeline
**Validates: Requirements 1.1, 1.2, 1.3**

Property 2: Schema evolution without downtime
*For any* schema change in incoming data sources, the platform should handle evolution without requiring downtime or data rewrites
**Validates: Requirements 1.5**

Property 3: Cell-level security enforcement
*For any* data query, the platform should evaluate visibility labels against user authorizations at the iterator level and omit unauthorized cells
**Validates: Requirements 2.1, 2.2, 2.3**

Property 4: Partial document visibility
*For any* document with mixed classification levels, authorized users should see appropriate portions while unauthorized content remains invisible
**Validates: Requirements 2.4**

Property 5: Security fragmentation prevention
*For any* user query, all analysts should query the same tables with appropriate filtering rather than separate systems per classification
**Validates: Requirements 2.5**

Property 6: Real-time entity resolution
*For any* incoming record, the platform should perform entity resolution in real-time and automatically merge entities when new connections are discovered
**Validates: Requirements 3.1, 3.3**

Property 7: Non-obvious relationship detection
*For any* entity resolution process, the platform should identify connections using non-obvious relationships like shared phone numbers and approximate addresses
**Validates: Requirements 3.2**

Property 8: Knowledge graph security inheritance
*For any* graph operation, the distributed graph database should inherit cell-level security from the underlying Accumulo storage
**Validates: Requirements 3.4, 3.5**

Property 9: Air-gapped AI processing
*For any* AI analysis request, the platform should use local Mistral Large 2 models via vLLM without requiring external cloud API access
**Validates: Requirements 4.2**

Property 10: GraphRAG global query capability
*For any* global question about patterns or themes, the platform should synthesize answers from community summaries rather than raw text
**Validates: Requirements 4.1, 4.4**

Property 11: AI response provenance
*For any* AI-generated response, the platform should cite specific source reports and graph communities used to generate each sentence
**Validates: Requirements 4.5**

Property 12: GPU-accelerated visualization scaling
*For any* graph visualization request, the platform should render millions of nodes and edges using server-side GPU acceleration
**Validates: Requirements 5.1, 5.2**

Property 13: Air-gapped visualization deployment
*For any* visualization deployment, the platform should support on-premise, air-gapped deployment using Docker containers
**Validates: Requirements 5.4**

Property 14: Jupyter notebook integration
*For any* data scientist workflow, the platform should support PyGraphistry integration for pushing visualizations from Jupyter notebooks
**Validates: Requirements 5.3**

Property 15: Deconfliction alert generation
*For any* analyst object query, the platform should log interest and generate immediate alerts when multiple analysts query the same object
**Validates: Requirements 6.1, 6.2**

Property 16: Cryptographic deconfliction privacy
*For any* Private Set Intersection operation, the platform should use cryptographic guarantees to prevent sensitive source exposure
**Validates: Requirements 6.4**

Property 17: Blind target intersection
*For any* PSI protocol execution, the platform should reveal only targets that both teams are already aware of without exposing non-intersecting items
**Validates: Requirements 6.5**

Property 18: Dynamic object updates
*For any* new data ingestion, the platform should automatically update relevant objects and alert subscribed analysts
**Validates: Requirements 7.1**

Property 19: Data velocity-based tasking
*For any* object change, the platform should implement dynamic tasking where the system prompts analysts based on data velocity patterns
**Validates: Requirements 7.2**

Property 20: Single point of truth maintenance
*For any* object (Target X), it should exist as a single entity with all reports contributing to one node, eliminating duplication
**Validates: Requirements 7.3**

Property 21: Object history and audit trails
*For any* object update, the platform should maintain complete history and provide audit trails for all changes and analyst subscriptions
**Validates: Requirements 7.4**

Property 22: Velocity-based alert prioritization
*For any* alert generation, the platform should prioritize based on data freshness, source reliability, and analyst interest patterns
**Validates: Requirements 7.5**

Property 23: Low-side development support
*For any* software development activity, the platform should support development using synthetic or OSINT data on unclassified systems
**Validates: Requirements 8.1**

Property 24: High-side air-gapped deployment
*For any* production deployment, the platform should run on air-gapped environments processing live, sensitive data with local LLMs
**Validates: Requirements 8.2, 8.3**

Property 25: Secure code deployment
*For any* code transfer, the platform should support secure deployment from low-side development to high-side production environments
**Validates: Requirements 8.4**

Property 26: Development-production separation
*For any* security boundary, the platform should maintain strict separation between development and production data while enabling code portability
**Validates: Requirements 8.5**

Property 27: Concurrent user scaling
*For any* system load, the platform should handle 100 concurrent researchers with high-RAM nodes and GPU resources for AI inference
**Validates: Requirements 9.1, 9.2**

Property 28: High-speed network performance
*For any* distributed processing, the platform should use high-speed networking for Spark shuffle traffic and community detection algorithms
**Validates: Requirements 9.3**

Property 29: High-throughput storage
*For any* data ingestion, the platform should use fast NVMe SSDs for Accumulo Write-Ahead Logs ensuring high ingestion throughput
**Validates: Requirements 9.4**

Property 30: Performance optimization flexibility
*For any* resource constraints, the platform should support model quantization for cost efficiency while maintaining accuracy
**Validates: Requirements 9.5**

Property 31: Multi-hop relationship identification
*For any* relationship analysis, the platform should identify hidden connections across multiple hops in massive datasets
**Validates: Requirements 10.1**

Property 32: Graph database query optimization
*For any* connection query, the platform should use specialized graph database for rapid, low-latency multi-hop queries
**Validates: Requirements 10.2**

Property 33: Dual-layer data architecture
*For any* data operation, the platform should split persistence between lakehouse (bulk analytics) and graph/serving layer (real-time queries)
**Validates: Requirements 10.3, 10.4**

Property 34: Query performance optimization
*For any* performance-critical operation, the platform should optimize between bulk processing (Iceberg) and real-time serving (Accumulo/JanusGraph)
**Validates: Requirements 10.5**

## Error Handling

### Data Ingestion Errors
- **Schema evolution failures**: Graceful handling of incompatible schema changes with fallback to previous versions
- **Source unavailability**: Retry mechanisms with exponential backoff and alternative source routing
- **Data quality issues**: Quality scoring with configurable thresholds and human review triggers
- **Volume spikes**: Auto-scaling with resource monitoring and load balancing

### Security and Access Control Errors
- **Authorization failures**: Clear audit logging with security event correlation and alerting
- **Visibility label errors**: Validation with fallback to most restrictive interpretation
- **Cell-level access violations**: Immediate blocking with detailed audit trails and investigation triggers
- **Cross-compartment leakage**: Automated detection with system lockdown capabilities

### AI and Graph Processing Errors
- **LLM inference failures**: Fallback to cached responses or alternative models with degraded functionality notices
- **Graph traversal timeouts**: Query optimization with result streaming and partial result delivery
- **Community detection failures**: Fallback to simpler clustering algorithms with accuracy warnings
- **Entity resolution conflicts**: Human-in-the-loop resolution with confidence scoring and expert review

### Infrastructure and Performance Errors
- **GPU resource exhaustion**: Dynamic load balancing with queue management and priority scheduling
- **Network partition handling**: Distributed system resilience with data replication and consistency protocols
- **Storage capacity limits**: Automated data archival with intelligent tiering and compression
- **Concurrent user limits**: Resource allocation with fair queuing and performance guarantees

## Testing Strategy

### Unit Testing
Unit tests will verify individual platform components:
- Data ingestion pipeline components and transformation logic
- Security label evaluation and access control mechanisms
- Entity resolution algorithms and graph construction
- AI model integration and response processing
- Visualization rendering and user interface components

### Property-Based Testing
Property-based tests will verify universal properties using **fast-check**. Each test will run a minimum of 100 iterations.

Tests will cover:
- Data ingestion consistency across different source types and formats
- Security enforcement across different user authorization combinations
- Entity resolution accuracy across different record similarity scenarios
- Graph traversal correctness across different relationship patterns
- AI response quality across different query types and complexity levels
- Visualization performance across different graph sizes and complexity

Each property-based test will be tagged with: `**Feature: panopticon-platform, Property {number}: {property_text}**`

### Integration Testing
Integration tests will verify component interactions:
- End-to-end data flow from ingestion through analysis to visualization
- Cross-platform security enforcement and audit trail generation
- Multi-user collaboration and deconfliction scenarios
- AI model coordination and response synthesis
- Infrastructure scaling and performance under load

### Security Testing
Security tests will verify protection mechanisms:
- Cell-level access control under various authorization scenarios
- Visibility label evaluation with complex boolean expressions
- Cross-compartment isolation and leak prevention
- Audit trail completeness and tamper resistance
- Air-gapped deployment security and isolation verification

### Performance Testing
Performance tests will verify scalability requirements:
- Petabyte-scale data ingestion and processing throughput
- 100 concurrent user load with realistic usage patterns
- Million-node graph visualization and interaction responsiveness
- AI inference latency with 123B parameter models
- Real-time entity resolution with billions of records

### End-to-End Testing
E2E tests will verify complete intelligence workflows:
- Multi-source data ingestion through complete analysis pipeline
- Analyst collaboration with deconfliction across security boundaries
- Complex graph analysis with AI-powered insight generation
- Cross-platform visualization and interaction workflows
- Security incident response and audit trail reconstruction
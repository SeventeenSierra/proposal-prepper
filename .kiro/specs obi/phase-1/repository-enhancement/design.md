# Design Document

## Overview

The repository enhancement extends the existing FAR-focused Proposal Prepper repository to support dual compliance services by adding NSF grant proposal compliance alongside federal procurement compliance. The enhancement maintains the existing Federated Mesh architecture while adding Google Genkit service integration, shared component libraries, and unified development workflows.

The design preserves the existing FAR compliance infrastructure (web app + strands-agent) while adding NSF capabilities (genkit-service) through a clean service separation approach. Both services share common UI components and utilities through enhanced shared packages, enabling consistent user experience while maintaining domain-specific functionality.

## Architecture

### Enhanced Repository Structure

```
obi-one/
├── apps/
│   └── web/                    # Enhanced Next.js Web App (Port 3000)
│       ├── src/
│       │   ├── app/            # Next.js App Router
│       │   │   ├── api/        # Enhanced API routes
│       │   │   │   ├── analyze/    # Service-agnostic analysis endpoint
│       │   │   │   ├── upload/     # Enhanced upload with service detection
│       │   │   │   ├── agents/     # Multi-service agent coordination
│       │   │   │   ├── far/        # FAR-specific endpoints
│       │   │   │   └── nsf/        # NSF-specific endpoints
│       │   │   ├── far/            # FAR compliance UI (existing)
│       │   │   ├── nsf/            # NSF compliance UI (new)
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx        # Service selection interface
│       │   ├── components/         # Enhanced React Components
│       │   │   ├── shared/         # Cross-service components
│       │   │   ├── far/            # FAR-specific components
│       │   │   ├── nsf/            # NSF-specific components
│       │   │   └── selection/      # Service selection components
│       │   ├── services/           # Enhanced service layer
│       │   │   ├── FARService.ts       # FAR compliance service
│       │   │   ├── NSFService.ts       # NSF compliance service
│       │   │   ├── AgentService.ts     # Multi-agent coordination
│       │   │   └── ServiceRouter.ts   # Service selection routing
│       │   └── lib/
│       │       ├── types/           # Enhanced type definitions
│       │       ├── utils/           # Enhanced utilities
│       │       └── constants/       # Service-specific constants
│       ├── .storybook/             # Enhanced component documentation
│       ├── e2e/                    # Cross-service E2E tests
│       ├── next.config.ts
│       └── package.json
│
├── services/
│   ├── strands-agent/          # Existing Python/FastAPI Service (Port 8080)
│   │   ├── app/
│   │   │   ├── main.py         # Enhanced with service identification
│   │   │   ├── models.py       # Enhanced Pydantic models
│   │   │   ├── config.py       # Service-specific configuration
│   │   │   └── routes/
│   │   │       ├── health.py       # Enhanced health checks
│   │   │       ├── analyze.py      # FAR analysis endpoints
│   │   │       └── agents.py       # FAR agent coordination
│   │   ├── sops/               # FAR-specific SOPs
│   │   │   ├── far_agent.sop.md
│   │   │   ├── executive_order_agent.sop.md
│   │   │   └── technical_agent.sop.md
│   │   ├── tests/              # FAR-specific tests
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   └── genkit-service/         # New Node.js/Genkit Service (Port 8081)
│       ├── src/
│       │   ├── index.ts        # Genkit application entry point
│       │   ├── config.ts       # Service configuration
│       │   ├── flows/          # Genkit flows
│       │   │   ├── document-extraction.ts
│       │   │   ├── nsf-analysis.ts
│       │   │   └── section-validation.ts
│       │   ├── agents/         # NSF agent implementations
│       │   │   ├── nsf-agent.ts
│       │   │   └── technical-agent.ts
│       │   └── routes/         # Express routes
│       │       ├── health.ts
│       │       ├── analyze.ts
│       │       └── agents.ts
│       ├── tests/              # NSF-specific tests
│       ├── Dockerfile
│       ├── package.json
│       └── tsconfig.json
│
├── packages/                   # Enhanced shared packages
│   ├── ui/                     # @obi-one/ui - Enhanced components
│   │   ├── src/
│   │   │   ├── components/     # Cross-service UI components
│   │   │   │   ├── shared/         # Common components
│   │   │   │   ├── far/            # FAR-specific components
│   │   │   │   ├── nsf/            # NSF-specific components
│   │   │   │   └── selection/      # Service selection components
│   │   │   ├── hooks/          # Enhanced React hooks
│   │   │   ├── utils/          # UI utilities
│   │   │   └── types/          # UI type definitions
│   │   ├── .storybook/         # Component documentation
│   │   └── package.json
│   │
│   └── lib/                    # @obi-one/lib - Enhanced utilities
│       ├── src/
│       │   ├── types/          # Cross-service type definitions
│       │   │   ├── common.ts       # Shared types
│       │   │   ├── far.ts          # FAR-specific types
│       │   │   └── nsf.ts          # NSF-specific types
│       │   ├── utils/          # Enhanced utility functions
│       │   │   ├── common.ts       # Shared utilities
│       │   │   ├── far.ts          # FAR-specific utilities
│       │   │   └── nsf.ts          # NSF-specific utilities
│       │   └── constants/      # Enhanced constants
│       │       ├── far.ts          # FAR constants
│       │       └── nsf.ts          # NSF constants
│       └── package.json
│
├── data/
│   └── seed/                   # Enhanced seed data
│       ├── README.md           # Cross-service dataset documentation
│       ├── far/                # Federal procurement proposals (existing)
│       │   ├── README.md       # FAR dataset documentation
│       │   ├── proposal-1/     # Sample FAR proposal set
│       │   └── proposal-2/     # Sample FAR proposal set
│       └── nsf/                # NSF grant proposals (new)
│           ├── README.md       # NSF dataset documentation
│           ├── grant-1/        # Sample NSF proposal set
│           │   ├── solicitation.pdf
│           │   ├── proposal.pdf
│           │   └── expected-results.json
│           └── grant-2/        # Sample NSF proposal set
│               ├── solicitation.pdf
│               ├── proposal.pdf
│               └── expected-results.json
│
├── docker-compose.yml          # Enhanced orchestration (3 services)
├── railway.toml               # Enhanced Railway deployment
└── pnpm-workspace.yaml        # Enhanced workspace configuration
```

## Components and Interfaces

### Enhanced Workspace Configuration

#### pnpm-workspace.yaml
```yaml
packages:
  - "apps/*"
  - "services/*"
  - "packages/*"
```

#### Root package.json Scripts
```json
{
  "scripts": {
    "dev": "concurrently \"pnpm --filter=web dev\" \"pnpm --filter=strands-agent dev\" \"pnpm --filter=genkit-service dev\"",
    "build": "pnpm --filter=web build && pnpm --filter=strands-agent build && pnpm --filter=genkit-service build",
    "test": "pnpm --recursive test",
    "test:web": "pnpm --filter=web test",
    "test:strands": "pnpm --filter=strands-agent test",
    "test:genkit": "pnpm --filter=genkit-service test",
    "test:integration": "pnpm --filter=web test:integration",
    "lint": "pnpm --recursive lint",
    "format": "pnpm --recursive format",
    "typecheck": "pnpm --recursive typecheck",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "docker:logs": "docker-compose logs -f",
    "clean": "pnpm --recursive clean"
  }
}
```

### Service Dependencies

#### Web App Dependencies (apps/web/package.json)
```json
{
  "dependencies": {
    "@obi-one/ui": "workspace:*",
    "@obi-one/lib": "workspace:*",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "typescript": "^5.0.0"
  }
}
```

#### Genkit Service Dependencies (services/genkit-service/package.json)
```json
{
  "dependencies": {
    "@genkit-ai/ai": "^0.5.0",
    "@genkit-ai/googleai": "^0.5.0",
    "@obi-one/lib": "workspace:*",
    "express": "^4.18.0",
    "typescript": "^5.0.0",
    "zod": "^3.22.0"
  }
}
```

### Enhanced Docker Compose Configuration

```yaml
version: '3.8'
services:
  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - STRANDS_AGENT_URL=http://strands-service:8080
      - GENKIT_SERVICE_URL=http://genkit-service:8081
      - NODE_ENV=development
    volumes:
      - ./apps/web:/app/apps/web
      - ./packages:/app/packages
    depends_on:
      - strands-service
      - genkit-service
    networks:
      - dual-compliance

  strands-service:
    build:
      context: ./services/strands-agent
    ports:
      - "8080:8080"
    environment:
      - AWS_REGION=${AWS_REGION:-us-east-1}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
      - BEDROCK_MODEL_ID_CLAUDE=${BEDROCK_MODEL_ID_CLAUDE:-anthropic.claude-3-5-sonnet-20241022-v2:0}
      - BEDROCK_MODEL_ID_NOVA=${BEDROCK_MODEL_ID_NOVA:-amazon.nova-pro-v1:0}
      - SERVICE_TYPE=far
    volumes:
      - ./services/strands-agent/app:/code/app
      - ./services/strands-agent/sops:/code/sops
      - ./services/strands-agent/tests:/code/tests
    networks:
      - dual-compliance
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  genkit-service:
    build:
      context: ./services/genkit-service
    ports:
      - "8081:8081"
    environment:
      - GOOGLE_API_KEY=${GOOGLE_API_KEY}
      - GEMINI_MODEL_ID=${GEMINI_MODEL_ID:-gemini-1.5-pro}
      - NODE_ENV=development
      - SERVICE_TYPE=nsf
    volumes:
      - ./services/genkit-service/src:/app/src
      - ./services/genkit-service/tests:/app/tests
    networks:
      - dual-compliance
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8081/health"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  dual-compliance:
    driver: bridge
```

## Data Models

### Service Configuration
```typescript
interface ServiceConfig {
  name: string
  type: 'far' | 'nsf'
  port: number
  healthCheckPath: string
  environment: Record<string, string>
  dependencies: string[]
  capabilities: string[]
}

const SERVICE_CONFIGS: ServiceConfig[] = [
  {
    name: 'strands-agent',
    type: 'far',
    port: 8080,
    healthCheckPath: '/health',
    environment: {
      AWS_REGION: 'us-east-1',
      SERVICE_TYPE: 'far'
    },
    dependencies: ['aws-bedrock'],
    capabilities: ['far_compliance', 'executive_orders', 'technical_analysis']
  },
  {
    name: 'genkit-service',
    type: 'nsf',
    port: 8081,
    healthCheckPath: '/health',
    environment: {
      SERVICE_TYPE: 'nsf'
    },
    dependencies: ['google-genkit'],
    capabilities: ['nsf_compliance', 'document_extraction', 'technical_analysis']
  }
]
```

### Enhanced Package Configuration
```typescript
interface PackageConfig {
  name: string
  type: 'ui' | 'lib'
  supportedServices: ('far' | 'nsf')[]
  peerDependencies: string[]
  exports: string[]
}

const PACKAGE_CONFIGS: PackageConfig[] = [
  {
    name: '@obi-one/ui',
    type: 'ui',
    supportedServices: ['far', 'nsf'],
    peerDependencies: ['react', 'react-dom'],
    exports: ['components', 'hooks', 'utils']
  },
  {
    name: '@obi-one/lib',
    type: 'lib',
    supportedServices: ['far', 'nsf'],
    peerDependencies: [],
    exports: ['types', 'utils', 'constants']
  }
]
```

### Seed Data Organization
```typescript
interface SeedDataset {
  service: 'far' | 'nsf'
  name: string
  description: string
  files: SeedFile[]
  expectedOutcomes: ExpectedOutcome[]
}

interface SeedFile {
  name: string
  type: 'solicitation' | 'proposal' | 'results'
  format: 'pdf' | 'json'
  path: string
}

interface ExpectedOutcome {
  metric: string
  value: string | number
  description: string
}

const SEED_DATASETS: SeedDataset[] = [
  {
    service: 'far',
    name: 'Federal Procurement Proposal 1',
    description: 'Sample federal vendor proposal with known compliance issues',
    files: [
      { name: 'solicitation.pdf', type: 'solicitation', format: 'pdf', path: 'data/seed/far/proposal-1/solicitation.pdf' },
      { name: 'proposal.pdf', type: 'proposal', format: 'pdf', path: 'data/seed/far/proposal-1/proposal.pdf' },
      { name: 'expected-results.json', type: 'results', format: 'json', path: 'data/seed/far/proposal-1/expected-results.json' }
    ],
    expectedOutcomes: [
      { metric: 'compliance_score', value: 75, description: 'Overall compliance percentage' },
      { metric: 'critical_issues', value: 2, description: 'Number of non-waivable violations' }
    ]
  },
  {
    service: 'nsf',
    name: 'NSF Grant Proposal 1',
    description: 'Sample NSF grant proposal from grant-trace AATB dataset',
    files: [
      { name: 'solicitation.pdf', type: 'solicitation', format: 'pdf', path: 'data/seed/nsf/grant-1/solicitation.pdf' },
      { name: 'proposal.pdf', type: 'proposal', format: 'pdf', path: 'data/seed/nsf/grant-1/proposal.pdf' },
      { name: 'expected-results.json', type: 'results', format: 'json', path: 'data/seed/nsf/grant-1/expected-results.json' }
    ],
    expectedOutcomes: [
      { metric: 'compliance_score', value: 90, description: 'Overall PAPPG compliance percentage' },
      { metric: 'page_violations', value: 1, description: 'Number of page limit violations' }
    ]
  }
]
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Property 1: Service directory separation
*For any* repository enhancement, NSF-specific directories should be added without modifying existing FAR infrastructure
**Validates: Requirements 1.1**

Property 2: Workspace inclusion consistency
*For any* workspace configuration update, the genkit-service should be included in pnpm workspace and build scripts
**Validates: Requirements 1.4**

Property 3: Service independence
*For any* service implementation, FAR (strands-agent) and NSF (genkit-service) should maintain clear separation without direct dependencies
**Validates: Requirements 1.3**

Property 4: Shared package usage
*For any* functionality that appears in multiple services, it should be implemented in shared packages rather than duplicated
**Validates: Requirements 1.5**

Property 5: Request routing consistency
*For any* service request, FAR requests should route to strands-agent and NSF requests should route to genkit-service
**Validates: Requirements 2.1**

Property 6: Independent deployment capability
*For any* service, it should be able to be built and deployed independently without requiring other services
**Validates: Requirements 2.2**

Property 7: Docker orchestration completeness
*For any* local development setup, Docker Compose should successfully start and orchestrate web, strands-agent, and genkit-service
**Validates: Requirements 3.1**

Property 8: Service communication reliability
*For any* service interaction, all services should be able to communicate through proper networking and health checks
**Validates: Requirements 3.2, 3.5**

Property 9: Shared package enhancement
*For any* shared package (@obi-one/ui, @obi-one/lib), it should contain components and utilities that support both FAR and NSF domains
**Validates: Requirements 4.1, 4.2**

Property 10: Seed data organization consistency
*For any* seed data structure, both FAR and NSF datasets should follow consistent organizational patterns
**Validates: Requirements 5.4**

## Error Handling

### Service Integration Errors
- **Service startup conflicts**: Detect and resolve port conflicts between services
- **Dependency resolution failures**: Handle workspace dependency conflicts gracefully
- **Configuration mismatches**: Validate service-specific environment variables
- **Network communication failures**: Implement proper retry and fallback mechanisms

### Development Workflow Errors
- **Hot reloading failures**: Ensure file watching works across all services
- **Build process conflicts**: Handle concurrent builds and dependency resolution
- **Test execution conflicts**: Isolate test environments to prevent interference
- **Docker orchestration failures**: Provide clear error messages and recovery steps

## Testing Strategy

### Unit Testing
Unit tests will verify individual enhancement components:
- Service directory creation and organization
- Workspace configuration updates and validation
- Shared package functionality across both domains
- Docker Compose configuration and networking
- Seed data organization and validation

### Property-Based Testing
Property-based tests will verify universal properties using **fast-check**. Each test will run a minimum of 100 iterations.

Tests will cover:
- Service separation consistency across different configurations
- Workspace dependency resolution across various package combinations
- Docker orchestration reliability under different startup sequences
- Shared package compatibility across both FAR and NSF usage patterns
- Seed data organization consistency across different dataset structures

Each property-based test will be tagged with: `**Feature: repository-enhancement, Property {number}: {property_text}**`

### Integration Testing
Integration tests will verify cross-service interactions:
- End-to-end service communication between web, strands-agent, and genkit-service
- Workspace build and dependency resolution across all packages
- Docker Compose orchestration with all services running
- Shared package usage across both FAR and NSF workflows
- Seed data loading and validation for both compliance domains

### End-to-End Testing
E2E tests will verify complete dual-service workflows:
- Service selection and routing to appropriate compliance domains
- Cross-service agent coordination and response handling
- Shared component usage across both FAR and NSF interfaces
- Independent service deployment and scaling
- Complete development workflow from setup to testing
# Design Document

## Overview

The infrastructure enhancement extends the existing AWS-based FAR compliance infrastructure to support dual compliance services by adding Google Genkit integration for NSF grant proposal analysis. The enhancement maintains the existing Federated Mesh architecture while adding cross-platform AI orchestration, enhanced regulatory data management, and unified monitoring across both AWS Bedrock and Google Genkit services.

The design preserves the existing FAR infrastructure (web app + strands-agent + AWS Bedrock) while adding NSF capabilities (genkit-service + Google Genkit) through a clean service separation approach. Both services share common infrastructure patterns while maintaining platform-specific optimizations and security requirements.

## Architecture

### Enhanced Infrastructure Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                   Railway.app / AWS GovCloud Deployment              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────┐         ┌────────────────────────────┐   │
│  │   Web App (Next.js)  │────────▶│  Strands Agent Service     │   │
│  │   Port: 3000         │  HTTP   │  (Python/FastAPI)          │   │
│  │                      │         │  Port: 8080                │   │
│  │  - Service Selection │         │                            │   │
│  │  - FAR Compliance UI │         │  - AWS Bedrock Integration │   │
│  │  - NSF Compliance UI │         │  - Claude 3.7 & Nova Pro   │   │
│  │  - Cross-Platform    │         │  - FAR Agent               │   │
│  │    Orchestration     │         │  - Executive Order Agent   │   │
│  │  - Dual Analysis     │         │  - Technical Agent         │   │
│  │  - Unified Results   │         │                            │   │
│  └──────────┬───────────┘         └────────────────────────────┘   │
│             │                                                        │
│             │                     ┌────────────────────────────┐   │
│             └────────────────────▶│  Genkit Service            │   │
│                            HTTP   │  (Node.js/Google Genkit)   │   │
│                                   │  Port: 8081                │   │
│                                   │                            │   │
│                                   │  - Google Genkit Flows     │   │
│                                   │  - Gemini 1.5 Pro          │   │
│                                   │  - NSF Agent               │   │
│                                   │  - Document Extraction     │   │
│                                   │  - Section Validation      │   │
│                                   └────────────────────────────┘   │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    AWS Infrastructure                         │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │   │
│  │  │ S3 Buckets      │  │ OpenSearch      │  │ Lambda       │ │   │
│  │  │ - FAR Documents │  │ Vector Database │  │ Functions    │ │   │
│  │  │ - DFARS Supp    │  │ - FAR Index     │  │ - FAR/DFARS  │ │   │
│  │  │ - Executive     │  │ - NSF Index     │  │   Crawling   │ │   │
│  │  │   Orders        │  │ - Embeddings    │  │ - NSF PAPPG  │ │   │
│  │  │ - NSF PAPPG     │  │ - Similarity    │  │   Updates    │ │   │
│  │  └─────────────────┘  └─────────────────┘  └──────────────┘ │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                  Google Cloud Integration                     │   │
│  │  ┌─────────────────┐  ┌─────────────────┐                   │   │
│  │  │ Vertex AI       │  │ Cloud Storage   │                   │   │
│  │  │ - Gemini 1.5    │  │ - NSF Documents │                   │   │
│  │  │   Pro           │  │ - Processing    │                   │   │
│  │  │ - Embeddings    │  │   Cache         │                   │   │
│  │  └─────────────────┘  └─────────────────┘                   │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Cross-Platform Service Communication Flow

```
User → Service Selection → Next.js Web App
                              ↓
                    Route Based on Compliance Domain
                              ↓
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   FAR Compliance        NSF Compliance      Shared Processing
   (AWS Bedrock)         (Google Genkit)     (Both Platforms)
        │                     │                     │
        ▼                     ▼                     ▼
   Strands Service       Genkit Service      Cross-Platform
   - FAR Agent           - NSF Agent         Orchestration
   - EO Agent            - Document Flows    - Unified API
   - Technical Agent     - Section Analysis  - Response Merge
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
                    Unified Results Display
                    - Platform Attribution
                    - Consistent Formatting
                    - Cross-Service Validation
```

## Components and Interfaces

### Enhanced Container Platform

#### Genkit Service Container (services/genkit-service/Dockerfile)
```dockerfile
# Multi-stage build for Node.js/TypeScript with Google AI SDK
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

# Install Google AI SDK and Genkit dependencies
RUN npm install @genkit-ai/ai @genkit-ai/googleai

EXPOSE 8081

# Health check for service monitoring
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8081/health || exit 1

CMD ["node", "dist/index.js"]
```

### Enhanced Development Environment

#### Enhanced Docker Compose Configuration
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
      - S3_BUCKET_FAR_DOCS=${S3_BUCKET_FAR_DOCS}
      - S3_BUCKET_EXECUTIVE_ORDERS=${S3_BUCKET_EXECUTIVE_ORDERS}
      - OPENSEARCH_ENDPOINT=${OPENSEARCH_ENDPOINT}
      - SERVICE_TYPE=far
    volumes:
      - ./services/strands-agent/app:/code/app
      - ./services/strands-agent/sops:/code/sops
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
      - GOOGLE_CLOUD_PROJECT=${GOOGLE_CLOUD_PROJECT}
      - GOOGLE_CLOUD_STORAGE_BUCKET=${GOOGLE_CLOUD_STORAGE_BUCKET}
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

### Enhanced Production Deployment

#### Enhanced Railway Configuration (railway.toml)
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "pnpm start"
healthcheckPath = "/api/health"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"

[[services]]
name = "web"
source = "apps/web"
variables = [
  "STRANDS_AGENT_URL",
  "GENKIT_SERVICE_URL"
]

[[services]]
name = "strands-agent"
source = "services/strands-agent"
variables = [
  "AWS_REGION",
  "AWS_ACCESS_KEY_ID", 
  "AWS_SECRET_ACCESS_KEY",
  "BEDROCK_MODEL_ID_CLAUDE",
  "BEDROCK_MODEL_ID_NOVA",
  "S3_BUCKET_FAR_DOCS",
  "S3_BUCKET_EXECUTIVE_ORDERS",
  "OPENSEARCH_ENDPOINT"
]

[[services]]
name = "genkit-service"
source = "services/genkit-service"
variables = [
  "GOOGLE_API_KEY",
  "GEMINI_MODEL_ID",
  "GOOGLE_CLOUD_PROJECT",
  "GOOGLE_CLOUD_STORAGE_BUCKET"
]
```

### Enhanced AWS Infrastructure Integration

#### Enhanced S3 Bucket Configuration
```typescript
interface EnhancedRegulatoryDataBuckets {
  farDocuments: {
    bucketName: string // "obi-one-far-docs"
    region: string     // "us-east-1"
    versioning: boolean // true
  }
  executiveOrders: {
    bucketName: string // "obi-one-executive-orders"
    region: string     // "us-east-1"
    versioning: boolean // true
  }
  nsfPappg: {
    bucketName: string // "obi-one-nsf-pappg"
    region: string     // "us-east-1"
    versioning: boolean // true
  }
}
```

#### Enhanced Lambda Functions for Cross-Platform Updates
```python
# Enhanced AWS Lambda function for multi-domain regulatory updates
import boto3
import requests
from datetime import datetime

def lambda_handler(event, context):
    """
    Crawl regulatory sources for both FAR/DFARS and NSF PAPPG updates
    Store in appropriate S3 buckets with version control
    """
    s3 = boto3.client('s3')
    
    # Crawl FAR/DFARS sources
    far_updates = crawl_sam_gov()
    dfars_updates = crawl_federal_register()
    
    # Crawl NSF PAPPG sources
    nsf_updates = crawl_nsf_research_gov()
    
    timestamp = datetime.utcnow().isoformat()
    
    # Store FAR/DFARS updates
    for update in far_updates + dfars_updates:
        bucket = 'obi-one-far-docs' if 'FAR' in update['type'] else 'obi-one-executive-orders'
        s3.put_object(
            Bucket=bucket,
            Key=f'{update["type"].lower()}/{timestamp}/{update["id"]}.json',
            Body=json.dumps(update),
            Metadata={'as-of-date': timestamp, 'source': update['source']}
        )
    
    # Store NSF PAPPG updates
    for update in nsf_updates:
        s3.put_object(
            Bucket='obi-one-nsf-pappg',
            Key=f'pappg/{timestamp}/{update["id"]}.json',
            Body=json.dumps(update),
            Metadata={'as-of-date': timestamp, 'source': 'nsf-research-gov'}
        )
    
    return {
        'statusCode': 200,
        'far_updates': len(far_updates + dfars_updates),
        'nsf_updates': len(nsf_updates)
    }

def crawl_nsf_research_gov():
    """Crawl NSF Research.gov for PAPPG updates"""
    # Implementation for NSF PAPPG crawling
    pass
```

#### Enhanced OpenSearch Configuration
```typescript
interface EnhancedVectorDatabaseConfig {
  endpoint: string // AWS OpenSearch endpoint
  indices: {
    farRegulations: string    // "far-regulations-index"
    executiveOrders: string   // "executive-orders-index"
    nsfPappg: string         // "nsf-pappg-index"
  }
  embedding: {
    awsModel: string    // "amazon.titan-embed-text-v1"
    googleModel: string // "textembedding-gecko@003"
    dimensions: number  // 1536
  }
  crossPlatformSearch: {
    enabled: boolean
    unifiedResultFormat: boolean
    platformAttribution: boolean
  }
}
```

### Google Cloud Integration

#### Google Genkit Service Configuration
```typescript
interface GenkitServiceConfig {
  models: {
    primary: string    // "gemini-1.5-pro"
    embedding: string  // "textembedding-gecko@003"
  }
  flows: {
    documentExtraction: string
    nsfAnalysis: string
    sectionValidation: string
  }
  storage: {
    bucket: string     // Google Cloud Storage bucket
    cacheEnabled: boolean
    cacheTTL: number   // Cache time-to-live in seconds
  }
  rateLimiting: {
    requestsPerMinute: number
    burstLimit: number
  }
}

const GENKIT_CONFIG: GenkitServiceConfig = {
  models: {
    primary: "gemini-1.5-pro",
    embedding: "textembedding-gecko@003"
  },
  flows: {
    documentExtraction: "extract-nsf-document",
    nsfAnalysis: "analyze-nsf-compliance", 
    sectionValidation: "validate-nsf-sections"
  },
  storage: {
    bucket: process.env.GOOGLE_CLOUD_STORAGE_BUCKET || "obi-one-nsf",
    cacheEnabled: true,
    cacheTTL: 3600
  },
  rateLimiting: {
    requestsPerMinute: 60,
    burstLimit: 10
  }
}
```

## Data Models

### Cross-Platform Service Configuration
```typescript
interface CrossPlatformServiceConfig {
  name: string
  platform: 'aws' | 'google'
  type: 'far' | 'nsf'
  port: number
  healthCheckPath: string
  environment: Record<string, string>
  dependencies: string[]
  capabilities: string[]
  scaling: {
    minInstances: number
    maxInstances: number
    targetCPU: number
  }
}

const ENHANCED_SERVICE_CONFIGS: CrossPlatformServiceConfig[] = [
  {
    name: 'strands-agent',
    platform: 'aws',
    type: 'far',
    port: 8080,
    healthCheckPath: '/health',
    environment: {
      AWS_REGION: 'us-east-1',
      SERVICE_TYPE: 'far'
    },
    dependencies: ['aws-bedrock', 'opensearch'],
    capabilities: ['far_compliance', 'executive_orders', 'technical_analysis'],
    scaling: { minInstances: 1, maxInstances: 5, targetCPU: 70 }
  },
  {
    name: 'genkit-service',
    platform: 'google',
    type: 'nsf',
    port: 8081,
    healthCheckPath: '/health',
    environment: {
      SERVICE_TYPE: 'nsf'
    },
    dependencies: ['google-genkit', 'vertex-ai'],
    capabilities: ['nsf_compliance', 'document_extraction', 'section_validation'],
    scaling: { minInstances: 1, maxInstances: 3, targetCPU: 80 }
  }
]
```

### Enhanced Regulatory Data Model
```typescript
interface EnhancedRegulatoryDocument {
  id: string
  type: 'FAR' | 'DFARS' | 'EXECUTIVE_ORDER' | 'NSF_PAPPG'
  platform: 'aws' | 'google' | 'both'
  version: string
  effectiveDate: Date
  asOfDate: Date
  source: string
  content: string
  sections: RegulatorySection[]
  embeddings?: {
    aws?: number[]      // AWS Titan embeddings
    google?: number[]   // Google embeddings
  }
  processingMetadata: {
    awsProcessed: boolean
    googleProcessed: boolean
    lastSyncDate: Date
  }
}
```

### Cross-Platform Monitoring Configuration
```typescript
interface CrossPlatformMonitoringConfig {
  services: {
    web: ServiceMonitoring
    strandsAgent: ServiceMonitoring
    genkitService: ServiceMonitoring
  }
  platforms: {
    aws: PlatformMonitoring
    google: PlatformMonitoring
  }
  alerts: AlertConfiguration[]
}

interface ServiceMonitoring {
  healthCheck: {
    endpoint: string
    interval: number
    timeout: number
    retries: number
  }
  metrics: {
    responseTime: boolean
    errorRate: boolean
    throughput: boolean
    resourceUsage: boolean
  }
  logging: {
    level: string
    centralized: boolean
    retention: number
  }
}

interface PlatformMonitoring {
  name: 'aws' | 'google'
  apiMetrics: boolean
  costTracking: boolean
  rateLimitMonitoring: boolean
  serviceHealth: boolean
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Property 1: Genkit service containerization
*For any* Genkit service deployment, it should use optimized multi-stage Docker builds with Google AI SDK integration
**Validates: Requirements 1.1, 1.2**

Property 2: Cross-platform orchestration consistency
*For any* AI service request, FAR requests should route to AWS Bedrock and NSF requests should route to Google Genkit with unified response formatting
**Validates: Requirements 4.1, 4.3**

Property 3: Independent service scaling
*For any* production deployment, web, strands-agent, and genkit-service should support independent scaling policies
**Validates: Requirements 1.4, 3.2**

Property 4: Enhanced Docker Compose orchestration
*For any* local development setup, Docker Compose should successfully start and orchestrate all three services with proper networking
**Validates: Requirements 2.1, 2.5**

Property 5: Regulatory data enhancement
*For any* regulatory data storage, the system should support both FAR/DFARS and NSF PAPPG documents with proper versioning and timestamps
**Validates: Requirements 5.1, 5.2**

Property 6: Google AI integration
*For any* NSF compliance analysis, the system should use Google Genkit with Gemini 1.5 Pro for document processing and compliance checking
**Validates: Requirements 6.1, 6.2, 6.3**

Property 7: Cross-platform monitoring
*For any* service monitoring, health checks and logging should be provided for all services across both AWS and Google platforms
**Validates: Requirements 7.1, 7.3**

Property 8: Service communication reliability
*For any* cross-service communication, proper error handling and fallback mechanisms should be implemented for both AWS and Google services
**Validates: Requirements 4.4**

Property 9: Environment configuration flexibility
*For any* service deployment, both Genkit and Strands services should support environment-specific configuration through environment variables
**Validates: Requirements 1.3, 3.5**

Property 10: Enhanced search capabilities
*For any* document search, OpenSearch indexing should include both FAR/DFARS and NSF PAPPG content with cross-platform search support
**Validates: Requirements 5.3**

## Error Handling

### Cross-Platform Integration Errors
- **Service communication failures**: Implement circuit breakers and fallback mechanisms between AWS and Google services
- **API rate limiting**: Handle rate limits for both AWS Bedrock and Google Genkit with proper backoff strategies
- **Authentication failures**: Manage API key rotation and validation for both platforms
- **Model unavailability**: Provide graceful degradation when specific AI models are unavailable

### Enhanced Deployment Errors
- **Container orchestration failures**: Handle startup dependencies and health check failures across three services
- **Network configuration conflicts**: Resolve port conflicts and service discovery issues
- **Environment variable mismatches**: Validate platform-specific environment variables
- **Scaling conflicts**: Handle independent scaling policies without resource conflicts

### Regulatory Data Management Errors
- **Cross-platform sync failures**: Handle synchronization issues between AWS S3 and Google Cloud Storage
- **Version conflicts**: Resolve conflicts when regulatory data is updated from multiple sources
- **Search index inconsistencies**: Maintain consistency between AWS OpenSearch and Google search capabilities
- **Update mechanism failures**: Provide fallback when automated regulatory updates fail

## Testing Strategy

### Unit Testing
Unit tests will verify individual enhancement components:
- Genkit service containerization and configuration
- Cross-platform AI service integration
- Enhanced regulatory data management
- Service orchestration and communication
- Monitoring and health check implementations

### Property-Based Testing
Property-based tests will verify universal properties using **fast-check**. Each test will run a minimum of 100 iterations.

Tests will cover:
- Cross-platform service routing consistency across different request types
- Container orchestration reliability under various startup sequences
- Regulatory data synchronization across AWS and Google platforms
- Service scaling behavior under different load conditions
- API response formatting consistency across both AI platforms

Each property-based test will be tagged with: `**Feature: infrastructure-enhancement, Property {number}: {property_text}**`

### Integration Testing
Integration tests will verify cross-platform interactions:
- End-to-end service communication between all three services
- AWS Bedrock and Google Genkit integration through unified API
- Enhanced regulatory data storage and retrieval across platforms
- Cross-platform monitoring and alerting systems
- Independent service deployment and scaling verification

### End-to-End Testing
E2E tests will verify complete dual-platform workflows:
- Deploy entire enhanced system to Railway with all three services
- Verify cross-platform AI service orchestration and response handling
- Test enhanced regulatory data updates and processing across platforms
- Verify monitoring and alerting across both AWS and Google services
- Test independent scaling and failover mechanisms
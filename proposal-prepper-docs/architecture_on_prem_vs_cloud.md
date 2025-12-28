# Architecture: Strands Service Duality (Local vs. Cloud)

The `strands` service is the "Analysis Engine" of the Proposal Prepper application. It is designed with a **Unified Codebase** that adapts its behavior based on the environment it's running in.

## High-Level Architecture

```mermaid
graph TD
    subgraph "Application Layer"
        WEB["Web UI / Desktop App<br/>(Next.js)"]
    end

    subgraph "Platform / SDK Layer (The Gateway)"
        ROUTER["AI Router / Adapter"]
        
        subgraph "Pluggable Cloud/Local SDKs"
            LOCAL_SDK["Local Mode<br/>(Open Source: LiteLLM/LangGraph)"]
            AWS_SDK["AWS Mode<br/>(Strands SDK)"]
            GCP_SDK["Google Mode<br/>(Vertex AI SDK)"]
            AZURE_SDK["Azure Mode<br/>(Semantic Kernel)"]
        end
        
        ROUTER --> LOCAL_SDK
        ROUTER -.-> AWS_SDK
        ROUTER -.-> GCP_SDK
        ROUTER -.-> AZURE_SDK
    end

    subgraph "Agents Layer (Cross-Platform Logic)"
        FAR_AGENT["FAR Agent"]
        EO_AGENT["EO Agent"]
        TECH_AGENT["Tech Agent"]
        
        LOCAL_SDK --> FAR_AGENT
        LOCAL_SDK --> EO_AGENT
        LOCAL_SDK --> TECH_AGENT
    end

    subgraph "Data & Resource Layer"
        MINIO[("MinIO / S3")]
        OS_LOCAL[("OpenSearch / Vector Storage")]
        DB[("Postgres DB")]
    end

    FAR_AGENT --> MINIO
    EO_AGENT --> OS_LOCAL
    TECH_AGENT --> DB

    classDef current fill:#d1e7dd,stroke:#0f5132,stroke-width:2px;
    classDef future fill:#e9ecef,stroke:#6c757d,stroke-dasharray: 5 5;
    classDef infra fill:#f9f,stroke:#333;
    
    class LOCAL_SDK,FAR_AGENT,EO_AGENT,TECH_AGENT current;
    class AWS_SDK,GCP_SDK,AZURE_SDK future;
    class MINIO,OS_LOCAL,DB infra;
```

## The Multi-Cloud "Pluggable" Strategy

Our architecture is designed so that the **Agents** (FAR, EO, Tech) are independent of the cloud provider. We use a **Platform / SDK Layer** to bridge the gap.

### 1. Local / Demo Phase (Current)
Locally, we use **LiteLLM + LangGraph** as our open-source equivalent to the Strands SDK.
- **LiteLLM**: Provides a unified API to talk to local models (like Llama/Mistral) or mock providers.
- **LangGraph**: Orchestrates the agents (FAR/EO) just like Strands would in the cloud.
- **Local Infra**: MinIO and OpenSearch containers provide the S3 and Vector storage equivalents.

### 2. AWS / Strands Phase (Future)
When we switch to AWS, we swap the `LOCAL_SDK` for the `AWS_SDK (Strands)`. 
- The **Agents** remains exactly the same.
- We point the storage and vector connections to real AWS S3 and Managed OpenSearch.

### 3. Google & Microsoft Phase (Future)
By using this "Adapter" pattern, we can easily add:
- **Google Cloud**: Using Vertex AI and Cloud Storage.
- **Azure**: Using Azure OpenAI and Azure AI Search.

## Why this makes sense for the Demo

This approach proves that our application is **Cloud-Agnostic**. 
- For the demo, we show everything running on the desktop using the **Open Source Stack**.
- We point out that by simply flipping a configuration switch, the exact same Agents will start talking through the **Strands SDK** on AWS, or **Vertex AI** on Google Cloud.

> [!TIP]
> This design ensures no vendor lock-in. We are building the "Agents" (the value), and treating the "Cloud Platform" as a swappable resource.

## Environment Breakdown

| Component | Local / Demo Environment | Production (AWS) Environment |
| :--- | :--- | :--- |
| **Logic** | `strands` Container (Same Code) | `strands` on ECS/Lambda (Same Code) |
| **Database** | Postgres Container | AWS RDS (Postgres) |
| **Storage** | MinIO Container | AWS S3 Bucket |
| **Vector Search** | OpenSearch Container | AWS OpenSearch Service |
| **AI Analysis** | `fallback_analysis.py` | AWS Bedrock (Claude 3) |

> [!IMPORTANT]
> This "Environment Duality" ensures that 100% of the code you test locally is the same code that will run in production. The only difference is where the service endpoints point to.
鼓

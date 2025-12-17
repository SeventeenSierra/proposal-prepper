# Proposal Prepper (Refactored)

This repository contains the refactored **Proposal Prepper (CtrlCheck)** application, now split into microservices for better modularity and scalability.

## 🏗️ Components

| Component | Directory | Description |
| :--- | :--- | :--- |
| **Frontend** | [`proposal-prepper-web/`](./proposal-prepper-web) | Next.js 14+ application logic and UI. |
| **Backend** | [`proposal-prepper-backend/`](./proposal-prepper-backend) | Python/FastAPI service for Strands agents. |
| **Middleware** | [`proposal-prepper-middleware/`](./proposal-prepper-middleware) | "Traffic Cop" service (Node.js/Express). |
| **Infrastructure** | [`proposal-prepper-infra/`](./proposal-prepper-infra) | Docker orchestration, database init, and build scripts. |
| **Shared Lib** | [`proposal-prepper-services/`](./proposal-prepper-services) | Shared TypeScript business logic and API clients. |
| **Tests** | [`proposal-prepper-tests/`](./proposal-prepper-tests) | End-to-End (Playwright) tests and Storybook. |
| **Docs** | [`proposal-prepper-docs/`](./proposal-prepper-docs) | Documentation, Policy, and Product Management. |

## 🚀 Quick Start

To run the entire system locally:

```bash
cd proposal-prepper-infra/containers
./start.sh
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080

## 📂 Documentation

Access full documentation in the [`proposal-prepper-docs`](./proposal-prepper-docs) folder:

- [Governance & Policy](./proposal-prepper-docs/governance)
- [Developer Guides](./proposal-prepper-docs/guides)
- [Architecture](./proposal-prepper-docs/architecture)
- [Project Management](./proposal-prepper-docs/project-management)

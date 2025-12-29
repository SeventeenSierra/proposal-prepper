# Proposal Prepper (Refactored)

This repository contains the refactored **Proposal Prepper (CtrlCheck)** application, now split into microservices for better modularity and scalability.

## 🏗️ Components

| Component | Directory | Description |
| :--- | :--- | :--- |
| **Frontend** | [`proposal-prepper-web/`](./proposal-prepper-web) | Next.js 14+ application logic and UI. |
| **Backend** | [`proposal-prepper-backend/`](./proposal-prepper-backend) | Python/FastAPI service for Analysis Engine agents. |
| **Middleware** | [`proposal-prepper-middleware/`](./proposal-prepper-middleware) | "Traffic Cop" coordination service. |
| **Infrastructure** | [`proposal-prepper-infra/`](./proposal-prepper-infra) | Docker orchestration, database init, and build scripts. |
| **Shared Services** | [`proposal-prepper-services/`](./proposal-prepper-services) | Shared TypeScript business logic and API clients. |
| **Tests** | [`proposal-prepper-tests/`](./proposal-prepper-tests) | End-to-End (Playwright) tests and Storybook. |
| **Docs** | [`proposal-prepper-docs/`](./proposal-prepper-docs) | Documentation, Policy, and Product Management. |

## 🚀 Quick Start

The application defaults to **Local Mode** (Full Stack) for a complete on-prem experience.

### Local Mode (Default)
Starts the Web UI, Analysis Engine, and all local infrastructure.
- Run: `./proposal-prepper-infra/containers/start.sh -d`
- URL: http://localhost:3000

### Mock Mode (UI Only)
Starts ONLY the Web UI in simulation mode for rapid frontend development.
- Run: `./proposal-prepper-infra/containers/start.sh --mock -d`
- URL: http://localhost:3000

See the [Local Development Guide](./proposal-prepper-docs/guides/LOCAL_DEVELOPMENT_GUIDE.md) for full details.

## 🤝 Contributing

We welcome contributions! As we are at capacity for organization seats, we use a **Fork and Pull Request** model:

1. **Fork** the repository.
2. Create a feature branch from `develop`.
3. Make changes with conventional commits.
4. Submit a **Pull Request** to the upstream `develop` branch.

See [CONTRIBUTING.md](./proposal-prepper-docs/governance/CONTRIBUTING.md) for full details on our standards and contribution process.

## 📂 Documentation

Access full documentation in the [`proposal-prepper-docs`](./proposal-prepper-docs) folder:

- [Governance & Policy](./proposal-prepper-docs/governance)
- [Developer Guides](./proposal-prepper-docs/guides)
- [Architecture](./proposal-prepper-docs/architecture)
- [Project Management](./proposal-prepper-docs/project-management)
- [License Information](./proposal-prepper-docs/governance/LICENSING.md)

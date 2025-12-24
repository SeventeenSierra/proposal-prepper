<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->
<!-- SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC -->

# Proposal Prepper - Development Workflow Guide

This guide outlines the development standards and workflows for the Proposal Prepper monorepo.

---

## Overview

Proposal Prepper is a multi-service application designed for NSF PAPPG compliance validation. It is structured as a monorepo containing several interconnected components with varying licenses.

## Monorepo Components

Refer to [BRANCH_STRUCTURE.md](../project-management/BRANCH_STRUCTURE.md) for a detailed breakdown of directories and their licenses.

## Development Environment

### Nix Shell
This project uses **Nix** for reproducible development environments. All tools (pnpm, python, biome, etc.) are provided via the flake.

```bash
# Enter the development environment
nix develop

# Or run commands directly
nix develop --command pnpm build
```

### Dependency Management
We use **pnpm** workspaces to manage dependencies across the monorepo.

```bash
# Install all dependencies
pnpm install

# Run a script in a specific package
pnpm --filter proposal-prepper-web dev
```

## Branch Strategy

We use a standard Git workflow:

1.  **Branch off `develop`**: Create a descriptive feature branch (e.g., `feat/upload-ui`).
2.  **Design First**: Create a design document and task list before implementing code.
3.  **Implement & Test**: Follow the project's code style (Biome) and ensure all tests pass.
4.  **Verification**: Run the full verification suite (lint, typecheck, test, build).
5.  **Merge via PR**: Submit a Pull Request to `develop`.

## Commit Standards

- **Conventional Commits**: Use `type(scope): description`.
- **Microservice Scopes**: `web`, `backend`, `middleware`, `services`, `infra`, `tests`, `docs`.
- **Sign-off**: Every commit must be signed off with `git commit -s`.
- **Trailers**: Include `AI-Agent` and `Human-Involvement`.

## Licensing Rules

Always check `LICENSING.md` before adding new files to ensure the correct SPDX header is used.

- Frontend (web): `AGPL-3.0-or-later`
- Backend/Middleware/Services: `Proprietary`
- Infrastructure/Tests: `PolyForm-Strict-1.0.0`
- Docs: `CC-BY-SA-4.0`

---

**Questions?** Refer to `.agent/AGENT_RULES.md` for AI agent guidance.

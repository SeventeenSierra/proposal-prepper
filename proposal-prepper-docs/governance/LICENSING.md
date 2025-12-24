<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->
<!-- SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC -->

# Licensing

The Proposal Prepper (Contract Checker) project uses a **multi-license strategy** to balance open source principles with commercial viability for NSF PAPPG compliance validation.

## Quick Reference

| Directory | License | SPDX Identifier |
|-----------|---------|-----------------|
| `/` (root) | [PolyForm Strict 1.0.0](../../LICENSE) | `PolyForm-Strict-1.0.0` |
| `proposal-prepper-web/` | [AGPL-3.0-or-later](../../proposal-prepper-web/LICENSE) | `AGPL-3.0-or-later` |
| `proposal-prepper-backend/` | All Rights Reserved | `UNLICENSED` |
| `proposal-prepper-services/` | All Rights Reserved | `UNLICENSED` |
| `proposal-prepper-middleware/` | All Rights Reserved | `UNLICENSED` |
| `proposal-prepper-infra/` | PolyForm Strict 1.0.0 | `PolyForm-Strict-1.0.0` |
| `proposal-prepper-tests/` | PolyForm Strict 1.0.0 | `PolyForm-Strict-1.0.0` |
| `/.agent/` | PolyForm Perimeter 1.0.0 | `PolyForm-Perimeter-1.0.0` |
| `/.github/` | PolyForm Perimeter 1.0.0 | `PolyForm-Perimeter-1.0.0` |
| `/.husky/` | PolyForm Perimeter 1.0.0 | `PolyForm-Perimeter-1.0.0` |
| `/.kiro/` | PolyForm Perimeter 1.0.0 | `PolyForm-Perimeter-1.0.0` |
| `/.vscode/` | PolyForm Perimeter 1.0.0 | `PolyForm-Perimeter-1.0.0` |
| `proposal-prepper-docs/*` | CC-BY-SA-4.0 | `CC-BY-SA-4.0` |

## License Details

### Monorepo Root: PolyForm Strict

The monorepo structure, build configurations, and DevSecOps automation are licensed under [PolyForm Strict 1.0.0](https://polyformproject.org/licenses/strict/1.0.0/).

**You may:**
- View and study the code
- Use for personal learning and education
- Evaluate for potential licensing

**You may not:**
- Use commercially without a license
- Redistribute or create derivative works

### Microservices and Applications: Mixed Licensing

We use a combination of open source and proprietary licenses for core components:

- **Web App** (`proposal-prepper-web/`): Licensed under [AGPL-3.0-or-later](../../proposal-prepper-web/LICENSE). This ensures the frontend remains open and collaborative.
- **Backend Service** (`proposal-prepper-backend/`): **Proprietary (All Rights Reserved)**. Python/FastAPI service for Strands agents.
- **Middleware** (`proposal-prepper-middleware/`): **Proprietary (All Rights Reserved)**. Traffic coordination service.
- **Shared Services** (`proposal-prepper-services/`): **Proprietary (All Rights Reserved)**. Common logic and API clients.

Contact licensing@seventeensierra.com for licensing inquiries.

### Tools & Utilities: PolyForm Perimeter

Internal tools in `proposal-prepper-infra/scripts/` and `/.agent/` use [PolyForm Perimeter 1.0.0](https://polyformproject.org/licenses/perimeter/1.0.0/):
- Use internally however you want
- Do not expose to external users or offer as a service

### Development Tools & Configuration: PolyForm Perimeter

Development and configuration files in dot directories use [PolyForm Perimeter 1.0.0](https://polyformproject.org/licenses/perimeter/1.0.0/):
- `/.kiro/` - Kiro IDE specifications and tooling
- `/.agent/` - AI agent rules and session management
- `/.github/` - GitHub Actions workflows and templates
- `/.husky/` - Git hooks and pre-commit automation
- `/.storybook/` - Storybook configuration and stories
- `/.vscode/` - VS Code workspace settings and extensions

**Usage Rights:**
- Use internally however you want
- Do not expose to external users or offer as a service
- Supports internal development workflows and team collaboration

### Documentation: Creative Commons

- Guides and tutorials: CC-BY-SA-4.0
- API reference: CC-BY-4.0

### Vendor Code

Code in `/vendor/` retains its original license. See `vendor/*/LICENSE` files.

## SPDX Headers

All source files include SPDX license identifiers:

**Source Code:**
```typescript
// SPDX-License-Identifier: PolyForm-Strict-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
```

**Development Tools & Configuration:**
```html
<!--
SPDX-License-Identifier: PolyForm-Perimeter-1.0.0
SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
-->
```

**Documentation:**
```markdown
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->
<!-- SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC -->
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution requirements including DCO sign-off and CLA.

## Commercial Licensing

For commercial licensing inquiries: **licensing@seventeensierra.com**

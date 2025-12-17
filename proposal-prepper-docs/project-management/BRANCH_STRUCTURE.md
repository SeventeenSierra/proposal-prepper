# Proposal Prepper Branch Structure Comparison

Generated: 2025-12-14

## Branch Overview

| Branch | Purpose | License | Files |
|--------|---------|---------|-------|
| `af-nonopen` | Main development branch with all code | Mixed (PolyForm + AGPL) | ~400+ files |
| `milestone/phase-1` | Phase 1 milestone with license updates | Mixed (PolyForm + AGPL) | ~400+ files |
| `develop` | Clean AGPL-only frontend for customers | AGPL-3.0-or-later | ~200 files |

---

## af-nonopen & milestone/phase-1 (Complete Codebase)

**License Strategy:** Mixed licensing for internal use

```
proposal-prepper/
├── .agent/                      # PolyForm-Perimeter (AI agent config)
├── .github/                     # PolyForm-Perimeter (GitHub workflows)
├── .husky/                      # PolyForm-Perimeter (Git hooks)
├── .kiro/                       # PolyForm-Perimeter (IDE specs)
├── .storybook/                  # PolyForm-Perimeter (Dev tools)
├── .vscode/                     # PolyForm-Perimeter (VS Code)
├── containers/                  # PolyForm-Perimeter (Docker)
├── database/                    # PolyForm-Perimeter (Database)
├── development/                 # PolyForm-Perimeter (Dev configs)
├── docs/
│   ├── private/                 # All Rights Reserved
│   ├── public/                  # CC-BY-SA-4.0 ✅
│   └── troubleshooting/         # All Rights Reserved
├── scripts/                     # PolyForm-Perimeter
├── services/strands/            # PolyForm-Perimeter (Python backend)
├── signatures/                  # All Rights Reserved
├── src/
│   ├── adapters/                # PolyForm-Perimeter (Backend)
│   ├── app/api/                 # PolyForm-Perimeter (API routes)
│   ├── app/ (pages)             # AGPL-3.0-or-later ✅
│   ├── components/              # AGPL-3.0-or-later ✅ (41 files)
│   ├── config/                  # AGPL-3.0-or-later ✅
│   ├── services/                # PolyForm-Perimeter (Mocks)
│   ├── test-utils/              # PolyForm-Perimeter (Tests)
│   ├── types/                   # AGPL-3.0-or-later ✅
│   └── utils/                   # AGPL-3.0-or-later ✅
└── ...
```

---

## develop (Clean AGPL-Only Frontend)

**License Strategy:** 100% AGPL-3.0-or-later for open-source distribution

```
proposal-prepper/
├── docs/public/                 # CC-BY-SA-4.0 ✅
├── e2e/                         # AGPL-3.0-or-later ✅
├── src/
│   ├── app/                     # AGPL-3.0-or-later ✅
│   ├── components/              # AGPL-3.0-or-later ✅ (41 files)
│   ├── config/                  # AGPL-3.0-or-later ✅
│   ├── seed-data/               # AGPL-3.0-or-later ✅
│   ├── types/                   # AGPL-3.0-or-later ✅
│   └── utils/                   # AGPL-3.0-or-later ✅
└── ... (config files, package.json, etc)

Total: ~200 files (ALL AGPL-3.0-or-later)
```

---

## Key Differences  

### ❌ NOT in develop

- `src/adapters/`, `src/app/api/`, `src/services/` - Backend
- `services/strands/` - Python AI backend
- `containers/`, `database/`, `scripts/` - Infrastructure
- `.storybook/`, `src/test-utils/` - Dev tools
- `.agent/`, `.kiro/`, `.github/`, `.husky/` - Configuration
- `docs/private/`, `signatures/` - Private content

### ✅ What Customer Gets

- Complete Next.js frontend application
- All UI components (AGPL licensed)
- Frontend utilities and validation
- Sample data for testing
- Public documentation
- API integration configuration

**Customer provides:**
- Backend API implementation
- Database
- Infrastructure/hosting

---

## Workflow

```
Work on af-nonopen → Update milestone/phase-1 → Cherry-pick to develop
```

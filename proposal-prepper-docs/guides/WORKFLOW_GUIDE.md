<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->
<!-- SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC -->

# Proposal Prepper - Development Workflow Guide

**Last Updated:** December 14, 2025  
**Project:** Proposal Prepper (FAR Compliance Checker)  
**License Strategy:** Dual-track (Internal Full Stack + External AGPL Frontend)

---

## Table of Contents

1. [Overview](#overview)
2. [Branch Strategy](#branch-strategy)
3. [Licensing Model](#licensing-model)
4. [Development Workflow](#development-workflow)
5. [Making Changes](#making-changes)
6. [Merging to Develop](#merging-to-develop)
7. [Working with ATARC/AWS Customer](#working-with-atacaws-customer)
8. [Common Scenarios](#common-scenarios)
9. [Troubleshooting](#troubleshooting)

---

## Overview

This project uses a **dual-track development strategy**:

- **Internal Track** (`af-nonopen`, `milestone/phase-1`): Complete application with proprietary backend
- **External Track** (`develop`): AGPL-licensed frontend only for customer distribution

**Why this approach?**
- ATARC/AWS customer pays for **frontend UI only** (AGPL-3.0-or-later)
- They provide their **own backend** implementation
- We retain proprietary backend, infrastructure, and dev tooling

---

## Branch Strategy

### Branch Hierarchy

```
af-nonopen (Main)
    ├── Complete codebase (frontend + backend + infrastructure)
    ├── Mixed licensing (AGPL + PolyForm + All Rights Reserved)
    ├── Primary development branch
    └── ~400+ files

milestone/phase-1
    ├── Phase 1 milestone tracking
    ├── Synced with af-nonopen
    └── Used for release planning

develop (Customer-Facing)
    ├── AGPL-only frontend (orphan branch with clean history)
    ├── 100% AGPL-3.0-or-later
    ├── NO backend code (never existed in history)
    └── ~200 files
```

### Branch Purposes

| Branch | Who Uses It | Contains | Push Access |
|--------|-------------|----------|-------------|
| `af-nonopen` | Internal team | Everything | Team only |
| `milestone/phase-1` | Internal team | Everything (milestone tracking) | Team only |
| `develop` | ATARC/AWS customer | Frontend only (AGPL) | Public (read), Team (write) |

### GitIgnore Toggle Script

The repository uses `scripts/toggle-gitignore.sh` to manage which files are tracked by git based on the branch context.

**Purpose:** Prevent accidental commits of backend/infrastructure code to the `develop` branch.

**How it works:**

```bash
# Check current status
./scripts/toggle-gitignore.sh status

# Enable exclusions (for develop branch preparation)
./scripts/toggle-gitignore.sh enable

# Disable exclusions (for af-nonopen/milestone work)
./scripts/toggle-gitignore.sh disable
```

**What it does:**

| Mode | When to Use | Effect |
|------|-------------|--------|
| `enable` | Before working on develop | Excludes backend/infrastructure from git tracking |
| `disable` | When working on af-nonopen | Tracks ALL files (default for internal work) |

**Files Excluded When Enabled:**
- Backend: `src/adapters/`, `src/app/api/`, `src/services/`
- Infrastructure: `/services/`, `/containers/`, `/database/`, `/scripts/`
- Dev Tools: `/.storybook/`, `/src/test-utils/`
- Configuration: `/.agent/`, `/.kiro/`, `/.github/`, `/.husky/`, `/.vscode/`
- Private: `/docs/private/`, `/signatures/`

**Important Notes:**
- ⚠️ The script modifies `.gitignore` - changes are **not** auto-committed
- ⚠️ Files already committed stay in git history (use this **before** creating develop branch)
- ✅ For the **orphan develop branch**, gitignore toggle is **not needed** (clean history)
- ✅ Use mainly when you need to verify what would be excluded from develop

**Typical Usage:**

```bash
# Verify develop branch would only have AGPL files
git checkout af-nonopen
./scripts/toggle-gitignore.sh enable
git status  # Check what's ignored
./scripts/toggle-gitignore.sh disable  # Restore for internal work
```

---

## Licensing Model

### License Distribution by Directory

**af-nonopen & milestone/phase-1:**
```
├── src/
│   ├── components/         # AGPL-3.0-or-later ✅ CUSTOMER GETS
│   ├── utils/              # AGPL-3.0-or-later ✅ CUSTOMER GETS
│   ├── config/             # AGPL-3.0-or-later ✅ CUSTOMER GETS
│   ├── app/ (pages)        # AGPL-3.0-or-later ✅ CUSTOMER GETS
│   ├── adapters/           # PolyForm-Perimeter ❌ INTERNAL ONLY
│   ├── app/api/            # PolyForm-Perimeter ❌ INTERNAL ONLY
│   ├── services/           # PolyForm-Perimeter ❌ INTERNAL ONLY
│   └── test-utils/         # PolyForm-Perimeter ❌ INTERNAL ONLY
├── services/strands/       # PolyForm-Perimeter ❌ INTERNAL ONLY
├── containers/             # PolyForm-Perimeter ❌ INTERNAL ONLY
├── database/               # PolyForm-Perimeter ❌ INTERNAL ONLY
├── .storybook/             # PolyForm-Perimeter ❌ INTERNAL ONLY
├── .agent/, .kiro/, etc    # PolyForm-Perimeter ❌ INTERNAL ONLY
└── docs/public/            # CC-BY-SA-4.0 ✅ CUSTOMER GETS
```

**develop:**
```
├── src/
│   ├── components/         # AGPL-3.0-or-later ✅
│   ├── utils/              # AGPL-3.0-or-later ✅
│   ├── config/             # AGPL-3.0-or-later ✅
│   ├── app/                # AGPL-3.0-or-later ✅
│   ├── seed-data/          # AGPL-3.0-or-later ✅
│   └── types/              # AGPL-3.0-or-later ✅
└── docs/public/            # CC-BY-SA-4.0 ✅
```

### SPDX Headers

**Frontend (AGPL):**
```typescript
// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
```

**Backend/Infrastructure (PolyForm-Perimeter):**
```typescript
// SPDX-License-Identifier: PolyForm-Perimeter-1.0.0
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
```

---

## Development Workflow

### Daily Workflow

**Step 1: Work on af-nonopen**

```bash
# Always start here for new work
git checkout af-nonopen
git pull origin af-nonopen

# Create feature branch
git checkout -b feat/your-feature

# Make changes (frontend or backend)
# ... edit files ...

# Commit with proper format
git commit -s -m "feat(web): add new feature

Human-Involvement: reviewed
AI-Agent: YourAgent/Model"

# Push feature branch
git push origin feat/your-feature
```

**Step 2: Merge to af-nonopen**

```bash
# Create PR: feat/your-feature → af-nonopen
# After review and approval:
git checkout af-nonopen
git merge feat/your-feature
git push origin af-nonopen
```

**Step 3: Update milestone/phase-1**

```bash
git checkout milestone/phase-1
git merge af-nonopen --ff
git push origin milestone/phase-1
```

**Step 4: Update develop (Frontend Changes Only)**

**If you modified AGPL frontend files:**

```bash
# Checkout develop
git checkout develop

# Cherry-pick ONLY frontend commits
git cherry-pick <commit-hash>  # Pick commits that touch AGPL files only

# OR manually apply changes
# ... copy frontend changes ...

git commit -s -m "feat(web): add new frontend feature

Cherry-picked from af-nonopen.

Human-Involvement: reviewed
AI-Agent: YourAgent/Model"

git push origin develop
```

---

## Making Changes

### Adding a New UI Component

**Location:** `src/components/your-component/`
**License:** AGPL-3.0-or-later
**Goes to:** Both af-nonopen AND develop

```bash
# 1. Work on af-nonopen
git checkout af-nonopen
mkdir src/components/your-component
# ... create component files ...

# 2. Add AGPL headers
# SPDX-License-Identifier: AGPL-3.0-or-later

# 3. Commit
git add src/components/your-component/
git commit -s -m "feat(web): add YourComponent

Human-Involvement: reviewed"

# 4. Merge to af-nonopen
git push origin af-nonopen

# 5. Cherry-pick to develop
git checkout develop
git cherry-pick HEAD~1  # or specific commit
git push origin develop
```

### Adding Backend Code

**Location:** `src/adapters/`, `src/app/api/`, `services/strands/`
**License:** PolyForm-Perimeter-1.0.0
**Goes to:** af-nonopen ONLY (NOT develop)

```bash
# Work only on af-nonopen
git checkout af-nonopen

# Add PolyForm headers
# SPDX-License-Identifier: PolyForm-Perimeter-1.0.0

git commit -s -m "feat(api): add new backend endpoint

Human-Involvement: reviewed"

git push origin af-nonopen

# DO NOT cherry-pick to develop
# Backend stays internal only
```

---

## Merging to Develop

### When to Update Develop

Update `develop` when you've made changes to:
- UI components (`src/components/`)
- Frontend utilities (`src/utils/`)
- Frontend configuration (`src/config/`)
- Pages (`src/app/*.tsx`, `src/app/rfp/`)
- Public documentation (`docs/public/`)

### When NOT to Update Develop

Do NOT update `develop` for:
- Backend code (`src/adapters/`, `src/app/api/`, `src/services/`)
- Infrastructure (`containers/`, `database/`, `services/strands/`)
- Dev tools (`.storybook/`, `src/test-utils/`)
- Internal docs (`docs/private/`)

### Cherry-Pick Process

```bash
# 1. Identify frontend commits
git log af-nonopen --oneline -20

# 2. Checkout develop
git checkout develop

# 3. Cherry-pick frontend commits
git cherry-pick <commit-hash>

# 4. If conflicts, resolve and continue
git cherry-pick --continue

# 5. Push
git push origin develop
```

---

## Working with ATARC/AWS Customer

### What They Receive (develop branch)

✅ **Complete Next.js frontend application**
✅ **All UI components** with AGPL license
✅ **Frontend utilities** (validation, compliance detection, performance)
✅ **Sample data** for testing
✅ **Public documentation**
✅ **API integration guide** showing how to connect their backend

❌ **NOT included:**
- Backend implementation
- Database schemas
- Infrastructure code
- Internal dev tools

### Customer Integration Point

The customer integrates at `src/config/api-config.ts`:

```typescript
// Customer configures their backend URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
```

They implement endpoints matching our API interface defined in the documentation.

### Support Model

**We provide:**
- ✅ Frontend code (AGPL)
- ✅ API interface documentation
- ✅ Integration examples
- ✅ Bug fixes for frontend

**We do NOT provide:**
- ❌ Backend implementation
- ❌ Infrastructure setup
- ❌ Database setup
- ❌ Hosting

---

## Common Scenarios

### Scenario 1: Fix a Bug in UI Component

```bash
# 1. Fix on af-nonopen
git checkout af-nonopen
# ... fix bug ...
git commit -s -m "fix(web): resolve button alignment issue"
git push origin af-nonopen

# 2. Cherry-pick to develop
git checkout develop
git cherry-pick af-nonopen
git push origin develop
```

### Scenario 2: Add New Backend Feature

```bash
# Work only on af-nonopen
git checkout af-nonopen
# ... add backend feature ...
git commit -s -m "feat(api): add batch processing endpoint"
git push origin af-nonopen

# STOP - do not push to develop
# This is internal backend code
```

### Scenario 3: Update Documentation

```bash
# Update on af-nonopen
git checkout af-nonopen
# ... update docs/public/ ...
git commit -s -m "docs: update API integration guide"
git push origin af-nonopen

# Cherry-pick to develop (if public docs)
git checkout develop
git cherry-pick af-nonopen
git push origin develop
```

### Scenario 4: Major Frontend Refactor

```bash
# 1. Work on af-nonopen
git checkout af-nonopen
git checkout -b refactor/frontend-cleanup

# ... make changes ...
git commit -s -m "refactor(web): modernize component structure"
git push origin refactor/frontend-cleanup

# 2. PR and merge to af-nonopen
# ... after review ...

# 3. For develop, create fresh branch
git checkout develop
git checkout -b sync/frontend-refactor

# Manually apply or cherry-pick changes
git cherry-pick <commits>

# 4. Test on develop
pnpm install
pnpm build
pnpm test

# 5. Push to develop
git push origin develop
```

---

## Troubleshooting

### "I accidentally committed backend code to develop"

```bash
# Remove the commit
git checkout develop
git reset --hard HEAD~1  # Remove last commit

# Force push (if already pushed)
git push origin develop --force

# Re-apply only frontend changes
git checkout af-nonopen -- src/components/your-change
git commit -s -m "feat(web): add frontend feature only"
git push origin develop
```

### "develop branch has backend files in history"

The develop branch is an **orphan branch** with clean history. If you see backend files:

```bash
# Recreate clean develop
git checkout af-nonopen
git checkout --orphan develop-new
git reset --hard
git checkout develop -- .  # Copy current develop content
git commit -s -m "feat(web): clean AGPL frontend"
git branch -D develop
git branch -m develop-new develop
git push origin develop --force
```

### "How do I know which commits to cherry-pick?"

```bash
# Show commits that touched AGPL frontend files
git log af-nonopen --oneline --name-only | \
  grep -E "src/(components|utils|config|app)" | \
  head -20
```

Only cherry-pick commits that exclusively touch AGPL-licensed frontend code.

---

## Quick Reference

### Branch Quick Facts

| Question | Answer |
|----------|--------|
| Where do I make changes? | `af-nonopen` |
| Where does customer see code? | `develop` |
| Can I merge backend to develop? | **NO** - Only AGPL frontend |
| How often sync to develop? | After frontend changes |
| Can customer submit PRs? | Yes, to `develop` only |

### File License Quick Check

```bash
# Check file license
head -3 src/components/your-file.tsx

# Should see for frontend:
# SPDX-License-Identifier: AGPL-3.0-or-later

# Should see for backend:
# SPDX-License-Identifier: PolyForm-Perimeter-1.0.0
```

### Commands Cheat Sheet

```bash
# Switch branches
git checkout af-nonopen      # Internal work
git checkout milestone/phase-1  # Milestone tracking  
git checkout develop          # Customer-facing

# Cherry pick to develop
git checkout develop
git cherry-pick <commit-hash>

# View branch structure
cat BRANCH_STRUCTURE.md

# Check gitignore status
./scripts/toggle-gitignore.sh status
```

---

## Additional Resources

- **[BRANCH_STRUCTURE.md](./BRANCH_STRUCTURE.md)** - Detailed branch comparison
- **[UI_DEVELOPMENT_GUIDE.md](./UI_DEVELOPMENT_GUIDE.md)** - Frontend development guide
- **[LICENSING.md](./LICENSING.md)** - Complete licensing strategy
- **[API_INTEGRATION.md](./docs/public/API_INTEGRATION.md)** - Customer integration guide

---

**Questions?** Contact the team lead or refer to `.agent/AGENT_RULES.md` for AI agent guidance.

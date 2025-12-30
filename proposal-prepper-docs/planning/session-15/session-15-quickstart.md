# Session 15: Quick Start Guide

## What We're Building
**Keycloak authentication** as a microservice with:
- Bidder vs Government roles
- Demo mode with CAPTCHA (no anonymous access)
- User-scoped document ownership

## Why This Session?
Auth is **prerequisite** for all features:
- Can't track J&A+RFP document pairs without user ownership
- Can't implement Bidder/Government workflows without roles
- Routes need protection NOW

---

## Key Documents

### Planning
- `implementation_plan.md` - Full technical plan (7 sections)
- `task.md` - Checklist breakdown
- `keycloak-implementation.md` - Detailed Keycloak setup

### Architecture Decisions
- `architecture-two-roles.md` - Bidder/Government system design
- `strands-analysis.md` - Why LangChain+LiteLLM
- `terminology-update.md` - "Government compliance" terminology

---

## Quick Start

### 1. Create Auth Microservice
```bash
mkdir -p proposal-prepper-auth/keycloak
```

### 2. Add Keycloak Container
Create docker-compose.yml with Keycloak (port 8180)

### 3. Configure Realm
- Access http://localhost:8180
- Create realm: `proposal-prepper`
- Create roles: `bidder`, `government`, `anonymous`

### 4. Integrate Next.js
```bash
pnpm add next-auth
```

---

## Session Roadmap

**Session 15** (Current): Auth foundation  
**Session 16**: Dual upload (J&A + RFP)  
**Session 17**: Regulation versioning  
**Session 18**: NooBaa migration  
**Session 19**: LangChain orchestration

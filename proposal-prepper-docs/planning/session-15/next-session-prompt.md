# Session 15: Authentication with Keycloak

## Current Context

I'm working on the **Proposal Prepper** project, a microservice architecture for government compliance document checking. Session 14 completed a major refactor with 341/341 tests passing and all commits pushed to `feature/far-ui-integration`.

**IMPORTANT TERMINOLOGY**: We use "government compliance" NOT "NSF PAPPG" - the latter is too specific and doesn't convey the broader scope of the platform.

## Session 15 Objective

**Implement self-hosted authentication using Keycloak** as a dedicated microservice with:
- **Role-based access**: Bidder vs Government roles
- **Demo mode security**: CAPTCHA-protected demo login (`demo:demo`)
- **User-scoped ownership**: Documents associated with authenticated users
- **Protected API routes**: Backend security before public deployment

## Why Auth First?

**Critical prerequisites for all future features**:
1. **Security**: Backend routes are currently exposed and need protection
2. **Data Ownership**: Document uploads (especially J&A + RFP pairs) require user association
3. **Role Workflows**: Bidder/Government-specific features depend on authentication

**Why Keycloak?**
- ✅ Open source, self-hosted, no vendor lock-in
- ✅ Runs in containerized stack (local-first)
- ✅ Production-ready (Red Hat, industry standard)
- ✅ Built-in role-based access control
- ✅ OpenID Connect (easy Next.js integration)

## Implementation Overview

**New microservice**: `proposal-prepper-auth`
- Keycloak container running on port 8180
- Automated realm configuration via `realm-export.json`
- CAPTCHA integration (Cloudflare Turnstile)
- Demo credentials with 1-hour session expiry

**7 Implementation Sections** (7 commit boundaries):
1. **Auth Microservice Setup** - Docker + networking
2. **Keycloak Realm Config** - Roles, clients, demo user
3. **CAPTCHA Integration** - Cloudflare Turnstile for demo mode
4. **NextAuth Integration** - Next.js authentication flows
5. **Database Schema** - Users, document uploads, proposals tables
6. **Protected Routes** - Middleware for API protection
7. **Role-Based UI** - Bidder/Government view switching

## Task Breakdown

### Section 1: Auth Microservice Setup
**Scope**: `auth`
- [ ] Create `proposal-prepper-auth/` directory
- [ ] Add Keycloak Dockerfile
- [ ] Create docker-compose.yml for auth service
- [ ] Add to main docker-compose (external service)
- [ ] Configure networking between services

### Section 2: Keycloak Realm Configuration
**Scope**: `auth`
- [ ] Create realm-export.json (automated config)
- [ ] Define `proposal-prepper` realm
- [ ] Configure client: `proposal-prepper-web`
- [ ] Create roles: `bidder`, `government`, `anonymous`
- [ ] Create demo user: `demo:demo`
- [ ] Set up CAPTCHA requirement for demo login

### Section 3: CAPTCHA Integration
**Scope**: `auth,web`
- [ ] Sign up for Cloudflare Turnstile
- [ ] Add Turnstile to demo login page
- [ ] Create CAPTCHA verification endpoint
- [ ] Integrate with Keycloak login flow
- [ ] Test bot protection

### Section 4: NextAuth Integration
**Scope**: `web`
- [ ] Install next-auth
- [ ] Create [...nextauth]/route.ts
- [ ] Configure Keycloak provider (auth microservice)
- [ ] Add demo mode auto-login
- [ ] Add environment variables
- [ ] Test login flows (normal + demo)

### Section 5: Database Schema
**Scope**: `db`
- [ ] Create users table migration
- [ ] Create document_uploads table
- [ ] Create proposals table
- [ ] Add anonymous user constraints
- [ ] Run migrations
- [ ] Test data isolation

### Section 6: Protected Routes
**Scope**: `web`
- [ ] Create auth middleware
- [ ] Protect /api/documents (require auth, allow anonymous)
- [ ] Protect /api/analysis (require auth, allow anonymous)
- [ ] Keep /api/health public
- [ ] Test unauthorized access blocked
- [ ] Test anonymous access works with limits

### Section 7: Role-Based UI
**Scope**: `web`
- [ ] Create useUserRole hook
- [ ] Create RoleGate component
- [ ] Update UI for bidder view
- [ ] Update UI for government view
- [ ] Test role-specific features

## Success Criteria

✅ Auth microservice running at `localhost:8180`  
✅ Realm configured via `realm-export.json` (automated)  
✅ Demo mode with CAPTCHA (bot protection)  
✅ Anonymous users limited (read-only, no uploads)  
✅ Regular users can sign up with roles  
✅ API routes protected but allow anonymous access  
✅ Data isolated per user  
✅ All tests passing

## Project Architecture

**Microservices**:
- `proposal-prepper-web` - Next.js web app
- `proposal-prepper-auth` - **NEW**: Keycloak authentication service
- `proposal-prepper-strands` - Python strands-agent service
- `proposal-prepper-seed--data` - Seed data package
- `proposal-prepper-tests` - Test suite
- `proposal-prepper-services` - Shared services
- `proposal-prepper-middleware` - API middleware

**Key commit standards**:
- Use conventional commits: `feat(scope)`, `fix(scope)`, `test(scope)`, etc.
- Include `Human-Involvement: reviewed` and `AI-Agent: <name>` trailers
- Human signs commits with `-s` flag for DCO

## Important Planning Files

**Session 15 planning**: `proposal-prepper-docs/planning/session-15/`
- `implementation_plan.md` - Full technical plan (this session)
- `task.md` - Detailed checklist breakdown
- `keycloak-implementation.md` - Keycloak-specific setup guide
- `session-15-quickstart.md` - Quick reference

**Previous session**: `proposal-prepper-docs/sessions/14-test-fixes/`
- `session-record.md` - Full session documentation
- `walkthrough.md` - Detailed walkthrough with screenshots

**Workflows**: `proposal-prepper-docs/.agent/workflows/`
- `commit-standards.md` - Commit message format
- `session-records.md` - How to document sessions
- `design-first.md` - Design-first development workflow

## Repository

- **GitHub**: `SeventeenSierra/proposal-prepper`
- **Current branch**: `docs/session-15-planning`
- **Feature branch**: `feature/far-ui-integration` (Session 14 work, ready for PR)
- **Tests**: 341/341 passing

## Next Steps After Session 15

**Session 16**: Dual Upload + Validation (J&A + RFP pairs, now user-scoped)  
**Session 17**: Regulation Versioning (with user notifications)  
**Session 18**: NooBaa Migration (document storage)  
**Session 19**: LangChain Orchestration (compliance validation)

---

**Start Session 15 with**: "I'm starting Session 15 to implement Keycloak authentication. Let's begin with Section 1: Auth Microservice Setup."

# Implementation Plan: Authentication with Keycloak (Session 15)

## Why Auth First?

**User's correct insight**: Auth must come BEFORE compliance validation for two critical reasons:

1. **Security**: Backend routes are exposed (even in local mode) and need protection
2. **Data Ownership**: Document uploads (especially J&A + RFP pairs) need user association

**Why Keycloak?**
- ✅ Open source - Full control, no vendor lock-in
- ✅ Self-hosted - Runs in your containerized stack
- ✅ Local-first - No cloud dependencies
- ✅ Production-ready - Industry standard (Red Hat)
- ✅ Role-based - Built-in support for Bidder/Government roles
- ✅ OpenID Connect - Standard protocol, easy Next.js integration

---

## Architecture: Auth as Microservice

**New microservice**: `proposal-prepper-auth`
- Keycloak container + configuration
- Realm management (automated via realm-export.json)
- CAPTCHA integration for demo mode
- Custom themes (optional)

**Demo Mode Security**:
- Demo credentials (`demo:demo`) with CAPTCHA protection
- Cloudflare Turnstile (privacy-friendly, no Google dependency)
- Anonymous role with read-only access
- Session expires after 1 hour
- Rate-limited API calls

---

## Task Breakdown

### Section 1: Auth Microservice Setup (← COMMIT BOUNDARY)
**Scope**: `auth`

- [ ] 1.1 Create `proposal-prepper-auth/` directory
- [ ] 1.2 Add Keycloak Dockerfile
- [ ] 1.3 Create docker-compose.yml for auth service
- [ ] 1.4 Add to main docker-compose (external service)
- [ ] 1.5 Configure networking between services

### Section 2: Keycloak Realm Configuration (← COMMIT BOUNDARY)
**Scope**: `auth`

- [ ] 2.1 Create realm-export.json (automated config)
- [ ] 2.2 Define `proposal-prepper` realm
- [ ] 2.3 Configure client: `proposal-prepper-web`
- [ ] 2.4 Create roles: `bidder`, `government`, `anonymous`
- [ ] 2.5 Create demo user: `demo:demo`
- [ ] 2.6 Create anonymous user template
- [ ] 2.7 Set up CAPTCHA requirement for demo login

### Section 3: CAPTCHA Integration (← COMMIT BOUNDARY)
**Scope**: `auth,web`

- [ ]* 3.1 Sign up for Cloudflare Turnstile
- [ ] 3.2 Add Turnstile to demo login page
- [ ] 3.3 Create CAPTCHA verification endpoint
- [ ] 3.4 Integrate with Keycloak login flow
- [ ] 3.5 Test bot protection

### Section 4: NextAuth Integration (← COMMIT BOUNDARY)
**Scope**: `web`

- [ ]* 4.1 Install next-auth
- [ ] 4.2 Create [...nextauth]/route.ts
- [ ] 4.3 Configure Keycloak provider (auth microservice)
- [ ] 4.4 Add demo mode auto-login
- [ ] 4.5 Add environment variables
- [ ] 4.6 Test login flows (normal + demo)

### Section 5: Database Schema (← COMMIT BOUNDARY)
**Scope**: `db`

- [ ]* 5.1 Create users table migration
- [ ]* 5.2 Create document_uploads table
- [ ]* 5.3 Create proposals table
- [ ] 5.4 Add anonymous user constraints
- [ ] 5.5 Run migrations
- [ ] 5.6 Test data isolation

### Section 6: Protected Routes (← COMMIT BOUNDARY)
**Scope**: `web`

- [ ]* 6.1 Create auth middleware
- [ ] 6.2 Protect /api/documents (require auth, allow anonymous)
- [ ] 6.3 Protect /api/analysis (require auth, allow anonymous)
- [ ] 6.4 Keep /api/health public
- [ ] 6.5 Test unauthorized access blocked
- [ ] 6.6 Test anonymous access works with limits

### Section 7: Role-Based UI (← COMMIT BOUNDARY)
**Scope**: `web`

- [ ]* 7.1 Create useUserRole hook
- [ ] 7.2 Create RoleGate component
- [ ] 7.3 Update UI for bidder view
- [ ] 7.4 Update UI for government view
- [ ] 7.5 Test role-specific features

---

## Success Criteria

✅ Auth microservice running independently  
✅ Keycloak accessible at localhost:8180  
✅ Realm configured via realm-export.json (automated)  
✅ Demo mode with CAPTCHA (bot protection)  
✅ Anonymous users limited (read-only, no uploads)  
✅ Regular users can sign up with roles  
✅ API routes protected but allow anonymous  
✅ Data isolated per user  

---

## Next Steps After Session 15

**Session 16**: Dual Upload + Validation (now user-scoped)  
**Session 17**: Regulation Versioning (with user notifications)  
**Session 18**: NooBaa Migration  
**Session 19**: LangChain Orchestration

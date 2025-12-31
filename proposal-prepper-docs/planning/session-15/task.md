# Session 15: Authentication with Keycloak

## Overview
Implement self-hosted authentication using Keycloak as a microservice with role-based access (Bidder/Government) and secure demo mode.

---

## Section 1: Auth Microservice Setup
**Scope**: `auth`

- [ ] 1.1 Create `proposal-prepper-auth/` directory
- [ ] 1.2 Add Keycloak Dockerfile
- [ ] 1.3 Create docker-compose.yml for auth service
- [ ] 1.4 Add to main docker-compose (external service)
- [ ] 1.5 Configure networking between services

---

## Section 2: Keycloak Realm Configuration
**Scope**: `auth`

- [ ] 2.1 Create realm-export.json (automated config)
- [ ] 2.2 Define `proposal-prepper` realm
- [ ] 2.3 Configure client: `proposal-prepper-web`
- [ ] 2.4 Create roles: `bidder`, `government`, `anonymous`
- [ ] 2.5 Create demo user: `demo:demo`
- [ ] 2.6 Create anonymous user template
- [ ] 2.7 Set up CAPTCHA requirement for demo login

---

## Section 3: CAPTCHA Integration
**Scope**: `auth,web`

- [ ] 3.1 Sign up for Cloudflare Turnstile
- [ ] 3.2 Add Turnstile to demo login page
- [ ] 3.3 Create CAPTCHA verification endpoint
- [ ] 3.4 Integrate with Keycloak login flow
- [ ] 3.5 Test bot protection

---

## Section 4: NextAuth Integration
**Scope**: `web`

- [ ] 4.1 Install next-auth
- [ ] 4.2 Create [...nextauth]/route.ts
- [ ] 4.3 Configure Keycloak provider (auth microservice)
- [ ] 4.4 Add demo mode auto-login
- [ ] 4.5 Add environment variables
- [ ] 4.6 Test login flows (normal + demo)

---

## Section 5: Database Schema
**Scope**: `db`

- [ ] 5.1 Create users table migration
- [ ] 5.2 Create document_uploads table
- [ ] 5.3 Create proposals table
- [ ] 5.4 Add anonymous user constraints
- [ ] 5.5 Run migrations
- [ ] 5.6 Test data isolation

---

## Section 6: Protected Routes
**Scope**: `web`

- [ ] 6.1 Create auth middleware
- [ ] 6.2 Protect /api/documents (require auth, allow anonymous)
- [ ] 6.3 Protect /api/analysis (require auth, allow anonymous)
- [ ] 6.4 Keep /api/health public
- [ ] 6.5 Test unauthorized access blocked
- [ ] 6.6 Test anonymous access works with limits

---

## Section 7: Role-Based UI
**Scope**: `web`

- [ ] 7.1 Create useUserRole hook
- [ ] 7.2 Create RoleGate component
- [ ] 7.3 Update UI for bidder view
- [ ] 7.4 Update UI for government view
- [ ] 7.5 Test role-specific features

---

## Success Criteria

- [x] Implementation plan finalized
- [ ] Auth microservice running (localhost:8180)
- [ ] Realm configured via realm-export.json
- [ ] Demo mode with CAPTCHA working
- [ ] Users can sign up with roles
- [ ] API routes protected
- [ ] Data isolated per user
- [ ] All tests passing

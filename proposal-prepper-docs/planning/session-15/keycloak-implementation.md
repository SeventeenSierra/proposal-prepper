# Implementation Plan: Authentication with Keycloak (Session 15 - UPDATED)

## Architecture: Auth as Microservice

**New microservice**: `proposal-prepper-auth`
- Keycloak container + configuration
- Realm management
- Custom themes (optional)
- CAPTCHA integration for demo mode

## Demo Mode: Secure Anonymous Access

**Options for demo mode**:
1. **Anonymous auth** - Auto-login as anonymous user with limited permissions
2. **Demo credentials** - `demo:demo` with CAPTCHA protection
3. **Both** - Let user choose

**CAPTCHA**: Cloudflare Turnstile (privacy-friendly, no Google dependency)

---

## Updated Microservice Structure

```
proposal-prepper/
├── proposal-prepper-auth/          # NEW MICROSERVICE
│   ├── keycloak/
│   │   ├── Dockerfile
│   │   ├── realm-export.json      # Automated realm config
│   │   └── themes/                # Custom UI themes
│   ├── captcha/
│   │   └── turnstile-verify.ts    # CAPTCHA verification
│   └── docker-compose.yml         # Keycloak + config
├── proposal-prepper-web/
├── proposal-prepper-backend/
├── proposal-prepper-services/
└── proposal-prepper-infra/
```

---

## Task Breakdown (UPDATED)

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

---

## Demo Mode Implementation

### Option 1: Anonymous Auto-Login
```typescript
// app/page.tsx
export default function Home() {
  const { data: session, status } = useSession();
  
  if (status === "unauthenticated" && isDemoMode()) {
    // Auto-login as anonymous
    signIn("keycloak", { 
      callbackUrl: "/",
      username: "anonymous"
    });
  }
  
  return <AgentInterface />;
}
```

### Option 2: Demo Credentials with CAPTCHA
```typescript
// components/DemoLogin.tsx
export function DemoLogin() {
  const [captchaToken, setCaptchaToken] = useState("");
  
  async function handleDemoLogin() {
    // Verify CAPTCHA
    const verified = await fetch("/api/auth/verify-captcha", {
      method: "POST",
      body: JSON.stringify({ token: captchaToken })
    });
    
    if (verified.ok) {
      signIn("keycloak", {
        username: "demo",
        password: "demo"
      });
    }
  }
  
  return (
    <div>
      <Turnstile onVerify={setCaptchaToken} />
      <button onClick={handleDemoLogin}>Demo Login</button>
    </div>
  );
}
```

---

## Auth Microservice Configuration

### docker-compose.yml (proposal-prepper-auth)
```yaml
version: '3.8'

services:
  keycloak:
    build: ./keycloak
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: ${KEYCLOAK_ADMIN_PASSWORD}
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres:5432/keycloak
      KC_HOSTNAME: localhost
    command:
      - start-dev
      - --import-realm  # Import realm-export.json
    volumes:
      - ./keycloak/realm-export.json:/opt/keycloak/data/import/realm.json:ro
    ports:
      - "8180:8080"
    networks:
      - proposal-prepper-network

networks:
  proposal-prepper-network:
    external: true
```

### realm-export.json (excerpt)
```json
{
  "realm": "proposal-prepper",
  "enabled": true,
  "roles": {
    "realm": [
      { "name": "bidder" },
      { "name": "government" },
      { "name": "anonymous", "description": "Demo mode user" }
    ]
  },
  "users": [
    {
      "username": "demo",
      "enabled": true,
      "credentials": [{ "type": "password", "value": "demo" }],
      "realmRoles": ["anonymous"]
    }
  ],
  "clients": [
    {
      "clientId": "proposal-prepper-web",
      "enabled": true,
      "protocol": "openid-connect",
      "redirectUris": ["http://localhost:3000/*"],
      "webOrigins": ["http://localhost:3000"]
    }
  ]
}
```

---

## Success Criteria (UPDATED)

✅ Auth microservice running independently  
✅ Keycloak accessible at localhost:8180  
✅ Realm configured via realm-export.json (automated)  
✅ Demo mode with CAPTCHA (bot protection)  
✅ Anonymous users limited (read-only, no uploads)  
✅ Regular users can sign up with roles  
✅ API routes protected but allow anonymous  
✅ Data isolated per user  

---

## Security Considerations

**Demo/Anonymous users**:
- Read-only access to sample data
- Cannot upload documents
- Cannot see other users' data
- Session expires after 1 hour
- Rate-limited API calls

**CAPTCHA**:
- Required for demo:demo login
- Prevents automated bot access
- Cloudflare Turnstile (privacy-friendly)

**Microservice isolation**:
- Auth service separate from app
- Can scale independently
- Can upgrade Keycloak without touching app code

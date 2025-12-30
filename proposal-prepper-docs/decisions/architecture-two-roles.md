# Architecture Decision: Two-Role System

**Date**: 2025-12-30  
**Decision**: Implement two-role system for government compliance platform

---

## Roles Defined

### 1. Government Role
**Capabilities**:
- Upload solicitations/RFPs
- **Update EO and FAR regulations** (manually or automatically)
- Trigger notifications to bidders when regulations change
- View all proposals submitted against their solicitations
- Audit compliance across bidders

### 2. Bidder Role
**Capabilities**:
- Upload proposals (J&A documents)
- View compliance validation results
- **Receive notifications** when regulations update
- **Re-validate proposals** against updated regulations
- See comparison: "Was compliant, now has issues due to EO 13985 update"

---

## Key Workflows

### Workflow 1: Initial Proposal Submission
```
1. Bidder uploads J&A + RFP
2. System extracts citations (EO 13985, FAR 6.302-1, etc.)
3. Validates against CURRENT regulation versions
4. Stores: 
   - Validation result
   - Regulation versions used
   - Timestamp
```

### Workflow 2: Regulation Update (Government)
```
1. Government updates EO 13985 (or system auto-updates via EO Crawler)
2. System:
   - Creates new regulation version
   - Logs change in audit trail
   - Identifies affected proposals
   - Sends notifications to bidders
```

### Workflow 3: Revalidation (Bidder)
```
1. Bidder receives notification: "EO 13985 updated, revalidate your proposal"
2. Bidder clicks "Re-validate"
3. System:
   - Re-runs validation with NEW regulation version
   - Compares to PREVIOUS validation result
   - Shows delta: "2 new violations due to EO update"
4. Bidder updates J&A if needed
5. Re-submits for validation
```

---

## Data Model Implications

### Regulation Versions
```typescript
interface RegulationVersion {
  id: string;
  type: 'EO' | 'FAR';
  reference: string;        // "EO 13985"
  version: number;          // 1, 2, 3...
  effectiveDate: Date;
  content: string;          // Full text or summary
  changeDescription: string; // "Updated Section 2(a) requirements"
  updatedBy?: string;       // Government user ID
}
```

### Validation Result (Enhanced)
```typescript
interface ValidationResult {
  proposalId: string;
  timestamp: Date;
  regulationVersions: {     // NEW: Track which versions were used
    [reference: string]: number; // "EO 13985": 2
  };
  violations: Violation[];
  isCompliant: boolean;
  
  // For revalidation comparison
  previousValidationId?: string;
  changedViolations?: {
    new: Violation[];
    resolved: Violation[];
  };
}
```

### Notification System
```typescript
interface RegulationChangeNotification {
  id: string;
  regulationReference: string;
  oldVersion: number;
  newVersion: number;
  affectedProposals: string[]; // Proposal IDs that cite this regulation
  notifiedUsers: string[];     // Bidder user IDs
  status: 'pending' | 'sent' | 'acknowledged';
}
```

---

## Authentication Requirements (Session 16)

**Must support**:
- User registration/login
- Role assignment (Bidder or Government)
- Permission checks:
  - Bidders can only see their own proposals
  - Government can update regulations
  - Government can see proposals for their solicitations
  
**Auth flow**:
1. OAuth 2.0 or JWT-based
2. Role stored in user profile
3. Middleware checks role before allowing regulation updates
4. Row-level security for proposal access

---

## Session 15 Scope Adjustment

**What we CAN do in Session 15**:
- Dual document upload
- Citation extraction
- Basic validation logic
- Store validation results with timestamp

**What we DEFER to Session 16** (auth required):
- Role-based access
- Regulation update workflow
- Notification system
- Revalidation workflow

**Why**: Auth is prerequisite for role-based features

---

## Implementation Priority

**Session 15**: Foundation (dual upload, citations, validation)  
**Session 16**: Auth + Roles (CRITICAL, enables multi-user)  
**Session 17**: Regulation versioning + revalidation  
**Session 18**: NooBaa migration  
**Session 19**: Agent orchestration + EO Crawler

This ensures we build in the right order: foundation → multi-user → versioning → automation.

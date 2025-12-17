<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->
<!-- SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC -->

# Manual Testing Guide: Proposal Prepper UI Workflow

This guide walks you through testing the complete end-to-end workflow of the Proposal Prepper application.

## Prerequisites

Before testing, ensure the following services are running:

| Service | URL | Health Check |
|---------|-----|--------------|
| Web (Next.js) | http://localhost:3000 | http://localhost:3000/api/health |
| Strands (Python) | http://localhost:8080 | http://localhost:8080/api/health |
| MinIO Console | http://localhost:9001 | (minioadmin/minioadmin) |

### Quick Health Check
```bash
# Check all services
curl -s http://localhost:8080/api/health | python3 -m json.tool
curl -s http://localhost:3000/api/health | python3 -m json.tool
```

---

## Phase 1: Verify Service Connectivity

### Step 1.1: Open the Application
1. Open your browser to **http://localhost:3000**
2. **Expected**: The Proposal Prepper home page should load
3. **If blank page**: Check browser console for errors (F12 → Console)

### Step 1.2: Check Backend Connection
1. In browser DevTools (F12), go to **Network** tab
2. Refresh the page
3. Look for API requests to `/api/health` or similar
4. **Expected**: 200 OK responses

---

## Phase 2: Document Upload Flow

### Step 2.1: Navigate to Upload
1. Look for "New Compliance Check" or "Upload" button
2. Click to open the upload interface

### Step 2.2: Select a Test Document
Use one of the seed documents from `src/seed-data/`:
- Small test: Any PDF under 1MB
- Real proposal: Choose from the 30 seeded PDFs

### Step 2.3: Upload Document
1. Drag & drop or click to select file
2. **Expected**: Upload progress indicator appears
3. **Expected**: Status changes: `uploading` → `queued` → `processing`

### Step 2.4: Monitor Progress
Watch for status updates:
```
Status Flow:
uploading → queued → extracting → analyzing → completed
                                           ↘ failed (if error)
```

---

## Phase 3: Analysis Results

### Step 3.1: Wait for Completion
- Analysis typically takes 30-60 seconds with fallback analysis
- With AWS Bedrock configured, times may vary

### Step 3.2: View Results
Once completed:
1. Navigate to the results view
2. **Expected**: Compliance summary displayed
   - Overall score (%)
   - Total issues count
   - Critical/Warning/Info breakdown

### Step 3.3: Review Compliance Issues
For each issue, verify:
- [ ] Severity indicator (critical/warning/info)
- [ ] Title and description
- [ ] Regulatory reference (FAR/DFARS section)
- [ ] Location in document (if available)
- [ ] Remediation guidance

---

## Phase 4: Verify AI Service Integration

### Step 4.1: Check Strands Health
```bash
curl -s http://localhost:8080/api/health | python3 -m json.tool
```

**Expected Response**:
```json
{
    "status": "healthy",  // or "degraded" if AWS not configured
    "version": "1.0.0",
    "environment": "development",
    "checks": {
        "service": "ok",
        "database": "ok",
        "aws_bedrock": "ok",  // or "warning" if not configured
        "s3_storage": "ok",
        "concurrent_processor": "ok"
    }
}
```

### Step 4.2: Check Seeded Documents
```bash
curl -s http://localhost:8080/api/seed/documents | python3 -m json.tool
```

### Step 4.3: Check Processing Queue
```bash
curl -s http://localhost:8080/api/processing/status | python3 -m json.tool
```

---

## Phase 5: Full Integration Test (CLI)

Run the automated integration test script:

```bash
cd /Users/afla/Documents/GitHub/proposal-prepper-legacy
./scripts/test-strands-integration.sh
```

This tests:
1. ✅ Service health
2. ✅ Seed data availability
3. ✅ Processing queue status
4. ✅ End-to-end analysis pipeline
5. ✅ Results retrieval

---

## Troubleshooting

### Web Page Won't Load
```bash
# Check if service is running
docker-compose -f containers/docker-compose.yml ps

# View container logs
docker-compose -f containers/docker-compose.yml logs web
```

### Analysis Stuck at "Processing"
```bash
# Check Strands logs
docker-compose -f containers/docker-compose.yml logs strands

# Check processing status
curl http://localhost:8080/api/processing/status
```

### Database Connection Error
```bash
# Check Postgres
docker-compose -f containers/docker-compose.yml logs postgres

# Verify database is healthy
docker-compose -f containers/docker-compose.yml exec postgres pg_isready
```

### Permission Denied (Linux Rootless Podman)
If using rootless Podman on Linux, ensure containers use `--userns=keep-id`:
```bash
# Check if running rootless
podman info | grep rootless
```

---

## Success Criteria

A successful end-to-end test demonstrates:

- [x] Web UI loads at http://localhost:3000
- [x] Health endpoints return "healthy" or "degraded"
- [x] Document upload succeeds
- [x] Analysis progresses through all stages
- [x] Results display compliance findings
- [x] No JavaScript console errors
- [x] API responses are valid JSON

---

## Next Steps After Testing

1. **If AWS Bedrock is configured**: Test with real AI analysis
2. **If fallback only**: Results are mock but demonstrate the flow
3. **Performance testing**: Upload multiple documents simultaneously
4. **Edge cases**: Test with malformed PDFs, large files, etc.

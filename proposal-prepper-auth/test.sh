#!/usr/bin/env bash
# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

# Auth Service Test Script
# Validates Keycloak configuration, Docker setup, and realm import
# Run this before committing changes to proposal-prepper-auth

set -e  # Exit on error
set -u  # Exit on undefined variable

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HEALTH_URL="http://localhost:8180/health/ready"
REALM_URL="http://localhost:8180/realms/proposal-prepper"
MAX_WAIT_SECONDS=60

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✖${NC} $1"
}

check_command() {
    if ! command -v "$1" &> /dev/null; then
        log_error "Required command '$1' not found"
        exit 1
    fi
}

# Main test sequence
main() {
    log_info "Running auth service validation checks..."
    echo ""

    # Change to auth service directory
    cd "$SCRIPT_DIR"

    # 1. Check required commands
    log_info "Checking required commands..."
    check_command "docker"
    check_command "curl"
    check_command "jq"
    check_command "python3"
    log_success "All required commands available"
    echo ""

    # 2. Validate configuration files
    log_info "Validating configuration files..."
    
    # Validate realm JSON
    if python3 -m json.tool config/realm-export.json > /dev/null 2>&1; then
        log_success "realm-export.json is valid JSON"
    else
        log_error "realm-export.json has invalid JSON syntax"
        exit 1
    fi

    # Validate compose YAML
    if docker compose config > /dev/null 2>&1; then
        log_success "compose.yaml is valid"
    else
        log_error "compose.yaml has invalid syntax"
        exit 1
    fi

    # Check for SPDX headers
    if grep -q "SPDX-License-Identifier" Containerfile; then
        log_success "SPDX headers present"
    else
        log_warning "SPDX headers missing in Containerfile"
    fi
    echo ""

    # 3. Check PostgreSQL is running
    log_info "Checking PostgreSQL availability..."
    cd ../proposal-prepper-infra/containers
    
    # Try to connect to PostgreSQL directly instead of checking compose output
    if docker compose exec -T postgres pg_isready -U postgres > /dev/null 2>&1; then
        log_success "PostgreSQL is running and accepting connections"
    else
        log_error "PostgreSQL is not running. Start it with: cd proposal-prepper-infra/containers && docker compose up -d postgres"
        exit 1
    fi
    cd "$SCRIPT_DIR"
    echo ""

    # 4. Build Docker image
    log_info "Building Keycloak image..."
    if docker compose build --quiet 2>&1 | grep -q "ERROR"; then
        log_error "Docker build failed"
        exit 1
    fi
    log_success "Docker image built successfully"
    echo ""

    # 5. Start service
    log_info "Starting auth service..."
    docker compose up -d
    log_success "Service started"
    echo ""

    # 6. Wait for health check
    log_info "Waiting for service to be healthy (max ${MAX_WAIT_SECONDS}s)..."
    SECONDS=0
    while [ $SECONDS -lt $MAX_WAIT_SECONDS ]; do
        if curl -sf "$HEALTH_URL" > /dev/null 2>&1; then
            log_success "Health check passed (${SECONDS}s)"
            break
        fi
        
        if [ $SECONDS -eq $MAX_WAIT_SECONDS ]; then
            log_error "Health check timeout after ${MAX_WAIT_SECONDS}s"
            log_info "Check logs with: docker compose logs keycloak"
            exit 1
        fi
        
        sleep 2
    done
    echo ""

    # 7. Verify health check response
    log_info "Verifying health check response..."
    HEALTH_STATUS=$(curl -s "$HEALTH_URL" | jq -r '.status' 2>/dev/null || echo "UNKNOWN")
    if [ "$HEALTH_STATUS" = "UP" ]; then
        log_success "Service is healthy"
    else
        log_error "Service health status: $HEALTH_STATUS"
        exit 1
    fi
    echo ""

    # 8. Verify realm import
    log_info "Verifying realm import..."
    REALM_NAME=$(curl -s "$REALM_URL" | jq -r '.realm' 2>/dev/null || echo "")
    if [ "$REALM_NAME" = "proposal-prepper" ]; then
        log_success "Realm 'proposal-prepper' imported successfully"
    else
        log_error "Realm not found or import failed"
        exit 1
    fi
    echo ""

    # 9. Check database schema
    log_info "Verifying database schema..."
    cd ../proposal-prepper-infra/containers
    TABLE_COUNT=$(docker compose exec -T postgres psql -U postgres -d proposal_prepper -t -c \
        "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='keycloak';" 2>/dev/null | tr -d ' ')
    
    if [ -n "$TABLE_COUNT" ] && [ "$TABLE_COUNT" -gt 50 ]; then
        log_success "Database schema initialized ($TABLE_COUNT tables)"
    else
        log_warning "Database schema may be incomplete (tables: $TABLE_COUNT)"
    fi
    cd "$SCRIPT_DIR"
    echo ""

    # 10. Verify admin console
    log_info "Verifying admin console..."
    if curl -s http://localhost:8180 | grep -q "Keycloak"; then
        log_success "Admin console is accessible"
    else
        log_warning "Admin console may not be accessible"
    fi
    echo ""

    # 11. Security checks
    log_info "Running security checks..."
    
    # Check for hardcoded secrets (excluding demo credentials which are documented)
    if grep -r "access.*key" config/ --exclude="*.md" 2>/dev/null | grep -v "MINIO_ACCESS_KEY" > /dev/null; then
        log_error "Potential hardcoded secrets found in config/"
        exit 1
    else
        log_success "No hardcoded secrets detected"
    fi

    # Check realm export doesn't have production credentials
    if grep -i "production\|prod" config/realm-export.json > /dev/null 2>&1; then
        log_warning "Found 'production' references in realm config"
    fi
    echo ""

    # Summary
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    log_success "All validation checks passed!"
    echo ""
    log_info "Service is running at: http://localhost:8180"
    log_info "Admin console: http://localhost:8180 (admin/admin)"
    log_info "Realm: http://localhost:8180/realms/proposal-prepper"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

# Run main function
main "$@"

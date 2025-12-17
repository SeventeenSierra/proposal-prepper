#!/bin/bash
# SPDX-License-Identifier: AGPL-3.0-or-later
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
#
# Strands Integration Test Script
# Tests the end-to-end workflow: health → seed documents → analysis → results

set -e

STRANDS_URL="${STRANDS_URL:-http://localhost:8080}"
WEB_URL="${WEB_URL:-http://localhost:3000}"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         Strands Integration Test Suite                       ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo "║ Strands URL: $STRANDS_URL"
echo "║ Web URL:     $WEB_URL"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

test_passed=0
test_failed=0

# Function to test an endpoint
test_endpoint() {
    local name="$1"
    local url="$2"
    local expected_status="${3:-200}"
    
    echo -n "Testing: $name... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")
    
    if [ "$response" = "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $response)"
        ((test_passed++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (Expected $expected_status, got $response)"
        ((test_failed++))
        return 1
    fi
}

# Function to get JSON response
get_json() {
    local url="$1"
    curl -s "$url" 2>/dev/null
}

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}📋 Phase 1: Health Checks${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Test Strands health
test_endpoint "Strands Health" "$STRANDS_URL/api/health"

# Get detailed health status
echo ""
echo "Detailed Strands Health:"
health_response=$(get_json "$STRANDS_URL/api/health")
echo "$health_response" | python3 -m json.tool 2>/dev/null || echo "$health_response"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}📄 Phase 2: Seed Data Verification${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Test seed endpoints
test_endpoint "Seed Status" "$STRANDS_URL/api/seed/status"
test_endpoint "Seeded Documents" "$STRANDS_URL/api/seed/documents"

# Get seeded documents count
echo ""
echo "Seeded Documents:"
seed_response=$(get_json "$STRANDS_URL/api/seed/documents")
doc_count=$(echo "$seed_response" | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('count', 0))" 2>/dev/null || echo "0")
echo "  Total seeded documents: $doc_count"

# Get first document ID for analysis test
first_doc_id=$(echo "$seed_response" | python3 -c "import sys, json; d=json.load(sys.stdin); docs=d.get('documents', []); valid=next((doc for doc in docs if 'baecher' in doc.get('filename','').lower()), docs[0] if docs else {}); print(valid.get('document_id', ''))" 2>/dev/null || echo "")
first_doc_name=$(echo "$seed_response" | python3 -c "import sys, json; d=json.load(sys.stdin); docs=d.get('documents', []); valid=next((doc for doc in docs if 'baecher' in doc.get('filename','').lower()), docs[0] if docs else {}); print(valid.get('filename', ''))" 2>/dev/null || echo "")
first_doc_key=$(echo "$seed_response" | python3 -c "import sys, json; d=json.load(sys.stdin); docs=d.get('documents', []); valid=next((doc for doc in docs if 'baecher' in doc.get('filename','').lower()), docs[0] if docs else {}); print(valid.get('s3_key', ''))" 2>/dev/null || echo "")

if [ -n "$first_doc_id" ]; then
    echo "  First document: $first_doc_name (ID: $first_doc_id)"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🔄 Phase 3: Processing Queue${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Test processing status
test_endpoint "Processing Status" "$STRANDS_URL/api/processing/status"

echo ""
echo "Processing Queue Status:"
processing_response=$(get_json "$STRANDS_URL/api/processing/status")
echo "$processing_response" | python3 -m json.tool 2>/dev/null || echo "$processing_response"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🤖 Phase 4: End-to-End Analysis Test${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

if [ -n "$first_doc_id" ]; then
    echo "Starting analysis for document: $first_doc_name"
    echo ""
    
    # Start analysis
    analysis_request="{\"document_id\": \"$first_doc_id\", \"filename\": \"$first_doc_name\", \"s3_key\": \"$first_doc_key\", \"proposal_id\": \"$first_doc_id\", \"frameworks\": [\"FAR\", \"DFARS\"]}"
    
    echo "Request payload:"
    echo "$analysis_request" | python3 -m json.tool 2>/dev/null || echo "$analysis_request"
    echo ""
    
    start_response=$(curl -s -X POST "$STRANDS_URL/api/analysis/start" \
        -H "Content-Type: application/json" \
        -d "$analysis_request")
    
    echo "Start Analysis Response:"
    echo "$start_response" | python3 -m json.tool 2>/dev/null || echo "$start_response"
    
    # Extract session ID
    session_id=$(echo "$start_response" | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('session_id', ''))" 2>/dev/null || echo "")
    
    if [ -n "$session_id" ]; then
        echo -e "${GREEN}✓ Analysis started with session ID: $session_id${NC}"
        ((test_passed++))
        
        # Poll for status
        echo ""
        echo "Polling for analysis status..."
        for i in {1..10}; do
            sleep 3
            status_response=$(get_json "$STRANDS_URL/api/analysis/$session_id")
            status=$(echo "$status_response" | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('status', ''))" 2>/dev/null || echo "")
            progress=$(echo "$status_response" | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('progress', 0))" 2>/dev/null || echo "0")
            step=$(echo "$status_response" | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('current_step', ''))" 2>/dev/null || echo "")
            
            echo "  [$i/10] Status: $status | Progress: $progress% | Step: $step"
            
            if [ "$status" = "completed" ]; then
                echo -e "${GREEN}✓ Analysis completed!${NC}"
                ((test_passed++))
                break
            elif [ "$status" = "failed" ]; then
                echo -e "${RED}✗ Analysis failed${NC}"
                ((test_failed++))
                break
            fi
        done
        
        # Get results
        if [ "$status" = "completed" ]; then
            echo ""
            echo "Fetching results..."
            results_response=$(get_json "$STRANDS_URL/api/analysis/$session_id/results")
            
            echo ""
            echo "Analysis Results:"
            echo "$results_response" | python3 -m json.tool 2>/dev/null | head -50 || echo "$results_response"
            
            # Extract summary
            total_issues=$(echo "$results_response" | python3 -c "import sys, json; d=json.load(sys.stdin); r=d.get('results', {}); s=r.get('summary', {}); print(s.get('total_issues', 0))" 2>/dev/null || echo "0")
            overall_score=$(echo "$results_response" | python3 -c "import sys, json; d=json.load(sys.stdin); r=d.get('results', {}); s=r.get('summary', {}); print(s.get('overall_score', 0))" 2>/dev/null || echo "0")
            
            echo ""
            echo -e "${YELLOW}Summary:${NC}"
            echo "  Total Issues: $total_issues"
            echo "  Overall Score: $overall_score%"
        fi
    else
        echo -e "${RED}✗ Failed to start analysis${NC}"
        ((test_failed++))
    fi
else
    echo -e "${YELLOW}⚠ No seeded documents available for analysis test${NC}"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🌐 Phase 5: Web Service Check${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Test web service
test_endpoint "Web Health" "$WEB_URL/api/health" || true

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    TEST SUMMARY                               ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo -e "║  ${GREEN}Passed: $test_passed${NC}                                              "
echo -e "║  ${RED}Failed: $test_failed${NC}                                              "
echo "╚══════════════════════════════════════════════════════════════╝"

if [ $test_failed -gt 0 ]; then
    exit 1
else
    exit 0
fi

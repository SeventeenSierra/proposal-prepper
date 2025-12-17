#!/bin/bash
set -e
STRANDS_URL="${STRANDS_URL:-http://localhost:8080}"

echo "Fetching seeded documents..."
seed_response=$(curl -s "$STRANDS_URL/api/seed/documents")

# Filter for the 10 valid documents based on filename
doc_data=$(echo "$seed_response" | python3 -c "import sys, json; \
d=json.load(sys.stdin); \
docs=d.get('documents', []); \
valid_f = ['baecher_joseph_2023', 'baecher_joseph_2024', 'barker_michelle_2020', 'bertolet_brittnil_2021', 'brown_ctitus_2014', 'frazer_ryane_2019', 'gregory_samantha_2018', 'jensen_jan_2015', 'nell_lucas_2022', 'polino_alexander_2017']; \
valid_docs = [doc for doc in docs if any(f in doc.get('filename','') for f in valid_f)]; \
print('\n'.join([f\"{doc.get('document_id','')}|{doc.get('filename','')}|{doc.get('s3_key','')}\" for doc in valid_docs]))")

echo "Found valid documents (Count: $(echo "$doc_data" | wc -l))"
echo "--------------------------------------------------"

echo "$doc_data" | while IFS='|' read -r doc_id doc_name doc_key; do
  if [ -z "$doc_id" ]; then continue; fi
  echo "Starting analysis for: $doc_name"
  
  analysis_request="{\"document_id\": \"$doc_id\", \"filename\": \"$doc_name\", \"s3_key\": \"$doc_key\", \"proposal_id\": \"$doc_id\", \"frameworks\": [\"FAR\", \"DFARS\"]}"
  
  start_response=$(curl -s -X POST "$STRANDS_URL/api/analysis/start" \
    -H "Content-Type: application/json" \
    -d "$analysis_request")
  
  session_id=$(echo "$start_response" | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('session_id', ''))" 2>/dev/null || echo "")
  
  if [ -n "$session_id" ]; then
    echo "  Session ID: $session_id"
    for i in {1..20}; do
      sleep 1
      status_response=$(curl -s "$STRANDS_URL/api/analysis/$session_id")
      status=$(echo "$status_response" | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('status', ''))" 2>/dev/null || echo "")
      progress=$(echo "$status_response" | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('progress', 0))" 2>/dev/null || echo "0")
      
      if [ "$status" = "completed" ]; then
        score=$(echo "$status_response" | python3 -c "import sys, json; d=json.load(sys.stdin); r=d.get('result', {}); s=r.get('summary', {}); print(s.get('overall_score', 'N/A'))" 2>/dev/null || echo "N/A")
        # If score is not in status response, try fetching results
        if [ "$score" = "N/A" ] || [ -z "$score" ]; then
             res=$(curl -s "$STRANDS_URL/api/analysis/$session_id/results")
             score=$(echo "$res" | python3 -c "import sys, json; d=json.load(sys.stdin); r=d.get('results', {}); s=r.get('summary', {}); print(s.get('overall_score', 'N/A'))" 2>/dev/null || echo "N/A")
        fi
        echo "  ✓ Completed. Score: $score"
        echo ""
        break
      elif [ "$status" = "failed" ]; then
        echo "  ✗ Failed."
        echo ""
        break
      fi
    done
  else
    echo "  ✗ Failed to start."
  fi
done

# Architecture Documentation Updated

## Changes Made to `architecture_on_prem_vs_cloud.md`

### 1. Updated Architecture Diagram

**Added**:
- **Orchestration Layer** (green, active): LangChain/LangGraph + LiteLLM
- Shows LiteLLM connecting to multiple providers (Ollama, Bedrock, OpenAI, Anthropic)
- Clear visual hierarchy: Services → Orchestration → Providers → Agents

**Updated**:
- Agents now connect through LangChain (not directly to providers)
- Strands shown in "Future Consideration" box (grayed out, dashed border)

### 2. Updated Tier 2 Section

**Before**: "Context (Only for AI Router)"  
**After**: "Orchestration & Providers"

**New tables**:
- **Current Architecture** - Shows active stack (LangChain, LiteLLM, Ollama)
- **Historical Context** - Documents Strands was considered but not adopted

**Added note**: Explains WHY we chose LangChain + LiteLLM (provider independence + local development)

### 3. Added "Orchestration Architecture (Current)" Section

**New content**:
- Code example showing LiteLLM provider abstraction
- Benefits list (5 key points)
- Emphasizes local-first approach

### 4. Renamed AWS Section

**Before**: "AWS Cloud Architecture (Future)"  
**After**: "AWS Cloud Architecture (Historical Reference)"

**Updated note**: 
- Clarifies Strands SDK plan was **not implemented**
- Explains we chose LangChain + LiteLLM instead
- Notes Strands remains future consideration

---

## Key Messages Communicated

1. **Active Stack**: LangChain + LiteLLM is our production approach
2. **Provider Agnostic**: Can use any LLM (local or cloud)
3. **Local-First**: Full functionality without cloud dependencies
4. **Historical Context**: Strands was considered but we chose flexibility
5. **Future Open**: Strands could be reconsidered if AWS optimizations needed

---

## Visual Changes

**Diagram colors**:
- 🟢 Green (active): LangChain, LiteLLM
- ⚫ Gray/dashed (historical): Strands SDK
- 🔴 Red (demo): Mock responses
- ⚪ White/dotted (available): Cloud providers (opt-in)

---

## Impact on Session 15

This documentation now supports the implementation plan:
- Clear that we're using LangChain for orchestration
- LiteLLM provides provider flexibility
- Strands reference preserved for context
- Architecture aligned with technical decisions

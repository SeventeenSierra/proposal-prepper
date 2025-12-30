# Strands Integration Analysis

## What is Strands?

**Strands Agents** is AWS's open-source SDK for building AI agents with:
- Model-driven orchestration (LLM plans and executes)
- Multi-agent primitives (handoffs, swarms, workflows)
- Native AWS Bedrock integration
- Tool integration via Model Context Protocol (MCP)
- Python 3.10+ framework

## What You Have Locally

Looking at your codebase:

### ✅ Already Exists
1. **proposal-prepper-backend** (Python/FastAPI)
   - Port 8080
   - Health endpoints
   - AWS Bedrock integration ready
   - FastAPI service structure

2. **Full local stack**
   - PostgreSQL, Redis, MinIO
   - Web service (Next.js)
   - Analysis service architecture
   - Mock/demo/live modes working

### ❌ What's Missing
**There is NO `proposal-prepper-strands` directory** in your codebase.

The documentation REFERENCES strands but it **doesn't exist yet**.

---

## The Confusion

Your docs mention "strands service" but:
- No `proposal-prepper-strands/` directory
- `proposal-prepper-backend/` is your Python service
- References to strands were PLANNED, not IMPLEMENTED

**Architecture docs say**:
- "Web + Strands" federated mesh
- "Strands Service processes sensitive documents"  
- "Strands connects to AWS Bedrock"

**Reality**: You have `proposal-prepper-backend` which IS meant to be the strands service.

---

## Do You Need An Orchestrator? YES

But you want **provider-independent**, not AWS-locked.

### Recommended: LangChain + LiteLLM ✅

**LangChain/LangGraph**:
- Agent orchestration framework
- Multi-agent coordination
- Tool/function calling
- Workflow graphs
- Python-based (works with your FastAPI backend)
- **Provider agnostic** - works with any LLM

**LiteLLM**:
- Unified interface for 100+ LLM providers
- Bedrock, OpenAI, Anthropic, local models, all same API
- Easy provider switching
- Cost tracking
- Fallbacks and retries

**Why this combo**:
- Not locked to AWS
- Can use local models (Llama, etc.)
- Can switch between Bedrock, OpenAI, local seamlessly
- Production-ready patterns
- Large community

### Architecture

```python
from langchain.agents import AgentExecutor
from langchain.tools import tool
from litellm import completion

# LiteLLM handles provider abstraction
def get_llm_response(messages, provider="bedrock"):
    response = completion(
        model=f"{provider}/claude-3-sonnet",
        messages=messages
    )
    return response

# LangChain handles orchestration
@tool
def extract_citations(document_text: str):
    """Extract EO and FAR citations from document"""
    # Your extraction logic
    pass

@tool  
def validate_citation(citation: str, context: str):
    """Validate a single citation"""
    # Your validation logic
    pass

# Create agent with tools
from langchain.agents import create_openai_tools_agent
agent = create_openai_tools_agent(
    llm=get_llm_response,
    tools=[extract_citations, validate_citation]
)

executor = AgentExecutor(agent=agent, tools=tools)
```

### Installation

```bash
cd proposal-prepper-backend
pip install langchain langgraph litellm
```

---

## Updated Session 15 Plan

### Section 1: Setup Local Orchestration
**Scope**: `backend`
- [ ] Install langchain, langgraph, litellm
- [ ] Configure LiteLLM for multi-provider (Bedrock, local models)
- [ ] Create agent definitions using LangChain
- [ ] Wire to FastAPI endpoints

### Section 2-5: (Keep existing plan)
Continue with dual upload, citation extraction, validation

---

## Provider Flexibility

With LiteLLM, you can easily switch:

```python
# Use AWS Bedrock
response = completion(model="bedrock/claude-3-sonnet", messages=msgs)

# Use local Llama
response = completion(model="ollama/llama3", messages=msgs)

# Use OpenAI
response = completion(model="gpt-4", messages=msgs)

# Same API, different providers!
```

---

## Answer to Your Question

**Q**: "I thought we were going to use a local orchestrator like litellm or lang or some llama?; I don't want to rebuild the orchestration; I just don't want to use aws' orchestrator"

**A**: You're absolutely right! 

**Use**: LangChain (orchestration) + LiteLLM (provider abstraction)

**Benefits**:
- ✅ Not locked to AWS
- ✅ Can use local models (Llama via Ollama)
- ✅ Provider-agnostic
- ✅ Don't rebuild orchestration (LangChain provides it)
- ✅ Works with your existing FastAPI backend

**Recommendation**: Install LangChain + LiteLLM in `proposal-prepper-backend`, configure for multi-provider support.

### Option A: Use Strands SDK ✅ RECOMMENDED
**Why**:
- Built by AWS specifically for agent orchestration
- Multi-agent primitives (you need multiple agents: citation extractor, validator, etc.)
- Model-driven planning (LLM decides workflow dynamically)
- MCP tool integration (EO Crawler could be an MCP server)
- Production-ready patterns

**How**:
```bash
cd proposal-prepper-backend
pip install strands-agents
```

**Integrate with existing FastAPI**:
```python
from strands import Agent, Tool
from fastapi import FastAPI

app = FastAPI()  # Your existing app

# Define agents
citation_agent = Agent(
    name="citation-extractor",
    instructions="Extract EO and FAR citations from J&A documents",
    tools=[extract_citations_tool]
)

validator_agent = Agent(
    name="compliance-validator",
    instructions="Validate extracted citations",
    tools=[validate_far_tool, validate_eo_tool]
)

@app.post("/api/analysis/start")
async def start_analysis(files):
    # Use strands for orchestration
    result = await citation_agent.run(files.ja_content)
    validation = await validator_agent.run(result.citations)
    return validation
```

### Option B: Build Custom Orchestration ❌ NOT RECOMMENDED
**Why NOT**:
- Reinventing what Strands already does
- Complex multi-agent coordination
- Need workflow management
- Error handling, retries, state management

**When it makes sense**: If you have very simple, linear workflows

---

## Recommended Architecture

### Rename + Integrate
1. **Keep `proposal-prepper-backend`** as your orchestration service
2. **Install Strands SDK** inside it
3. **Define agents**:
   - CitationExtractor agent
   - ComplianceValidator agent
   - DocumentParser agent (if needed)
4. **Use Strands for orchestration**, FastAPI for HTTP API

### Benefits
- Leverage AWS-built framework
- Focus on YOUR compliance logic, not orchestration plumbing
- Multi-agent workflows out of the box
- Production-ready patterns

---

## Updated Session 15 Plan

### Section 1: Setup Strands in Backend Service
**Scope**: `backend`
- [ ] Install strands-agents SDK
- [ ] Create agent definitions (citation, validator)
- [ ] Wire agents to FastAPI endpoints

### Section 2-5: (Keep existing plan)
Continue with dual upload, citation extraction, validation as planned

---

## Answer to Your Question

**Q**: "We're set up to do full orchestration with everything we have locally; is there something we're missing and why we'd need the strands?"

**A**: You have the INFRASTRUCTURE (FastAPI service, database, etc.) but you DON'T have the AGENT ORCHESTRATION FRAMEWORK.

Strands provides:
- Multi-agent coordination
- Workflow planning
- Tool integration
- State management
- Error handling patterns

**You COULD build this yourself**, but Strands is AWS-maintained, production-ready, and solves exactly this problem.

**Recommendation**: Add Strands SDK to your existing `proposal-prepper-backend` service. Don't create a separate service, just enhance what you have.

# Security & Workflow Reference (from "Verify Project After Security")

## Core Principles
1. **Design First** - No code without a design document
2. **Test First** - Write tests before implementation
3. **Atomic Commits** - One logical change per commit
4. **Blocking Review** - AI CANNOT proceed until human confirms ALL checklist items
5. **Microservice Architecture** - Follow Federated Mesh patterns

## Security Measures
- 🔒 Signed commits required (DCO compliance)
- 📦 Port Protection: Docker network isolation (remove port mappings from containers)
- 🔐 Railway deployment with secrets management
- 🛡️ AWS Bedrock secure integration

## OBI Alignment Tasks
- [x] Align `design.md` with 7-step analysis granularity and security hardening
- [x] Align `requirements.md` with granular progress feedback and security protocols
- [x] Align `tasks.md` with completed architecture and security milestones

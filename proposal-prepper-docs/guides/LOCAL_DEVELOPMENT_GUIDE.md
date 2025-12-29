# Local Development Guide - Proposal Prepper

This guide outlines the two primary ways to run Proposal Prepper locally for development, testing, and demonstrations.

---

## 🏗️ The Analysis Engine

The **Analysis Engine** is the backend service responsible for AI analysis and document processing.
- **In Local Mode (Default)**: The engine runs locally in a container, powered by **LiteLLM + LangGraph** (Open Source).
- **In Cloud Mode**: The engine interfaces with the **Strands SDK** (Proprietary).

By default, the local environment starts the full stack (Web UI + Analysis Engine + Infrastructure).

---

## 1. Local Mode (Default - Full Stack)

**Purpose**: End-to-end validation of the entire application with real data processing. This is the **Standard On-Prem** configuration.

### When to use Local Mode:
- Testing document extraction and text processing.
- Developing real AI agent logic in the `analysis-engine` service.
- Validating database schema changes or migrations.
- Final verification of the "On-Prem" architecture.

### How to start:
1. Ensure Podman/Docker is running.
2. Start the full service stack:
   ```bash
   ./proposal-prepper-infra/containers/start.sh -d
   ```
3. The Web UI will show a **Local Mode** badge (Emerald/Green).
4. Access the app at `http://localhost:3000`.

---

## 2. Mock Mode (Opt-in - UI Only)

**Purpose**: High-speed development of UI components, prototyping, and testing frontend logic without backend overhead.

### When to use Mock Mode:
- Building new UI layouts or design systems.
- Prototyping "what-if" scenarios by simulating analysis steps.
- Demos where speed is critical and real extraction isn't the focus.

### How to start:
1. Start ONLY the Web UI with simulation enabled:
   ```bash
   ./proposal-prepper-infra/containers/start.sh --mock -d
   ```
2. The Web UI will show a **Mock Mode** badge (Amber/Orange).
3. Access the app at `http://localhost:3000`.

---

## Key Configuration Variables

| Variable | Description | Local Default | Mock Default |
| :--- | :--- | :--- | :--- |
| `USE_MOCK` | Toggle between real engine and simulators | `false` | `true` |
| `ENGINE_SERVICE_URL`| URL for the backend API | `http://analysis-engine:8080` | `N/A` |

---

## Troubleshooting

- **Icon Issues**: We use `lucide-react` exclusively. See [UI_DEVELOPMENT_GUIDE.md](UI_DEVELOPMENT_GUIDE.md).
- **Restart Loops**: If the `analysis-engine` restarts frequently, ensure the `.venv` directory is excluded from the `uvicorn` watcher in `startup.py`.

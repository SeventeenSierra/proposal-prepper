# Design: Minimalist Dual-Mode UI & Multi-Agent Analysis

## 1. Landing Page (`src/app/page.tsx`)
**Concept**: UI Development Guide (Content Page).
**Style**: Clean documentation style.

## 2. App Welcome Screen (`src/components/rfp/rfp-interface.tsx`)
**Style**: Minimalist, centered.
**Grid**: Demo Mode vs Real Mode.

## 3. Environment Indicator (Glow)
**Concept**: Ambient glow around the viewport to indicate the active mode.
**Logic**:
- **Demo Mode**: **Yellow/Amber** Glow. (Signifies "Mock/Simulation").
- **Real Mode**: **Green** Glow. (Signifies "Connected/Live").
- **Implementation**: Fixed `div` with `pointer-events-none` and large inset box-shadow.

## 4. Multi-Agent Analysis Visualization (`src/components/shared/active-agents-view.tsx`)
**Visuals**:
- **Central Node**: Proposal Document.
- **Satellite Nodes**: Active Agents (Compliance, Budget, Technical, Quality).
- **Animation**: Agents pulsing/scanning.

## 5. Upload Workflow Cleanup
- Fix "Green Box" false positive.

## 6. Backend Fix
- Pass `s3_key`.

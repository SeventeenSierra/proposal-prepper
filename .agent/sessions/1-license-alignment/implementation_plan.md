# Implementation Plan: Legal and Contributor Alignment

Resolve legal contradictions regarding the web application's license and streamline the contribution process for corporate entities (like large corporations) by emphasizing DCO over CLA.

## User Review Required

> [!IMPORTANT]
> I will switch the `proposal-prepper-web` component to **PolyForm-Perimeter-1.0.0** in all documentation to match `package.json`. This replaces the "All Rights Reserved" status for this component.

> [!NOTE]
> I will update `CONTRIBUTING.md` to lead with **DCO (Developer Certificate of Origin)** and provide clarity on the **CLA**, acknowledging that corporate legal teams (like large corporations) may require a DCO-only path.

## Proposed Changes

### License Distribution

| License Type | Folders |
| :--- | :--- |
| **PolyForm Strict 1.0.0** | `/` (root), `proposal-prepper-infra/`, `proposal-prepper-tests/` |
| **PolyForm Perimeter 1.0.0** | `.agent/`, `.github/`, `.husky/`, `.kiro/`, `.vscode/` |
| **PolyForm-Perimeter-1.0.0** | `proposal-prepper-web/` |
| **All Rights Reserved** | `proposal-prepper-backend/`, `proposal-prepper-services/`, `proposal-prepper-middleware/` |
| **CC-BY-SA-4.0** | `proposal-prepper-docs/` |

#### [MODIFY] [LICENSING.md](file:///Users/afla/Documents/proposal-prepper/proposal-prepper-docs/governance/LICENSING.md)
Update the license table and detailed sections to explicitly state that the Web App is PolyForm-Perimeter-1.0.0. Remove legacy "All Rights Reserved" references for the web component.

#### [MODIFY] [CONTRIBUTING.md](file:///Users/afla/Documents/proposal-prepper/proposal-prepper-docs/governance/CONTRIBUTING.md)
Refine the contribution section to prioritize DCO sign-off. Add a note regarding the CLA specifically for corporate contributors to prevent legal standoffs.

#### [MODIFY] [LICENSE](file:///Users/afla/Documents/proposal-prepper/proposal-prepper-web/LICENSE) [NEW]
Ensure the full AGPLv3 text is present in the web folder.

## Verification Plan

### Manual Verification
- Confirm `LICENSING.md` and `package.json` are in sync for the web component.
- Verify `CONTRIBUTING.md` provides a clear, frictionless path for corporate contributors.



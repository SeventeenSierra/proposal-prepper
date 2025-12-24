# Session Record: Podman-Docker Compatibility

**Session**: 2-podman-fix  
**Date**: 2025-12-23  
**Agent**: Antigravity (Gemini 2.0)

## Objective
Establish a robust, global Podman-Docker compatibility layer using Nix-managed shims in the `workstation-setup` repository, and revert project-specific hacks in `proposal-prepper`.

## Accomplishments
1. **Workstation Setup Integration**:
    - Created `modules/shared/containers.nix` in the `workstation-setup` repository.
    - Defined `docker-compat` and `docker-compose-compat` packages using `pkgs.writeShellScriptBin` to proxy to Podman.
    - Integrated the module into the workstation's `flake.nix` for global availability.
2. **Proposal Prepper Cleanup**:
    - Reverted `flake.nix` to use standard `docker` and `docker-compose` packages (now provided by the workstation shims).
    - Cleared `.gitignore` of temporary shim directories.
    - Verified connectivity: Successfully started the Podman machine and tested `docker ps` through the new shim.

## Decisions & Rationale
- **Global vs. Project-Specific**: Moved compatibility logic to the workstation level to ensure consistency across all projects and support non-interactive tools (like MCP servers).
- **Environment Variables**: Removed hardcoded `DOCKER_HOST` in favor of Podman's default dynamic management on macOS.

## Verification
- Verified `docker --version` and `docker ps` run Podman commands.
- Confirmed Podman machine lifecycle (init/start) works via workstation scripts.

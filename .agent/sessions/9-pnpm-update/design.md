# Design: PNPM Update (Nix-Managed)

## Architecture
The `pnpm` tool is managed as a `buildInput` in `flake.nix` within the `devShells.default` output.

## Strategy
1. **Update Flake**: Execute `nix flake update` to refresh the `nixpkgs` input which provides `pnpm`.
2. **Verify Version**: Check `pnpm --version` after updating.
3. **Handle Failure**: If `nix flake update` doesn't provide the latest `pnpm`, we may need to use a more specific pinning or inform the user that their Nix channel is trailing.

## Microservices Affected
- All (infrastructure level)

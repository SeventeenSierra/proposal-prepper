# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

{
  description = "Proposal Prepper (Contract Checker) - NSF PAPPG Compliance Validation";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        devShells.default = pkgs.mkShellNoCC {
          buildInputs = with pkgs; [
            nodejs_22
            pnpm
            biome
            
            # Python for strands-agent service
            python313
            python313Packages.pip
            python313Packages.uvicorn
            python313Packages.fastapi
            python313Packages.boto3
            python313Packages.botocore
            python313Packages.pydantic
            python313Packages.pydantic-settings
            python313Packages.structlog
            python313Packages.python-dotenv
            python313Packages.python-multipart
            python313Packages.psutil
            python313Packages.httpx
            python313Packages.pypdf
            python313Packages.sqlalchemy
            python313Packages.redis
            python313Packages.asyncpg
            python313Packages.psycopg2
            python313Packages.opensearch-py
            python313Packages.python-json-logger
            python313Packages.python-jose

            # Container runtime options
            docker
            docker-compose
            podman
            podman-compose

            # E2E testing (Playwright)
            playwright

            # Optional: keep a stable tsc version handy
            nodePackages.typescript

            # Secret detection & history cleaning
            gitleaks
            git-filter-repo

            # GCP tools
            google-cloud-sdk

            # Local Workflow Runners & Security
            act
            semgrep
            trivy
          ];

          shellHook = ''
            echo "🚀 Proposal Prepper Dev Environment"
            echo "Node: $(node --version)"
            echo "pnpm: $(pnpm --version)"
            
            # Setup Python Virtual Environment for missing nixpkgs
            if [ ! -d ".venv" ]; then
              python3 -m venv .venv
            fi
            source .venv/bin/activate
            pip install --quiet litellm langgraph langchain-openai
            
            # Mimic IDX web preview command
            alias web='pnpm run dev -- --port ''${PORT:-3000} --hostname 0.0.0.0'
            echo "💡 Run 'web' to start the dev server (host: 0.0.0.0, port: \''${PORT:-3000})"
          '';
        };

      }
    );
}

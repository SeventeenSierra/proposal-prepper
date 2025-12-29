-- SPDX-License-Identifier: PolyForm-Strict-1.0.0
-- SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

# Proposal Prepper Development Environment Makefile

.PHONY: help dev up down build clean logs shell-web shell-strands db-shell test

# Default target
help:
	@echo "Proposal Prepper Development Environment"
	@echo ""
	@echo "Available commands:"
	@echo "  dev          - Start development environment (build + up)"
	@echo "  up           - Start all services"
	@echo "  down         - Stop all services"
	@echo "  build        - Build all container images"
	@echo "  clean        - Stop services and remove volumes"
	@echo "  logs         - Show logs from all services"
	@echo "  shell-web    - Open shell in web container"
	@echo "  shell-strands - Open shell in strands container"
	@echo "  db-shell     - Open PostgreSQL shell"
	@echo "  test         - Run tests in containers"

# Start development environment
dev: build up

# Start all services
up:
	cd ../containers && podman-compose up -d
	@echo "Services starting..."
	@echo "Web app: http://localhost:3000"
	@echo "Strands API: http://localhost:8080"
	@echo "MinIO Console: http://localhost:9001"
	@echo "PostgreSQL: localhost:5432"
	@echo "Redis: localhost:6379"

# Stop all services
down:
	cd ../containers && podman-compose down

# Build all images
build:
	cd ../containers && podman-compose build

# Clean up everything
clean:
	cd ../containers && podman-compose down -v --remove-orphans
	podman system prune -f

# Show logs
logs:
	cd ../containers && podman-compose logs -f

# Open shell in web container
shell-web:
	cd ../containers && podman-compose exec web sh

# Open shell in strands container
shell-strands:
	cd ../containers && podman-compose exec strands bash

# Open PostgreSQL shell
db-shell:
	cd ../containers && podman-compose exec postgres psql -U postgres -d proposal_prepper

# Run tests
test:
	cd ../containers && podman-compose exec web npm test
	cd ../containers && podman-compose exec strands python -m pytest

# Check service health
health:
	@echo "Checking service health..."
	@curl -s http://localhost:3000 > /dev/null && echo "✓ Web service is healthy" || echo "✗ Web service is down"
	@curl -s http://localhost:8080/health > /dev/null && echo "✓ Strands service is healthy" || echo "✗ Strands service is down"
	@cd ../containers && podman-compose exec postgres pg_isready -U postgres > /dev/null && echo "✓ PostgreSQL is healthy" || echo "✗ PostgreSQL is down"
	@cd ../containers && podman-compose exec redis redis-cli ping > /dev/null && echo "✓ Redis is healthy" || echo "✗ Redis is down"
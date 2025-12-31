-- SPDX-License-Identifier: PolyForm-Strict-1.0.0
-- SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

-- Create Keycloak schema for auth microservice
-- This allows Keycloak to use the same PostgreSQL instance as other services

-- Create dedicated schema for Keycloak
CREATE SCHEMA IF NOT EXISTS keycloak;

-- Grant permissions to postgres user (Keycloak will use this user)
GRANT ALL PRIVILEGES ON SCHEMA keycloak TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA keycloak TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA keycloak TO postgres;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA keycloak GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA keycloak GRANT ALL ON SEQUENCES TO postgres;

-- Keycloak will create its own tables in this schema automatically

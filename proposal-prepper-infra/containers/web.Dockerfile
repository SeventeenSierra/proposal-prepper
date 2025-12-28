# SPDX-License-Identifier: PolyForm-Perimeter-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

# Development Dockerfile for Next.js web application
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install curl for health checks and pnpm
RUN apk add --no-cache curl && npm install -g pnpm@10.26.2

# Ensure permissions for node user
RUN mkdir -p /app && chown -R node:node /app

USER node

# Copy package files
COPY --chown=node:node pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=node:node proposal-prepper-web/package.json ./proposal-prepper-web/
COPY --chown=node:node proposal-prepper-services/package.json ./proposal-prepper-services/
COPY --chown=node:node proposal-prepper-middleware/package.json ./proposal-prepper-middleware/
COPY --chown=node:node proposal-prepper-tests/package.json ./proposal-prepper-tests/

# Install dependencies (allow lockfile updates in development)
RUN pnpm install

# Copy source code
COPY --chown=node:node . .

# Set working directory to the web app
WORKDIR /app/proposal-prepper-web

# Expose port
EXPOSE 3000

# Set environment variables for development
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Switch to non-root user
USER node

# Start development server
CMD ["pnpm", "dev"]
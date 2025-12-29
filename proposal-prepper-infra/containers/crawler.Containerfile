# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

# Local Regulatory Crawler service (Lambda Simulation)
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user for security
RUN useradd --create-home --shell /bin/bash appuser && \
    chown -R appuser:appuser /app

USER appuser

# Copy requirements first for better caching
COPY --chown=appuser:appuser requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --user -r requirements.txt

# Copy source code
COPY --chown=appuser:appuser . .

# Set environment variables for development
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1
ENV PATH="/home/appuser/.local/bin:${PATH}"

# Start the crawler
CMD ["python", "local_eo_crawler.py"]

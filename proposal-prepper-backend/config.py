# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC


"""
Configuration management for the Analysis Engine service.

This module handles environment variables and application settings
using Pydantic for validation and type safety.
"""

import os
from typing import Optional
from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings with environment variable support."""
    
    # Service configuration
    environment: str = Field(default="development", env="ENVIRONMENT")
    host: str = Field(default="0.0.0.0", env="HOST")
    port: int = Field(default=8080, env="PORT")
    log_level: str = Field(default="INFO", env="LOG_LEVEL")
    log_to_file: bool = Field(default=False, env="LOG_TO_FILE")
    analysis_provider: str = Field(default="local", env="ANALYSIS_PROVIDER")
    analysis_mode: str = Field(default="local", env="ANALYSIS_MODE")
    air_spec_mode: bool = Field(default=True, env="AIR_SPEC_MODE")
    environment_provider: str = Field(default="local", env="ENVIRONMENT_PROVIDER")
    
    # AWS configuration
    aws_region: str = Field(default="us-east-1", env="AWS_REGION")
    aws_access_key_id: Optional[str] = Field(default=None, env="AWS_ACCESS_KEY_ID")
    aws_secret_access_key: Optional[str] = Field(default=None, env="AWS_SECRET_ACCESS_KEY")
    bedrock_model_id: str = Field(default="anthropic.claude-3-sonnet-20240229-v1:0", env="BEDROCK_MODEL_ID")
    
    # Local LLM configuration
    use_local_llm: bool = Field(default=False, env="USE_LOCAL_LLM")
    local_llm_url: str = Field(default="http://localhost:11434", env="LOCAL_LLM_URL") # Ollama default
    local_llm_model: str = Field(default="llama3.1", env="LOCAL_LLM_MODEL")
    
    # Database configuration
    database_url: str = Field(
        default="postgresql://postgres:password@postgres:5432/proposal_prepper",
        env="DATABASE_URL"
    )
    
    # Redis configuration
    redis_url: str = Field(
        default="redis://redis:6379/0",
        env="REDIS_URL"
    )
    
    # MinIO/S3 configuration
    s3_endpoint_url: Optional[str] = Field(default="http://minio:9000", env="S3_ENDPOINT_URL")
    s3_access_key: str = Field(default="minioadmin", env="S3_ACCESS_KEY")
    s3_secret_key: str = Field(default="minioadmin", env="S3_SECRET_KEY")
    s3_bucket_name: str = Field(default="documents", env="S3_BUCKET_NAME")
    s3_far_bucket: str = Field(default="obi-one-far-docs", env="S3_FAR_BUCKET")
    s3_dfars_bucket: str = Field(default="obi-one-dfars-supp", env="S3_DFARS_BUCKET")
    s3_eo_bucket: str = Field(default="obi-one-executive-orders", env="S3_EO_BUCKET")
    
    # OpenSearch configuration
    opensearch_url: str = Field(default="http://opensearch:9200", env="OPENSEARCH_URL")
    opensearch_user: str = Field(default="admin", env="OPENSEARCH_USER")
    opensearch_password: str = Field(default="admin", env="OPENSEARCH_PASSWORD")
    
    # Web service configuration
    web_service_url: str = Field(default="http://web:3000", env="WEB_SERVICE_URL")
    
    # Analysis configuration
    max_concurrent_analyses: int = Field(default=5, env="MAX_CONCURRENT_ANALYSES")
    analysis_timeout_seconds: int = Field(default=300, env="ANALYSIS_TIMEOUT_SECONDS")
    
    # Local LLM configuration (Air Spec)
    use_local_llm: bool = Field(default=True, env="USE_LOCAL_LLM")
    local_llm_url: str = Field(default="http://localhost:11434", env="LOCAL_LLM_URL")
    local_llm_model: str = Field(default="llama3.2", env="LOCAL_LLM_MODEL")
    use_simulated_data: bool = Field(default=True, env="USE_SIMULATED_DATA")
    
    # Thermal Throttling (Air Spec)
    cpu_usage_threshold: float = Field(default=80.0, env="CPU_USAGE_THRESHOLD")
    batch_cool_down_seconds: float = Field(default=1.0, env="BATCH_COOL_DOWN_SECONDS")
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()


def get_settings() -> Settings:
    """Get the current application settings."""
    return settings
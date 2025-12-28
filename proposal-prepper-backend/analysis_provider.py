# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

import os
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional, Type
from enum import Enum
from logging_config import get_logger
from config import get_settings
from models import ComplianceResults

logger = get_logger(__name__)
settings = get_settings()

class ProviderType(str, Enum):
    AWS = "aws"
    LOCAL = "local"
    AZURE = "azure"
    GCP = "gcp"

class AnalysisProvider(ABC):
    """Abstract base class for all analysis providers."""
    
    @abstractmethod
    def is_available(self) -> bool:
        """Check if the provider is correctly configured and available."""
        pass

    @abstractmethod
    def get_name(self) -> str:
        """Get the human-readable name of the provider/SDK."""
        pass

    @abstractmethod
    async def analyze_document(
        self, 
        document_text: str, 
        filename: str, 
        document_id: str,
        **kwargs
    ) -> ComplianceResults:
        """Analyze a document for compliance."""
        pass

class AnalysisRouter:
    """Routes analysis requests to the appropriate provider based on configuration."""
    
    _providers: Dict[ProviderType, Type[AnalysisProvider]] = {}
    _instances: Dict[ProviderType, AnalysisProvider] = {}

    @classmethod
    def register_provider(cls, provider_type: ProviderType, provider_cls: Type[AnalysisProvider]):
        """Register a provider class."""
        cls._providers[provider_type] = provider_cls
        logger.info(f"Registered analysis provider: {provider_type}")

    @classmethod
    def get_provider(cls, provider_type: Optional[ProviderType] = None) -> AnalysisProvider:
        """Get an instance of the requested provider, or the default from settings."""
        if provider_type is None:
            # Prioritize settings.analysis_mode (which checks environment ANALYSIS_MODE)
            env_provider = settings.analysis_mode or os.getenv("ANALYSIS_MODE", ProviderType.LOCAL)
            
            try:
                provider_type = ProviderType(env_provider.lower())
            except ValueError:
                logger.warning(f"Invalid ANALYSIS_MODE '{env_provider}', falling back to 'local'")
                provider_type = ProviderType.LOCAL

        if provider_type not in cls._instances:
            if provider_type not in cls._providers:
                # Fallback to local if requested not found
                if ProviderType.LOCAL not in cls._providers:
                    raise RuntimeError("No analysis providers registered, including 'local'")
                logger.warning(f"Provider '{provider_type}' not registered, falling back to 'local'")
                provider_type = ProviderType.LOCAL
            
            logger.info(f"Instantiating analysis provider: {provider_type}")
            cls._instances[provider_type] = cls._providers[provider_type]()
            
        return cls._instances[provider_type]

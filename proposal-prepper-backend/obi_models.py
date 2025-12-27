# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

"""
SQLAlchemy database models for the Sovereign OBI platform.

This module defines the schema for the Object-Based Intelligence (OBI) 
knowledge base, including vector storage for RAG capabilities.
"""

from datetime import datetime
from typing import List, Optional, Dict, Any
from sqlalchemy import (
    Column, String, Integer, Float, DateTime, Text, Boolean, 
    ForeignKey, JSON, Index, UniqueConstraint
)
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB, UUID
from pgvector.sqlalchemy import Vector
import uuid

from database import Base

class KnowledgeSource(Base):
    """
    Metadata for a regulatory or federal knowledge source.
    e.g., "FAR 2024-05", "EO Archive 2024"
    """
    __tablename__ = "obi_knowledge_sources"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False, unique=True)
    source_type = Column(String, nullable=False) # e.g., "FAR", "DFARS", "EO", "NASA"
    version = Column(String, nullable=True)
    last_ingested = Column(DateTime, nullable=False, default=datetime.utcnow)
    metadata_json = Column("metadata", JSONB, nullable=True, default=dict)
    
    chunks = relationship("KnowledgeChunk", back_populates="source", cascade="all, delete-orphan")

class KnowledgeChunk(Base):
    """
    Granular chunks of text from knowledge sources with vector embeddings.
    This is the core for Sovereign RAG.
    """
    __tablename__ = "obi_knowledge_chunks"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    source_id = Column(String, ForeignKey("obi_knowledge_sources.id"), nullable=False, index=True)
    
    # Text content and metadata
    content = Column(Text, nullable=False)
    reference_id = Column(String, nullable=False, index=True) # e.g., "FAR 15.408"
    title = Column(String, nullable=True)
    
    # Vector Embedding (1536 for OpenAI/Nova-ish, 768 or 1024 for local models like BGE or Llama-embeddings)
    # We'll use 1536 as a safe default for compatibility, or 1024 for BGE-large
    embedding = Column(Vector(1536), nullable=True) 
    
    # Granular metadata
    chunk_index = Column(Integer, nullable=False)
    page_number = Column(Integer, nullable=True)
    metadata_json = Column("metadata", JSONB, nullable=True, default=dict)
    
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    source = relationship("KnowledgeSource", back_populates="chunks")
    
    __table_args__ = (
        Index('idx_obi_chunks_source_ref', 'source_id', 'reference_id'),
    )

class EOCrawlStatus(Base):
    """
    Tracks the state of the National Archives EO Crawler.
    """
    __tablename__ = "obi_eo_crawl_status"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    eo_number = Column(String, nullable=False, unique=True)
    title = Column(String, nullable=False)
    signing_date = Column(DateTime, nullable=True)
    publication_date = Column(DateTime, nullable=True)
    federal_register_url = Column(String, nullable=True)
    
    status = Column(String, nullable=False, default="discovered") # discovered, downloaded, indexed, failed
    last_crawl_attempt = Column(DateTime, nullable=False, default=datetime.utcnow)
    error_message = Column(Text, nullable=True)
    
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

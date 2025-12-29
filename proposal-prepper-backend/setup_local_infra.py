# SPDX-License-Identifier: PolyForm-Strict-1.0.0
# SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

"""
Infrastructure initialization script for the local OBI simulation.

This script ensures all local simulated AWS resources (OpenSearch, MinIO)
are properly initialized before the demo starts.
"""

import os
import time
import logging
import boto3
from opensearchpy import OpenSearch
from config import get_settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
settings = get_settings()

def init_minio():
    """Ensure all required MinIO buckets exist."""
    logger.info("Initializing MinIO buckets...")
    s3 = boto3.client(
        's3',
        endpoint_url=settings.s3_endpoint_url,
        aws_access_key_id=settings.s3_access_key,
        aws_secret_access_key=settings.s3_secret_key,
        region_name=settings.aws_region
    )
    
    buckets = [
        settings.s3_bucket_name,
        settings.s3_far_bucket,
        settings.s3_dfars_bucket,
        settings.s3_eo_bucket
    ]
    
    for bucket in buckets:
        try:
            s3.create_bucket(Bucket=bucket)
            logger.info(f"Created bucket: {bucket}")
        except Exception as e:
            if "BucketAlreadyOwnedByYou" in str(e) or "BucketAlreadyExists" in str(e):
                logger.debug(f"Bucket {bucket} already exists")
            else:
                logger.error(f"Failed to create bucket {bucket}: {e}")

def init_opensearch():
    """Initialize OpenSearch indexes with basic mappings."""
    logger.info("Initializing OpenSearch indexes...")
    client = OpenSearch(
        hosts=[settings.opensearch_url],
        http_compress=True,
        use_ssl=False,
        verify_certs=False,
        ssl_assert_hostname=False,
        ssl_show_warn=False
    )
    
    # Wait for OpenSearch to be ready
    for _ in range(30):
        try:
            if client.ping():
                break
        except:
            pass
        logger.info("Waiting for OpenSearch...")
        time.sleep(5)
    else:
        logger.error("OpenSearch failed to respond")
        return

    indexes = [
        "far-regulations-index",
        "dfars-regulations-index",
        "executive-orders-index"
    ]
    
    for index in indexes:
        try:
            if not client.indices.exists(index=index):
                # Basic vector search mapping
                mapping = {
                    "settings": {
                        "index": {
                            "knn": "true",
                            "knn.algo_param.ef_search": "100"
                        }
                    },
                    "mappings": {
                        "properties": {
                            "text": {"type": "text"},
                            "vector": {
                                "type": "knn_vector",
                                "dimension": 1536,
                                "method": {
                                    "name": "hnsw",
                                    "space_type": "l2",
                                    "engine": "nmslib"
                                }
                            }
                        }
                    }
                }
                client.indices.create(index=index, body=mapping)
                logger.info(f"Created index: {index}")
            else:
                logger.info(f"Index {index} already exists")
        except Exception as e:
            logger.error(f"Failed to create index {index}: {e}")

if __name__ == "__main__":
    init_minio()
    init_opensearch()
    logger.info("Local infrastructure initialization completed.")

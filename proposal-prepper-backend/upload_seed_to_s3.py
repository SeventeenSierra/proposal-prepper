import os
import boto3
from pathlib import Path

# Initialize S3 client using environment variables
s3 = boto3.client(
    's3',
    endpoint_url=os.environ.get('S3_ENDPOINT_URL'),
    aws_access_key_id=os.environ.get('S3_ACCESS_KEY'),
    aws_secret_access_key=os.environ.get('S3_SECRET_KEY'),
    region_name=os.environ.get('AWS_REGION', 'us-east-1')
)

bucket = os.environ.get('S3_BUCKET_NAME', 'documents')
seed_path = Path(os.environ.get('SEED_DATA_PATH', '/app/src/seed-data'))

print(f"Connecting to S3 at {os.environ.get('S3_ENDPOINT_URL')}")
print(f"Target bucket: {bucket}")
print(f"Seed data path: {seed_path}")

# Create bucket
try:
    s3.create_bucket(Bucket=bucket)
    print(f"Created bucket {bucket}")
except Exception as e:
    # Check if error is because bucket exists
    if "BucketAlreadyOwnedByYou" in str(e) or "BucketAlreadyExists" in str(e):
        print(f"Bucket {bucket} already exists")
    else:
        print(f"Bucket creation error: {e}")

# Upload files
try:
    if not seed_path.exists():
        print(f"Error: Seed path {seed_path} does not exist")
        exit(1)

    count = 0
    for file in seed_path.glob("*.pdf"):
        key = f"seed-data/{file.name}"
        print(f"Uploading {file.name} to {bucket}/{key}")
        try:
            s3.upload_file(str(file), bucket, key)
            count += 1
        except Exception as e:
            print(f"Failed to upload {file.name}: {e}")
            
    print(f"Uploaded {count} files")
except Exception as e:
    print(f"Upload process failed: {e}")

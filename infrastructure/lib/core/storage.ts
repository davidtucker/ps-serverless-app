
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class AssetStorage extends Construct {
  public readonly uploadBucket: s3.IBucket;

  public readonly hostingBucket: s3.IBucket;

  public readonly assetBucket: s3.IBucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.uploadBucket = new s3.Bucket(this, 'UploadBucket', {
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    this.assetBucket = new s3.Bucket(this, 'AssetBucket', {
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    this.hostingBucket = new s3.Bucket(this, 'WebHostingBucket', {
      encryption: s3.BucketEncryption.S3_MANAGED,
    });
  }
}

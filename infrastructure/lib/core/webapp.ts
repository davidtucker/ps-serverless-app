import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as cwt from 'cdk-webapp-tools';

interface WebAppProps {
  hostingBucket: s3.IBucket;
  relativeWebAppPath: string;
  baseDir: string;
}

export class WebApp extends cdk.Construct {
  public readonly webDistribution: cloudfront.CloudFrontWebDistribution;

  constructor(scope: cdk.Construct, id: string, props: WebAppProps) {
    super(scope, id);

    const oai = new cloudfront.OriginAccessIdentity(this, 'WebHostingOAI', {});

    const cloudfrontProps: any = {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: props.hostingBucket,
            originAccessIdentity: oai,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      errorConfigurations: [
        {
          errorCachingMinTtl: 86400,
          errorCode: 403,
          responseCode: 200,
          responsePagePath: '/index.html',
        },
        {
          errorCachingMinTtl: 86400,
          errorCode: 404,
          responseCode: 200,
          responsePagePath: '/index.html',
        },
      ],
    };

    this.webDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      'AppHostingDistribution',
      cloudfrontProps,
    );

    props.hostingBucket.grantRead(oai);

    // Deploy Web App ----------------------------------------------------

    new cwt.WebAppDeployment(this, 'WebAppDeploy', {
      baseDirectory: '../',
      relativeWebAppPath: 'webapp',
      webDistribution: this.webDistribution,
      webDistributionPaths: ['/*'],
      buildCommand: 'yarn build',
      buildDirectory: 'build',
      bucket: props.hostingBucket,
      prune: true
    });

    new cdk.CfnOutput(this, 'URL', {
      value: `https://${this.webDistribution.distributionDomainName}/`
    });
  }
}

import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as path from 'path';

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

    const dockerOutput = path.join('/', 'asset-input', props.relativeWebAppPath, 'build');

    new s3Deploy.BucketDeployment(this, 'WebAppDeploy', {
      distribution: this.webDistribution,
      distributionPaths: ['/*'],
      prune: true,
      sources: [
        s3Deploy.Source.asset(props.baseDir, {
          bundling: {
            image: cdk.DockerImage.fromRegistry('node'),
            command: [
              'sh',
              '-c',
              `
              cd ${props.relativeWebAppPath} && yarn build && cp -r ${dockerOutput}/* /asset-output/
              `,
            ],
          },
        }),
      ],
      destinationBucket: props.hostingBucket,
    });

    new cdk.CfnOutput(this, 'URL', {
      value: `https://${this.webDistribution.distributionDomainName}/`
    });
  }
}

import { Construct } from 'constructs';
import { aws_s3 as s3, aws_cognito as cognito, aws_cloudfront as cloudfront, CfnOutput } from 'aws-cdk-lib';
import * as apigv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import * as cwt from 'cdk-webapp-tools';

interface WebAppProps {
  hostingBucket: s3.IBucket;
  relativeWebAppPath: string;
  baseDirectory: string;
  httpApi: apigv2.IHttpApi;
  userPool: cognito.IUserPool;
  userPoolClient: cognito.IUserPoolClient;
}

export class WebApp extends Construct {
  public readonly webDistribution: cloudfront.CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props: WebAppProps) {
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

    const deployment = new cwt.WebAppDeployment(this, 'WebAppDeploy', {
      baseDirectory: props.baseDirectory,
      relativeWebAppPath: props.relativeWebAppPath,
      webDistribution: this.webDistribution,
      webDistributionPaths: ['/*'],
      buildCommand: 'yarn build',
      buildDirectory: 'build',
      bucket: props.hostingBucket,
      prune: false,
    });

    new CfnOutput(this, 'URL', {
      value: `https://${this.webDistribution.distributionDomainName}/`,
    });

    // Web App Config ------------------------------------------------------

    new cwt.WebAppConfig(this, 'WebAppConfig', {
      bucket: props.hostingBucket,
      key: 'config.js',
      configData: {
        apiEndpoint: props.httpApi.apiEndpoint,
        userPoolId: props.userPool.userPoolId,
        userPoolWebClientId: props.userPoolClient.userPoolClientId,
      },
      globalVariableName: 'appConfig',
    }).node.addDependency(deployment);
  }
}

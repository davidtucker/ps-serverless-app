import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as cwt from 'cdk-webapp-tools';
import * as cognito from '@aws-cdk/aws-cognito';
import * as apigw from '@aws-cdk/aws-apigatewayv2';

interface WebAppProps {
  hostingBucket: s3.IBucket;
  relativeWebAppPath: string;
  baseDirectory: string;
  httpApi:apigw.IHttpApi;
  userPool: cognito.IUserPool;
  userPoolClient: cognito.IUserPoolClient;
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

    const deployment = new cwt.WebAppDeployment(this, 'WebAppDeploy', {
      baseDirectory: props.baseDirectory,
      relativeWebAppPath: props.relativeWebAppPath,
      webDistribution: this.webDistribution,
      webDistributionPaths: ['/*'],
      buildCommand: 'yarn build',
      buildDirectory: 'build',
      bucket: props.hostingBucket,
      prune: false
    });

    new cdk.CfnOutput(this, 'URL', {
      value: `https://${this.webDistribution.distributionDomainName}/`
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
      globalVariableName: 'appConfig'
    }).node.addDependency(deployment);
  }
}

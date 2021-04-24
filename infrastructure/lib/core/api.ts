import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cognito from '@aws-cdk/aws-cognito';
import * as apigw from '@aws-cdk/aws-apigatewayv2';
import { CorsHttpMethod, HttpMethod } from '@aws-cdk/aws-apigatewayv2';
import * as apigi from '@aws-cdk/aws-apigatewayv2-integrations';
import { PolicyStatement } from '@aws-cdk/aws-iam';
import * as iam from '@aws-cdk/aws-iam';
import * as sqs from '@aws-cdk/aws-sqs';

interface ApplicationAPIProps {
  userPool: cognito.IUserPool;
  userPoolClient: cognito.IUserPoolClient;
  usersService: lambda.IFunction;
  documentsService: lambda.IFunction;
  commentsService: lambda.IFunction;
}

export class ApplicationAPI extends cdk.Construct {
  public readonly httpApi: apigw.HttpApi;

  constructor(scope: cdk.Construct, id: string, props: ApplicationAPIProps) {
    super(scope, id);

    const serviceMethods = [
      HttpMethod.GET,
      HttpMethod.POST,
      HttpMethod.DELETE,
      HttpMethod.PUT,
      HttpMethod.PATCH,
    ];

    // API Gateway ------------------------------------------------------

    this.httpApi = new apigw.HttpApi(this, 'HttpProxyApi', {
      apiName: 'serverless-api',
      createDefaultStage: true,
      corsPreflight: {
        allowHeaders: ['Authorization', 'Content-Type', '*'],
        allowMethods: [
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.DELETE,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
        ],
        allowOrigins: ['http://localhost:3000', 'https://*'],
        allowCredentials: true,
        maxAge: cdk.Duration.days(10),
      },
    });

    // Comments Service -------------------------------------------------

    const commentsServiceIntegration = new apigi.LambdaProxyIntegration({
      handler: props.commentsService,
    });

    this.httpApi.addRoutes({
      path: `/comments/{proxy+}`,
      methods: serviceMethods,
      integration: commentsServiceIntegration,
    });

    // Moderate ----------------------------------------------------------

    const queue = new sqs.Queue(this, 'ModerationQueue');

    const moderateRole = new iam.Role(this, 'ModerateRole', {
      assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
    });

    moderateRole.addToPolicy(
      new PolicyStatement({
        resources: [queue.queueArn],
        actions: ['sqs:SendMessage'],
      }),
    );

    const sqsIntegration = new apigw.CfnIntegration(this, 'ModerateIntegration', {
      apiId: this.httpApi.apiId,
      integrationType: 'AWS_PROXY',
      integrationSubtype: 'SQS-SendMessage',
      credentialsArn: moderateRole.roleArn,
      requestParameters: {
        QueueUrl: queue.queueUrl,
        MessageBody: '$request.body',
      },
      payloadFormatVersion: '1.0',
      timeoutInMillis: 10000,
    });

    new apigw.CfnRoute(this, 'ModerateRoute', {
      apiId: this.httpApi.apiId,
      routeKey: 'POST /moderate',
      target: `integrations/${sqsIntegration.ref}`,
      authorizationType: apigw.HttpAuthorizerType.JWT,
    });
  }
}

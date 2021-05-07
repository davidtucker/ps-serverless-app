import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigatewayv2';
import * as cognito from '@aws-cdk/aws-cognito';
import { CorsHttpMethod, HttpMethod } from '@aws-cdk/aws-apigatewayv2';
import { HttpUserPoolAuthorizer } from '@aws-cdk/aws-apigatewayv2-authorizers';
import * as apigi from '@aws-cdk/aws-apigatewayv2-integrations';
import * as iam from '@aws-cdk/aws-iam';
import * as sqs from '@aws-cdk/aws-sqs';

interface ApplicationAPIProps {
  commentsService: lambda.IFunction;
  documentsService: lambda.IFunction;
  usersService: lambda.IFunction;
  userPool: cognito.IUserPool;
  userPoolClient: cognito.IUserPoolClient;
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

    // Authorizer -------------------------------------------------------

    const authorizer = new HttpUserPoolAuthorizer({
      userPool: props.userPool,
      userPoolClient: props.userPoolClient,
    });

    // Comments Service -------------------------------------------------

    const commentsServiceIntegration = new apigi.LambdaProxyIntegration({
      handler: props.commentsService,
    });

    this.httpApi.addRoutes({
      path: `/comments/{proxy+}`,
      methods: serviceMethods,
      integration: commentsServiceIntegration,
      authorizer,
    });

    // Documents Service ------------------------------------------------

    const documentsServiceIntegration = new apigi.LambdaProxyIntegration({
      handler: props.documentsService,
    });

    this.httpApi.addRoutes({
      path: `/documents/{proxy+}`,
      methods: serviceMethods,
      integration: documentsServiceIntegration,
      authorizer,
    });

    // Users Service ------------------------------------------------------

    const usersServiceIntegration = new apigi.LambdaProxyIntegration({
      handler: props.usersService,
    });

    this.httpApi.addRoutes({
      path: `/users/{proxy+}`,
      methods: serviceMethods,
      integration: usersServiceIntegration,
      authorizer,
    });

    // Moderate ----------------------------------------------------------

    const queue = new sqs.Queue(this, 'ModerationQueue');

    const moderateRole = new iam.Role(this, 'ModerateRole', {
      assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
    });

    moderateRole.addToPolicy(
      new iam.PolicyStatement({
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
    });

    // Outputs -----------------------------------------------------------

    new cdk.CfnOutput(this, 'URL', {
      value: this.httpApi.apiEndpoint
    });
  }
}

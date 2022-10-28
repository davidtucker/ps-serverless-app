import { Construct } from 'constructs';
import {
  aws_lambda as lambda,
  aws_cognito as cognito,
  aws_iam as iam,
  aws_sqs as sqs,
  aws_apigatewayv2 as apigv2_cfn,
  CfnOutput,
  Duration,
} from 'aws-cdk-lib';
import * as apigv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpUserPoolAuthorizer } from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';

interface ApplicationAPIProps {
  commentsService: lambda.IFunction;
  documentsService: lambda.IFunction;
  usersService: lambda.IFunction;
  userPool: cognito.IUserPool;
  userPoolClient: cognito.IUserPoolClient;
}

export class ApplicationAPI extends Construct {
  public readonly httpApi: apigv2.HttpApi;

  constructor(scope: Construct, id: string, props: ApplicationAPIProps) {
    super(scope, id);

    const serviceMethods = [
      apigv2.HttpMethod.GET,
      apigv2.HttpMethod.POST,
      apigv2.HttpMethod.DELETE,
      apigv2.HttpMethod.PUT,
      apigv2.HttpMethod.PATCH,
    ];

    // API Gateway ------------------------------------------------------

    this.httpApi = new apigv2.HttpApi(this, 'HttpProxyApi', {
      apiName: 'serverless-api',
      createDefaultStage: true,
      corsPreflight: {
        allowHeaders: ['Authorization', 'Content-Type', '*'],
        allowMethods: [
          apigv2.CorsHttpMethod.GET,
          apigv2.CorsHttpMethod.POST,
          apigv2.CorsHttpMethod.DELETE,
          apigv2.CorsHttpMethod.PUT,
          apigv2.CorsHttpMethod.PATCH,
        ],
        allowOrigins: ['http://localhost:3000', 'https://*'],
        allowCredentials: true,
        maxAge: Duration.days(10),
      },
    });

    // Authorizer -------------------------------------------------------

    // const authorizer = new HttpUserPoolAuthorizer('Authorizer', props.userPool);

    const authorizer = new HttpUserPoolAuthorizer('Authorizer', props.userPool, {
      userPoolClients: [props.userPoolClient],
    });

    // Comments Service -------------------------------------------------

    const commentsServiceIntegration = new HttpLambdaIntegration(
      'CommentsIntegration',
      props.commentsService,
    );

    this.httpApi.addRoutes({
      path: `/comments/{proxy+}`,
      methods: serviceMethods,
      integration: commentsServiceIntegration,
      authorizer,
    });

    // Documents Service ------------------------------------------------

    const documentsServiceIntegration = new HttpLambdaIntegration(
      'DocumentsServiceIntegration',
      props.documentsService,
      {},
    );

    this.httpApi.addRoutes({
      path: `/documents/{proxy+}`,
      methods: serviceMethods,
      integration: documentsServiceIntegration,
      authorizer,
    });

    // // Users Service ------------------------------------------------------

    const usersServiceIntegration = new HttpLambdaIntegration('UsersIntegration', props.usersService);

    this.httpApi.addRoutes({
      path: `/users/{proxy+}`,
      methods: serviceMethods,
      integration: usersServiceIntegration,
      authorizer,
    });

    // // Moderate ----------------------------------------------------------

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

    const sqsIntegration = new apigv2_cfn.CfnIntegration(this, 'ModerateIntegration', {
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

    new apigv2_cfn.CfnRoute(this, 'ModerateRoute', {
      apiId: this.httpApi.apiId,
      routeKey: 'POST /moderate',
      target: `integrations/${sqsIntegration.ref}`,
    });

    // // Outputs -----------------------------------------------------------

    new CfnOutput(this, 'URL', {
      value: this.httpApi.apiEndpoint,
    });
  }
}

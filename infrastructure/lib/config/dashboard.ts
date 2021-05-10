import * as apigv2 from '@aws-cdk/aws-apigatewayv2';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as s3 from '@aws-cdk/aws-s3';

export interface MonitoringDashboardConfigProps {
  api: apigv2.IHttpApi;
  table: ddb.ITable;
  documentsService: lambda.IFunction;
  commentsService: lambda.IFunction;
  usersService: lambda.IFunction;
  processingStateMachine: sfn.IStateMachine;
  assetsBucket: s3.IBucket;
}

// eslint-disable-next-line
export const generateDashboardBody = (props: MonitoringDashboardConfigProps): string => JSON.stringify({
  widgets: [
    {
      type: 'metric',
      x: 0,
      y: 3,
      width: 12,
      height: 6,
      properties: {
        view: 'timeSeries',
        stacked: false,
        metrics: [
          ['AWS/Lambda', 'ConcurrentExecutions'],
          ['.', 'Throttles'],
          ['.', 'Invocations'],
          ['.', 'Errors'],
        ],
        region: process.env.CDK_DEFAULT_REGION,
        title: 'All Lambda Executions',
        period: 300,
      },
    },
    {
      type: 'metric',
      x: 0,
      y: 0,
      width: 18,
      height: 3,
      properties: {
        metrics: [
          ['AWS/ApiGateway', '4xx', 'ApiId', props.api.apiId],
          ['.', '5xx', '.', '.'],
          ['.', 'Count', '.', '.'],
          ['.', 'DataProcessed', '.', '.'],
          ['.', 'Latency', '.', '.', { stat: 'Average' }],
        ],
        view: 'singleValue',
        stacked: false,
        region: process.env.CDK_DEFAULT_REGION,
        title: 'API Gateway Requests',
        period: 2592000,
        stat: 'Sum',
      },
    },
    {
      type: 'metric',
      x: 0,
      y: 9,
      width: 12,
      height: 6,
      properties: {
        view: 'timeSeries',
        stacked: false,
        metrics: [
          ['AWS/DynamoDB', 'ConsumedWriteCapacityUnits', 'TableName', props.table.tableName],
          ['.', 'ConsumedReadCapacityUnits', '.', '.'],
          ['.', 'ConsumedWriteCapacityUnits', '.', '.', 'GlobalSecondaryIndexName', 'GSI1'],
          ['.', 'ConsumedReadCapacityUnits', '.', '.', '.', '.'],
        ],
        region: process.env.CDK_DEFAULT_REGION,
        title: 'DynamoDB Capacity',
        period: 300,
      },
    },
    {
      type: 'metric',
      x: 12,
      y: 3,
      width: 6,
      height: 3,
      properties: {
        metrics: [
          [
            'AWS/S3',
            'BucketSizeBytes',
            'StorageType',
            'StandardStorage',
            'BucketName',
            props.assetsBucket.bucketName,
          ],
          ['.', 'NumberOfObjects', '.', 'AllStorageTypes', '.', '.'],
        ],
        view: 'singleValue',
        stacked: false,
        region: process.env.CDK_DEFAULT_REGION,
        period: 2592000,
        stat: 'Maximum',
        title: 'Storage Metrics',
      },
    },
    {
      type: 'metric',
      x: 12,
      y: 15,
      width: 6,
      height: 6,
      properties: {
        view: 'timeSeries',
        stacked: false,
        metrics: [
          ['AWS/Lambda', 'Errors', 'FunctionName', props.documentsService.functionName],
          ['.', 'Throttles', '.', '.'],
          ['.', 'Invocations', '.', '.'],
        ],
        region: process.env.CDK_DEFAULT_REGION,
        title: 'Document Service',
        period: 300,
      },
    },
    {
      type: 'metric',
      x: 0,
      y: 15,
      width: 6,
      height: 6,
      properties: {
        view: 'timeSeries',
        stacked: false,
        metrics: [
          ['AWS/Lambda', 'Errors', 'FunctionName', props.commentsService.functionName],
          ['.', 'Throttles', '.', '.'],
          ['.', 'Invocations', '.', '.'],
        ],
        region: process.env.CDK_DEFAULT_REGION,
        title: 'Comment Service',
      },
    },
    {
      type: 'metric',
      x: 6,
      y: 15,
      width: 6,
      height: 6,
      properties: {
        view: 'timeSeries',
        stacked: false,
        metrics: [
          ['AWS/Lambda', 'Errors', 'FunctionName', props.usersService.functionName],
          ['.', 'Throttles', '.', '.'],
          ['.', 'Invocations', '.', '.'],
        ],
        region: process.env.CDK_DEFAULT_REGION,
        title: 'Users Service',
        period: 300,
      },
    },
    {
      type: 'metric',
      x: 12,
      y: 9,
      width: 6,
      height: 6,
      properties: {
        view: 'timeSeries',
        stacked: false,
        metrics: [
          [
            'AWS/States',
            'ExecutionsStarted',
            'StateMachineArn',
            props.processingStateMachine.stateMachineArn,
          ],
          ['.', 'ExecutionThrottled', '.', '.'],
          ['.', 'ExecutionsFailed', '.', '.'],
          ['.', 'ExecutionsTimedOut', '.', '.'],
          ['.', 'ExecutionsSucceeded', '.', '.'],
        ],
        region: process.env.CDK_DEFAULT_REGION,
        title: 'Document Processing',
      },
    },
    {
      type: 'metric',
      x: 12,
      y: 6,
      width: 6,
      height: 3,
      properties: {
        metrics: [
          [
            'AWS/States',
            'ExecutionsSucceeded',
            'StateMachineArn',
            props.processingStateMachine.stateMachineArn,
          ],
          ['.', 'ExecutionsFailed', '.', '.'],
        ],
        view: 'singleValue',
        title: 'Daily Documents Processed',
        region: process.env.CDK_DEFAULT_REGION,
        stat: 'Sum',
        period: 2592000,
      },
    },
  ],
});

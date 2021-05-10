import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from '@aws-cdk/aws-lambda-nodejs';
import * as logs from '@aws-cdk/aws-logs';

type NodejsServiceFunctionProps = NodejsFunctionProps;

export class NodejsServiceFunction extends NodejsFunction {
  constructor(scope: cdk.Construct, id: string, props: NodejsServiceFunctionProps) {
    const runtime = props.runtime ?? lambda.Runtime.NODEJS_14_X;
    const handler = 'handler';
    const bundling = {
      externalModules: ['aws-sdk'],
    };
    const logRetention = logs.RetentionDays.ONE_DAY;
    const tracing = lambda.Tracing.ACTIVE;
    super(scope, id, {
      ...props,
      tracing,
      runtime,
      handler,
      bundling,
      logRetention
    });
    this.addEnvironment('LOG_LEVEL', '40');
  }
}

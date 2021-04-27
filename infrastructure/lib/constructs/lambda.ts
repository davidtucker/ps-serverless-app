import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from '@aws-cdk/aws-lambda-nodejs';

type NodejsServiceFunctionProps = NodejsFunctionProps;

export class NodejsServiceFunction extends NodejsFunction {
  constructor(scope: cdk.Construct, id: string, props: NodejsServiceFunctionProps) {
    const runtime = props.runtime ?? lambda.Runtime.NODEJS_14_X;
    const handler = 'handler';
    const bundling = {
      externalModules: ['aws-sdk'],
    };
    super(scope, id, {
      ...props,
      runtime,
      handler,
      bundling,
    });
  }
}

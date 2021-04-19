import * as cdk from '@aws-cdk/core';

export class ApplicationStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new cdk.CfnOutput(this, 'TestOutput', {
      value: 'Hey, it worked!'
    });
  }
}

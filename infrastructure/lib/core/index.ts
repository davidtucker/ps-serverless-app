import * as cdk from '@aws-cdk/core';
import * as path from 'path';
import { AssetStorage } from './storage';
import { WebApp } from './webapp';

export class ApplicationStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const storage = new AssetStorage(this, 'Storage');

    new WebApp(this, 'WebApp', {
      baseDirectory: '../',
      relativeWebAppPath: 'webapp',
      hostingBucket: storage.hostingBucket
    });
  }
}

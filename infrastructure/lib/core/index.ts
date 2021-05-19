import * as cdk from '@aws-cdk/core';
import { ApplicationAPI } from './api';
import { AppDatabase } from './database';
import { AppServices } from './services';
import { AssetStorage } from './storage';
import { WebApp } from './webapp';

export class ApplicationStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const storage = new AssetStorage(this, 'Storage');

    new WebApp(this, 'WebApp', {
      hostingBucket: storage.hostingBucket,
      baseDirectory: '../',
      relativeWebAppPath: 'webapp',
    });
  }
}

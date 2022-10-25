import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';

import { AssetStorage } from './storage';
import { WebApp } from './webapp';

export class ApplicationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const storage = new AssetStorage(this, 'Storage');

    new WebApp(this, 'WebApp', {
      hostingBucket: storage.hostingBucket,
      baseDirectory: '../',
      relativeWebAppPath: 'webapp',
    });
  }
}

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

    const database = new AppDatabase(this, 'Database');

    const services = new AppServices(this, 'Services', {
      documentsTable: database.documentsTable
    });

    const api = new ApplicationAPI(this, 'API', {
      commentsService: services.commentsService
    });

    new WebApp(this, 'WebApp', {
      hostingBucket: storage.hostingBucket,
      baseDirectory: '../',
      relativeWebAppPath: 'webapp',
      httpApi: api.httpApi
    });
  }
}

import * as cdk from '@aws-cdk/core';
import { ApplicationAPI } from './api';
import { AppDatabase } from './database';
import { ApplicationEvents } from './events';
import { ApplicationAuth } from './auth';
import { ApplicationMonitoring } from './monitoring';
import { DocumentProcessing } from './processing';
import { AppServices } from './services';
import { AssetStorage } from './storage';
import { WebApp } from './webapp';

export class ApplicationStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const storage = new AssetStorage(this, 'Storage');

    const auth = new ApplicationAuth(this, 'Auth');

    const database = new AppDatabase(this, 'Database');

    const services = new AppServices(this, 'Services', {
      documentsTable: database.documentsTable,
      uploadBucket: storage.uploadBucket,
      assetBucket: storage.assetBucket,
      userPool: auth.userPool,
    });

    const api = new ApplicationAPI(this, 'API', {
      commentsService: services.commentsService,
      documentsService: services.documentsService,
      usersService: services.usersService,
      userPool: auth.userPool,
      userPoolClient: auth.userPoolClient,
    });

    const processing = new DocumentProcessing(this, 'Processing', {
      uploadBucket: storage.uploadBucket,
      assetBucket: storage.assetBucket,
      documentsTable: database.documentsTable,
    });

    new ApplicationEvents(this, 'Events', {
      uploadBucket: storage.uploadBucket,
      processingStateMachine: processing.processingStateMachine,
      notificationsService: services.notificationsService,
    });

    const webapp = new WebApp(this, 'WebApp', {
      hostingBucket: storage.hostingBucket,
      baseDirectory: '../',
      relativeWebAppPath: 'webapp',
      httpApi: api.httpApi,
      userPool: auth.userPool,
      userPoolClient: auth.userPoolClient,
    });
    webapp.node.addDependency(auth);

    new ApplicationMonitoring(this, 'Monitoring', {
      api: api.httpApi,
      table: database.documentsTable,
      processingStateMachine: processing.processingStateMachine,
      assetsBucket: storage.assetBucket,
      documentsService: services.documentsService,
      commentsService: services.commentsService,
      usersService: services.usersService,
    });
  }
}

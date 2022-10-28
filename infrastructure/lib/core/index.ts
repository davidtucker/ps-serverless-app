import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';

import { AssetStorage } from './storage';
import { WebApp } from './webapp';
import { AppDatabase } from './database';
import { AppServices } from './services';
import { ApplicationAPI } from './api';
import { ApplicationAuth } from './auth';
import { DocumentProcessing } from './processing';
import { ApplicationEvents } from './events';
import { ApplicationMonitoring } from './monitoring';

export class ApplicationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const storage = new AssetStorage(this, 'Storage');

    const auth = new ApplicationAuth(this, 'Auth');

    const database = new AppDatabase(this, 'DataBase');

    const services = new AppServices(this, 'Services', {
      documentsTable: database.documentsTable,
      uploadBucket: storage.uploadBucket,
      assetBucket: storage.assetBucket,
      userPool: auth.userPool,
    });

    const api = new ApplicationAPI(this, 'API', {
      commentsService: services.commentsService,
      documentsService: services.documentsService,
      userPool: auth.userPool,
      userPoolClient: auth.userPoolClient,
      usersService: services.usersService,
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

    new WebApp(this, 'WebApp', {
      hostingBucket: storage.hostingBucket,
      baseDirectory: '../',
      relativeWebAppPath: 'webapp',
      httpApi: api.httpApi,
      userPool: auth.userPool,
      userPoolClient: auth.userPoolClient
    });

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

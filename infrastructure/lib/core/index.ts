import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';

import { AssetStorage } from './storage';
import { WebApp } from './webapp';
import { AppDatabase } from './database';
import { AppServices } from './services';
import { ApplicationAPI } from './api';
import { DocumentProcessing } from './processing';
import { ApplicationEvents } from './events';

export class ApplicationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const storage = new AssetStorage(this, 'Storage');

    const database = new AppDatabase(this, 'DataBase');

    const services = new AppServices(this, 'Services', {
      documentsTable: database.documentsTable,
      uploadBucket: storage.uploadBucket,
      assetBucket: storage.assetBucket
    });

    const api = new ApplicationAPI(this, 'API', {
      commentsService: services.commentsService,
      documentsService: services.documentsService
    })

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
      httpApi: api.httpApi
    });
  }
}

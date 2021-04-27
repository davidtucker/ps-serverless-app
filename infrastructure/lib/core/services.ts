import * as path from 'path';
import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { NodejsServiceFunction } from '../constructs/lambda';

interface AppServicesProps {
  documentsTable: dynamodb.ITable;
}

export class AppServices extends cdk.Construct {
  public readonly commentsService: NodejsFunction;

  constructor(scope: cdk.Construct, id: string, props: AppServicesProps) {
    super(scope, id);

    // Comments Service -------------------------------------------------

    this.commentsService = new NodejsServiceFunction(this, 'CommentServiceLambda', {
      entry: path.join(__dirname, '../../../services/comments/index.js'),
    });

    props.documentsTable.grantReadWriteData(this.commentsService);

    this.commentsService.addEnvironment('DYNAMO_DB_TABLE', props.documentsTable.tableName);
  }
}

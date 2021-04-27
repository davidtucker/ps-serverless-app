import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class AppDatabase extends cdk.Construct {
  public readonly documentsTable: dynamodb.ITable;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    const documentsTable = new dynamodb.Table(this, 'DocumentsTable', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'SK',
        type: dynamodb.AttributeType.STRING,
      },
    });

    documentsTable.addGlobalSecondaryIndex({
      indexName: 'GSI1',
      partitionKey: {
        name: 'SK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'PK',
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.INCLUDE,
      nonKeyAttributes: ['DateUploaded', 'Processed', 'Thumbnail', 'Uploader', 'FileSize', 'Name', 'Owner'],
    });

    this.documentsTable = documentsTable;
  }
}

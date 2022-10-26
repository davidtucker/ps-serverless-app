import { aws_dynamodb as dynamodb } from "aws-cdk-lib";
import { Construct } from 'constructs';

export class AppDatabase extends Construct {
  public readonly documentsTable: dynamodb.ITable;

  constructor(scope: Construct, id: string) {
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
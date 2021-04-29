import * as path from 'path';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as tasks from '@aws-cdk/aws-stepfunctions-tasks';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';
import { NodejsServiceFunction } from '../constructs/lambda';

interface DocumentProcessingProps {
  uploadBucket: s3.IBucket;
  assetBucket: s3.IBucket;
  doucmentsTable: dynamodb.ITable;
}

export class DocumentProcessing extends cdk.Construct {
  public readonly processingStateMachine: sfn.IStateMachine;

  constructor(scope: cdk.Construct, id: string, props: DocumentProcessingProps) {
    super(scope, id);

    // Metadata Service ---------------------------------------------------------

    const getDocumentMetadata = new NodejsServiceFunction(this, 'MetadataLambda', {
      entry: path.join(__dirname, '../../../services/processing/metadata.js'),
      timeout: cdk.Duration.seconds(120),
    });

    getDocumentMetadata.addEnvironment('UPLOAD_BUCKET', props.uploadBucket.bucketName);
    getDocumentMetadata.addEnvironment('ASSETS_BUCKET', props.assetBucket.bucketName);
    props.uploadBucket.grantRead(getDocumentMetadata);
    props.assetBucket.grantWrite(getDocumentMetadata);

    const getDocumentMetadataInvoke = new tasks.LambdaInvoke(this, 'Get Document Metadata', {
      lambdaFunction: getDocumentMetadata,
      outputPath: '$.Payload',
    });

    // Thumbnail Service --------------------------------------------------------

    const createThumbnail = new NodejsServiceFunction(this, 'ThumbnailLambda', {
      entry: path.join(__dirname, '../../../services/processing/thumbnail.js'),
      timeout: cdk.Duration.seconds(120),
      layers: [
        lambda.LayerVersion.fromLayerVersionAttributes(this, 'GhostscriptLayerVersion', {
          layerVersionArn: 'arn:aws:lambda:us-east-2:764866452798:layer:ghostscript:8',
          compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
        }),
      ],
    });

    createThumbnail.addEnvironment('UPLOAD_BUCKET', props.uploadBucket.bucketName);
    createThumbnail.addEnvironment('ASSET_BUCKET', props.assetBucket.bucketName);
    props.uploadBucket.grantRead(createThumbnail);
    props.assetBucket.grantWrite(createThumbnail);

    const createThumbnailInvoke = new tasks.LambdaInvoke(this, 'Create Document Thumbnail', {
      lambdaFunction: createThumbnail,
      outputPath: '$.Payload',
    });

    // Start Text Detection Service ---------------------------------------------

    const startTextDetection = new NodejsServiceFunction(this, 'StartTextDetectionLambda', {
      entry: path.join(__dirname, '../../../services/processing/startTextDetection.js'),
    });

    startTextDetection.addEnvironment('UPLOAD_BUCKET', props.uploadBucket.bucketName);
    startTextDetection.addToRolePolicy(
      new iam.PolicyStatement({
        resources: ['*'],
        actions: ['textract:StartDocumentTextDetection'],
      }),
    );
    props.uploadBucket.grantReadWrite(startTextDetection);

    const startTextDetectionInvoke = new tasks.LambdaInvoke(this, 'Start Text Detection Process', {
      lambdaFunction: startTextDetection,
      outputPath: '$.Payload',
    });

    // Get Text Detection Results Service ---------------------------------------

    const getTextDetectionResults = new NodejsServiceFunction(this, 'GetTextDetectionLambda', {
      entry: path.join(__dirname, '../../../services/processing/parseTextDetectionResults.js'),
      timeout: cdk.Duration.seconds(300),
    });

    getTextDetectionResults.addToRolePolicy(
      new iam.PolicyStatement({
        resources: ['*'],
        actions: ['textract:GetDocumentTextDetection'],
      }),
    );

    const getTextDetectionResultsInvoke = new tasks.LambdaInvoke(this, 'Get Text Detection Results', {
      lambdaFunction: getTextDetectionResults,
      outputPath: '$.Payload',
    });

    getTextDetectionResultsInvoke.addRetry({
      maxAttempts: 100,
      interval: cdk.Duration.seconds(5),
      backoffRate: 2,
    });

    // Insert Document into DB --------------------------------------------------

    const insertDocument = new NodejsServiceFunction(this, 'InsertDocumentLambda', {
      entry: path.join(__dirname, '../../../services/processing/insert.js'),
    });

    insertDocument.addEnvironment('DYNAMO_DB_TABLE', props.doucmentsTable.tableName);
    insertDocument.addEnvironment('UPLOAD_BUCKET', props.uploadBucket.bucketName);
    insertDocument.addEnvironment('ASSET_BUCKET', props.assetBucket.bucketName);
    props.uploadBucket.grantReadWrite(insertDocument);
    props.assetBucket.grantReadWrite(insertDocument);

    insertDocument.addToRolePolicy(
      new iam.PolicyStatement({
        resources: [props.doucmentsTable.tableArn],
        actions: ['dynamodb:UpdateItem'],
      }),
    );

    const insertDocumentInvoke = new tasks.LambdaInvoke(this, 'Insert Document into Database', {
      lambdaFunction: insertDocument,
      outputPath: '$.Payload',
    });

    // Failure Step -------------------------------------------------------------

    const catchError = new NodejsServiceFunction(this, 'CatchErrorLambda', {
      entry: path.join(__dirname, '../../../services/processing/catchError.js'),
    });

    catchError.addEnvironment('DYNAMO_DB_TABLE', props.doucmentsTable.tableName);
    catchError.addEnvironment('UPLOAD_BUCKET', props.uploadBucket.bucketName);
    catchError.addEnvironment('ASSET_BUCKET', props.assetBucket.bucketName);
    props.uploadBucket.grantReadWrite(catchError);
    props.assetBucket.grantReadWrite(catchError);

    catchError.addToRolePolicy(
      new iam.PolicyStatement({
        resources: [props.doucmentsTable.tableArn],
        actions: ['dynamodb:DeleteItem', 'dynamodb:Query'],
      }),
    );

    catchError.addToRolePolicy(
      new iam.PolicyStatement({
        resources: ['*'],
        actions: ['events:PutEvents'],
      }),
    );

    const catchErrorInvoke = new tasks.LambdaInvoke(this, 'Unable to process - Rollback all data', {
      lambdaFunction: catchError,
    });

    // Text Detection Process --------------------------------------------

    const waitStep = new sfn.Wait(this, 'WaitStep', {
      time: sfn.WaitTime.duration(cdk.Duration.seconds(60)),
      comment: 'Wait before checking for text detection',
    });

    const pass = new sfn.Pass(this, 'PassStep', {
      inputPath: '$',
      outputPath: '$',
    });

    const isTextDetectionCompletedChoice = new sfn.Choice(this, 'Has Text Detection Completed', {});
    isTextDetectionCompletedChoice
      .when(sfn.Condition.stringEquals('$.textDetection.jobStatus', 'SUCCEEDED'), pass)
      .otherwise(waitStep);

    startTextDetectionInvoke.next(waitStep);
    waitStep.next(getTextDetectionResultsInvoke);
    getTextDetectionResultsInvoke.next(isTextDetectionCompletedChoice);

    // Parallel Step -----------------------------------------------------

    const parallelProcessing = new sfn.Parallel(this, 'ParallelProcessing');
    parallelProcessing.branch(createThumbnailInvoke);
    parallelProcessing.branch(startTextDetectionInvoke);

    // Add catches (in case of error or failure) -------------------------

    const catchProps: sfn.CatchProps = {
      resultPath: '$.error',
    };

    getDocumentMetadataInvoke.addCatch(catchErrorInvoke, catchProps);
    parallelProcessing.addCatch(catchErrorInvoke, catchProps);
    insertDocumentInvoke.addCatch(catchErrorInvoke, catchProps);

    // Create Step Function ----------------------------------------------

    const stepFunctionDefinition = getDocumentMetadataInvoke
      .next(parallelProcessing)
      .next(insertDocumentInvoke);

    this.processingStateMachine = new sfn.StateMachine(this, 'ProcessingStateMachine', {
      definition: stepFunctionDefinition,
      timeout: cdk.Duration.minutes(30),
    });
  }
}

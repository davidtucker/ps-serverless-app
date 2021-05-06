import * as cdk from '@aws-cdk/core';
import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as targets from '@aws-cdk/aws-events-targets';
import * as s3 from '@aws-cdk/aws-s3';
import * as events from '@aws-cdk/aws-events';
import * as lambda from '@aws-cdk/aws-lambda';

interface ApplicationEventsProps {
  processingStateMachine: sfn.IStateMachine;
  uploadBucket: s3.IBucket;
  notificationsService: lambda.IFunction;
}

export class ApplicationEvents extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: ApplicationEventsProps) {
    super(scope, id);

    // Trigger Step Function from S3 Upload ------------------------------

    const uploadRule = props.uploadBucket.onCloudTrailWriteObject('UploadRule', {});

    const stateMachineTarget = new targets.SfnStateMachine(props.processingStateMachine, {});
    uploadRule.addTarget(stateMachineTarget);

    // Custom Event Bus for App ------------------------------------------

    const bus = new events.EventBus(this, 'AppEventBus', {
      eventBusName: 'com.globomantics.dms',
    });

    const failedProcessingRule = new events.Rule(this, 'FailedProcessingRule', {
      eventBus: bus,
      enabled: true,
      description: 'When a PDF file fails processing',
      eventPattern: {
        source: ['com.globomantics.dms.processing'],
        detailType: ['ProcessingFailed'],
      },
      ruleName: 'ProcessingFailedRule',
    });

    failedProcessingRule.addTarget(new targets.LambdaFunction(props.notificationsService));

    const commentAddedRule = new events.Rule(this, 'CommentAddedRule', {
      eventBus: bus,
      enabled: true,
      description: 'When a new comment is added to a document',
      eventPattern: {
        source: ['com.globomantics.dms.comments'],
        detailType: ['CommentAdded'],
      },
      ruleName: 'CommentAddedRule',
    });

    commentAddedRule.addTarget(new targets.LambdaFunction(props.notificationsService));
  }
}

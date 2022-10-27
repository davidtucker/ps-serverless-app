

import {
    aws_s3 as s3,
    aws_stepfunctions as sfn,
    aws_lambda as lambda,
    aws_events_targets as targets,
    aws_events as events,
    aws_cloudtrail as cloudtrail
  } from 'aws-cdk-lib';
  import { Construct } from 'constructs';

interface ApplicationEventsProps {
  processingStateMachine: sfn.IStateMachine;
  uploadBucket: s3.IBucket;
  notificationsService: lambda.IFunction;
}

export class ApplicationEvents extends Construct {
  constructor(scope: Construct, id: string, props: ApplicationEventsProps) {
    super(scope, id);

    // Trigger Step Function from S3 Upload ------------------------------

    const trail = new cloudtrail.Trail(this, 'CloudTrail', {
      includeGlobalServiceEvents: false,
      isMultiRegionTrail: false
    });

    trail.addS3EventSelector([{ bucket: props.uploadBucket }], {
      includeManagementEvents: false,
      readWriteType: cloudtrail.ReadWriteType.WRITE_ONLY
    });

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
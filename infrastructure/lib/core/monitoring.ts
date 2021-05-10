import * as cdk from '@aws-cdk/core';
import * as cw from '@aws-cdk/aws-cloudwatch';
import * as cw_actions from '@aws-cdk/aws-cloudwatch-actions';
import * as apigv2 from '@aws-cdk/aws-apigatewayv2';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as s3 from '@aws-cdk/aws-s3';
import * as sns from '@aws-cdk/aws-sns';
import * as ssm from '@aws-cdk/aws-ssm';
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
import { generateDashboardBody, MonitoringDashboardConfigProps } from '../config/dashboard';

interface ApplicationMonitoringProps {
  api: apigv2.IHttpApi;
  table: ddb.ITable;
  documentsService: lambda.IFunction;
  commentsService: lambda.IFunction;
  usersService: lambda.IFunction;
  processingStateMachine: sfn.IStateMachine;
  assetsBucket: s3.IBucket;
}

export class ApplicationMonitoring extends cdk.Construct {
  private topic: sns.ITopic;

  constructor(scope: cdk.Construct, id: string, props: ApplicationMonitoringProps) {
    super(scope, id);

    // Notification Topic ------------------------------------------------

    this.topic = new sns.Topic(this, 'AlertingTopic', {
      displayName: 'Serverless Application Alerting Topic',
    });

    this.topic.addSubscription(
      new subscriptions.EmailSubscription(ssm.StringParameter.valueForStringParameter(this, 'dms-globomantics-email'))
    );

    // Alarms for Services -----------------------------------------------

    this.addAlarmsToService('Documents', props.documentsService);
    this.addAlarmsToService('Comments', props.commentsService);
    this.addAlarmsToService('Users', props.usersService);

    // Dashboard ---------------------------------------------------------

    const dashboardProps: MonitoringDashboardConfigProps = {
      api: props.api,
      table: props.table,
      documentsService: props.documentsService,
      commentsService: props.commentsService,
      usersService: props.usersService,
      processingStateMachine: props.processingStateMachine,
      assetsBucket: props.assetsBucket,
    };
    const dashboardBody = generateDashboardBody(dashboardProps);

    new cw.CfnDashboard(this, 'MonitoringDashboard', {
      dashboardName: 'DMS_Dashboard',
      dashboardBody,
    });
  }

  addAlarmsToService(name: string, service: lambda.IFunction): void {
    new cw.Alarm(this, `${name}ServiceErrorsAlarm`, {
      metric: service.metricErrors(),
      evaluationPeriods: 1,
      datapointsToAlarm: 1,
      comparisonOperator: cw.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      actionsEnabled: true,
      threshold: 1,
    }).addAlarmAction(new cw_actions.SnsAction(this.topic));

    new cw.Alarm(this, `${name}ServiceInvocationsAlarm`, {
      metric: service.metricInvocations(),
      evaluationPeriods: 1,
      datapointsToAlarm: 1,
      comparisonOperator: cw.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      actionsEnabled: true,
      threshold: 100,
    }).addAlarmAction(new cw_actions.SnsAction(this.topic));

    new cw.Alarm(this, `${name}ServiceThrottlesAlarm`, {
      metric: service.metricThrottles(),
      evaluationPeriods: 1,
      datapointsToAlarm: 1,
      comparisonOperator: cw.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      actionsEnabled: true,
      threshold: 1,
    }).addAlarmAction(new cw_actions.SnsAction(this.topic));
  }
}

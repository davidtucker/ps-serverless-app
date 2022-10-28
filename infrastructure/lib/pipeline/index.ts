import { Stage, StageProps, Stack, StackProps, SecretValue, pipelines } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApplicationStack } from '../core';

class AppStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);
    new ApplicationStack(this, 'AppStack');
  }
}

export class ApplicationPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      crossAccountKeys: false,
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.gitHub('KeatonSmith/ps-serverless-app', 'main', {
          authentication: SecretValue.secretsManager('dms_config', {
            jsonField: 'github_token',
          }),
        }),
        commands: ['yarn install --frozen-lockfile', 'cd infrastructure', 'npx cdk synth'],
        primaryOutputDirectory: 'infrastructure/cdk.out',
      }),
      dockerEnabledForSynth: true,
    });

    pipeline.addStage(new AppStage(this, 'Staging'));
    pipeline.buildPipeline();
  }
}

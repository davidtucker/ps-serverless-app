import { Stage, StageProps, Stack, StackProps, SecretValue, pipelines } from 'aws-cdk-lib';
import { BuildSpec, LinuxBuildImage } from 'aws-cdk-lib/aws-codebuild';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
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

    const source = CodePipelineSource.gitHub('KeatonSmith/ps-serverless-app', 'main', {
      authentication: SecretValue.secretsManager('dms_config', {
        jsonField: 'github_token',
      }),
    });

    const pipeline = new CodePipeline(this, 'Pipeline', {
      dockerEnabledForSynth: true,
      codeBuildDefaults: {
        buildEnvironment: {
          buildImage: LinuxBuildImage.AMAZON_LINUX_2_3,
        },
        partialBuildSpec: BuildSpec.fromObject({
          phases: {
            install: {
              commands: ['n 16.15.1'],
            },
          },
        }),
      },
      synth: new ShellStep('Synth', {
        input: source,
        commands: ['yarn install --frozen-lockfile', 'cd infrastructure', 'npx cdk synth'],
        primaryOutputDirectory: 'infrastructure/cdk.out',
      }),
    });

    pipeline.addStage(new AppStage(this, 'Staging'));
  }
}

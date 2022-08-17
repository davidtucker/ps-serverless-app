import * as cdk from '@aws-cdk/core';
import { CodePipeline, ShellStep, CodePipelineSource } from '@aws-cdk/pipelines';
import { LinuxBuildImage, BuildSpec } from '@aws-cdk/aws-codebuild'
import { ApplicationStack } from '../core';

class AppStage extends cdk.Stage {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);
    new ApplicationStack(this, 'AppStack');
  }
}

export class ApplicationPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const source = CodePipelineSource.gitHub('davidtucker/ps-serverless-app', 'cdk-1.168.0', {
      authentication: cdk.SecretValue.secretsManager('dms_config', {
        jsonField: 'github_token'
      }),
    })

    const pipeline = new CodePipeline(this, 'Pipeline', {
      dockerEnabledForSynth: true,
      codeBuildDefaults: {
        buildEnvironment: {
          buildImage: LinuxBuildImage.AMAZON_LINUX_2_3
        },
        partialBuildSpec: BuildSpec.fromObject({
          phases: {
            install: {
              commands: [
                "n 16.15.1"
              ]
            }
          }
        })
      },
      synth: new ShellStep('Synth', {
        input: source,
        commands: [
          'yarn install --frozen-lockfile',
          'cd infrastructure',
          'npx cdk synth'
        ],
        primaryOutputDirectory: 'infrastructure/cdk.out'
      })
    });

    pipeline.addStage(new AppStage(this, 'Staging'));
  }
}

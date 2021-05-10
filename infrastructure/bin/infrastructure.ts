#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ApplicationStack } from '../lib/core';
import { ApplicationPipelineStack } from '../lib/pipeline';

const app = new cdk.App();
new ApplicationStack(app, 'ApplicationStack');
new ApplicationPipelineStack(app, 'PipelineStack');

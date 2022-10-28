#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { ApplicationPipelineStack } from '../lib/pipeline';

const app = new App();
new ApplicationPipelineStack(app, 'ApplicationStack');

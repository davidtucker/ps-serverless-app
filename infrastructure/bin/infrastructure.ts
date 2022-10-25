#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { ApplicationStack } from '../lib/core';

const app = new App();
new ApplicationStack(app, 'ApplicationStack');

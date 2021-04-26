# Serverless Development on AWS

__This learning path has not launched yet. Once launched the links will be added.__

This repository is for the Serverless Development on AWS learning path for Pluralsight. 

## Approach

This learning path is focused on creating a modern full-stack serverless application on AWS using real world techniques and approaches.  It follows the following opinionated concepts:

* It leverages a [monorepo](https://en.wikipedia.org/wiki/Monorepo) structure with [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
* The backend services are created for Node.js wtih JavaScript and are exposed as REST API's
* The web application is created using React using hooks
* The infrastructure is defined with TypeScript using the [AWS CDK](https://aws.amazon.com/cdk/)
* Continuous delivery is implemented using an AWS CDK Pipeline
* No third-party services are leveraged as the focus is on a cloud-native approach with AWS only

## Following Along

This repository is designed to be used alongside the learning path.  While the course consists of 11 courses, there are 5 courses where the concepts are applied to the sample application.  For each of these courses, you will have a starting and ending branch.  In addition, there will be a link to compare those two branches.

The course links will be added once the entire path is released in the Pluralsight library.

### Implementing Serverless Web Application Hosting and Delivery on AWS

This course shows how to implement hosting for a single-page web application using the AWS CDK with Amazon S3 and CloudFront.

Course Link (to be added once released)
 
* [Starting Branch](https://github.com/davidtucker/ps-serverless-app/tree/p1)
* [Ending Branch](https://github.com/davidtucker/ps-serverless-app/tree/p2)
* [Comparison Between Branches](https://github.com/davidtucker/ps-serverless-app/compare/p1...p2)

### Building a Serverless API Tier with Amazon API Gateway

This course shows how to build an API tier using AWS Lambda and Amazon API Gateway.

Course Link (to be added once released)
 
* [Starting Branch](https://github.com/davidtucker/ps-serverless-app/tree/p2)
* [Ending Branch](https://github.com/davidtucker/ps-serverless-app/tree/p3)
* [Comparison Between Branches](https://github.com/davidtucker/ps-serverless-app/compare/p2...p3)

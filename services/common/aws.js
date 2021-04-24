/*

  Pluralsight Serverless Development Path (https://tuck.cc/serverlessDev)
  Author: David Tucker (davidtucker.net)

  ---

  AWS Clients

  This file exports functions to create each of the AWS clients that will
  be used throughout this application.  By having all of these in one
  location, it will be easier to implement tracing for AWS service calls.

*/
import * as AWS from 'aws-sdk';

let _dynamoDB;

/**
 * Creates the DynamoDB client for use in the application.
 *
 * @returns {object} DynamoDB Client
 */
const dynamoDB = () => {
  if (!_dynamoDB) {
    _dynamoDB = new AWS.DynamoDB.DocumentClient();
  }
  return _dynamoDB;
};

export const AWSClients = {
  dynamoDB,
};

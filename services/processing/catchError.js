import * as path from 'path';
import { AWSClients } from '../common';

// Get S3 Client
const s3 = AWSClients.s3();

// Get Eventbridge Client
const eventbridge = AWSClients.eventbridge();

// Utilize the DynamoDB Document Client
const dynamoDB = AWSClients.dynamoDB();
const tableName = process.env.DYNAMO_DB_TABLE;

exports.handler = async event => {
  // First function failing
  const filename =
    Object.prototyle.hasOwnProperty.call(event, 'detail') && event.detail.requestParameters.key
      ? event.detail.requestParameters.key
      : event.file.key;

  if (!filename || filename.length < 5) {
    throw new Error('Could not determine filename from input data');
  }
  const key = path.basename(filename, '.pdf');

  // Get Owner from DynamoDB
  const getOwnerParams = {
    TableName: tableName,
    KeyConditionExpression: 'PK = :key AND begins_with(SK, :prefix)',
    ExpressionAttributeValues: {
      ':key': key,
      ':prefix': 'Doc',
    },
  };
  const results = await dynamoDB.query(getOwnerParams).promise();
  const owner = results.Items[0].Owner;
  const originalFileName = results.Items[0].FileDetails.fileName;

  // Try to delete from DynamoDB
  const deleteParams = {
    TableName: tableName,
    Key: {
      PK: key,
      SK: 'Doc#Marketing',
    },
  };
  try {
    await dynamoDB.delete(deleteParams).promise();
  } catch (error) {
    console.error(`Could not delete data from database ${error}`);
  }

  // Try to delete from S3 (both buckets)
  try {
    await s3.deleteObject({ Key: filename, Bucket: process.env.UPLOAD_BUCKET }).promise();
    await s3.deleteObject({ Key: filename, Bucket: process.env.ASSET_BUCKET }).promise();
  } catch (error) {
    console.info('Cannot delete file from one or more buckets.  This may not be an error.');
  }

  // Try to delete thumbnail
  try {
    await s3
      .deleteObject({
        Key: `${key}-thumb.png`,
        Bucket: process.env.ASSET_BUCKET,
      })
      .promise();
  } catch (error) {
    console.info(
      `Cannot delete thumbnail.  This may not be an error, as the thumbnail may not have been created yet.`,
    );
  }

  // Send EventBridge event
  const detail = {
    filename: originalFileName,
    key,
    owner,
  };
  const eventParams = {
    Entries: [
      {
        Detail: JSON.stringify(detail),
        DetailType: 'ProcessingFailed',
        EventBusName: 'com.globomantics.dms',
        Resources: [],
        Source: 'com.globomantics.dms.processing',
      },
    ],
  };

  await eventbridge.putEvents(eventParams).promise();
};

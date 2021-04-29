import * as path from 'path';
import { AWSClients, generateUpdateExpressions } from '../common';

const s3 = AWSClients.s3();

// Utilize the DynamoDB Document Client
const dynamoDB = AWSClients.dynamoDB();
const tableName = process.env.DYNAMO_DB_TABLE;

const getThumbnailURL = event => {
  const region = process.env.AWS_REGION;
  const { bucket } = event.thumbnail;
  return `http://s3.${region}.amazonaws.com/${bucket}/${event.thumbnail.key}`;
};

const getDocumentURL = event => {
  const region = process.env.AWS_REGION;
  const bucket = process.env.ASSET_BUCKET;
  return `http://s3.${region}.amazonaws.com/${bucket}/${event.file.key}`;
};

exports.handler = async event => {
  const combinedEvent = {
    ...event[0],
    ...event[1],
  };

  // Delete file from Upload bucket
  const deleteObjectParams = {
    Key: combinedEvent.file.key,
    Bucket: combinedEvent.file.bucket,
  };
  await s3.deleteObject(deleteObjectParams).promise();

  // Update DynamoDB with values
  const item = {
    DateProcessed: new Date().toISOString(),
    DateUploaded: new Date().toISOString(),
    Thumbnail: getThumbnailURL(combinedEvent),
    Document: getDocumentURL(combinedEvent),
    FileSize: combinedEvent.file.size,
    Metadata: combinedEvent.metadata,
    DetectedText: combinedEvent.textDetection.textOutput,
  };

  const expressions = generateUpdateExpressions(item);
  const updateParams = {
    TableName: tableName,
    Key: {
      PK: path.basename(combinedEvent.file.key, '.pdf'),
      SK: 'Doc#Marketing',
    },
    UpdateExpression: expressions.updateExpression,
    ExpressionAttributeValues: expressions.expressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  };
  await dynamoDB.update(updateParams).promise();
};

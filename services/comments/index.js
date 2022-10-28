/*
  Pluralsight Serverless Development Path (https://tuck.cc/serverlessDev)
  Author: David Tucker (davidtucker.net)
  ---
  Comments Service
  This Lambda function handles all interactions for comments in the document
  management system application (create, delete, get).
*/
import {
  createRouter,
  RouterType,
  Matcher,
  validatePathVariables,
  validateBodyJSONVariables,
} from 'lambda-micro';
import { AWSClients, generateID } from '../common';

// Utilize the DynamoDB Document Client
const dynamoDB = AWSClients.dynamoDB();
const tableName = process.env.DYNAMO_DB_TABLE;

// Get the EventBridge client
const eventbridge = AWSClients.eventbridge();

// JSON schemas used to validate requests to the service calls
const schemas = {
  createComment: require('./schemas/createComment.json'),
  deleteComment: require('./schemas/deleteComment.json'),
  getComments: require('./schemas/getComments.json'),
};

//------------------------------------------------------------------------
// SERVICE FUNCTIONS
//------------------------------------------------------------------------

// Get all comments for a document
const getAllCommentsForDocument = async (request, response) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': request.pathVariables.docid,
      ':sk': 'Comment',
    },
  };
  const results = await dynamoDB.query(params).promise();
  return response.output(results.Items, 200);
};

// Creates a new comment for a document
const createComment = async (request, response) => {
  const userId =  request.event.requestContext.authorizer.jwt.claims.username; // Hard-coded until we put users in place
  const commentId = `Comment#${generateID()}`;
  const item = {
    PK: request.pathVariables.docid,
    SK: commentId,
    DateAdded: new Date().toISOString(),
    Owner: userId,
    ...JSON.parse(request.event.body),
  };
  const params = {
    TableName: tableName,
    Item: item,
    ReturnValues: 'NONE',
  };
  await dynamoDB.put(params).promise();


  // Send comment event using Eventbridge
  // This will allow us to connect into this event for notifications
  const detail = {
    documentId: request.pathVariables.docid,
    commentId,
  };
  const eventParams = {
    Entries: [
      {
        Detail: JSON.stringify(detail),
        DetailType: 'CommentAdded',
        EventBusName: 'com.globomantics.dms',
        Resources: [],
        Source: 'com.globomantics.dms.comments',
      },
    ],
  };
  await eventbridge.putEvents(eventParams).promise();
  
  return response.output(item, 200);
};

// Deletes a comment
const deleteComment = async (request, response) => {
  const params = {
    TableName: tableName,
    Key: {
      PK: request.pathVariables.docid,
      SK: `Comment#${request.pathVariables.commentid}`,
    },
  };
  await dynamoDB.delete(params).promise();
  return response.output({}, 200);
};

//------------------------------------------------------------------------
// LAMBDA ROUTER
//------------------------------------------------------------------------

/*
    This uses a custom Lambda container that I have created that is very 
    similar to what I use for my projects in production (with the only
    exception being that it is JavaScript and not TypeScript). I have
    released this as an npm package, lambda-micro, and you can view it
    at the link below.
    This is similar to what you can do with something like Express, but it 
    doesn't have the weight of using Express fully.
    https://github.com/davidtucker/lambda-micro
  */
const router = createRouter(RouterType.HTTP_API_V2);

// Get all comments for a document
// GET /comments/(:docid)
router.add(
  Matcher.HttpApiV2('GET', '/comments/(:docid)'),
  validatePathVariables(schemas.getComments),
  getAllCommentsForDocument,
);

// Create a new comment for a document
// POST /comments/(:docid)
router.add(
  Matcher.HttpApiV2('POST', '/comments/(:docid)'),
  validateBodyJSONVariables(schemas.createComment),
  createComment,
);

// Delete a comment for a document
// DELETE /comments/(:docid)/(:commentid)
router.add(
  Matcher.HttpApiV2('DELETE', '/comments/(:docid)/(:commentid)'),
  validatePathVariables(schemas.deleteComment),
  deleteComment,
);

// Lambda Handler
exports.handler = async (event, context) => {
  return router.run(event, context);
};

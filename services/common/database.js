// This function is used when updating an item in DynamoDB.  It generates the
// update expression and attribute values
export const generateUpdateExpressions = body => {
  const updateExpression = [];
  const expressionAttributeValues = {};
  Object.keys(body).forEach(key => {
    updateExpression.push(`${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = body[key];
  });
  return {
    updateExpression: `set ${updateExpression.join(', ')}`,
    expressionAttributeValues,
  };
};

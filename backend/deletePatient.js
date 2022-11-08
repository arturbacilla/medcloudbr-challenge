// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  let response;
  const params = {
    TableName: 'medcloudbr',
    Key: {
      id: event.pathParameters.id,
    },
    ReturnValues: 'ALL_OLD',
    ConditionExpression: 'attribute_exists(id) AND contains(id, :i)',
    ExpressionAttributeValues: {
      ':i': event.pathParameters.id,
    },
  };
  await dynamodb.delete(params).promise().then((data) => {
    response = {
      statusCode: 204,
      body: JSON.stringify(data),
    };
  }).catch((err) => {
    if (err.code === 'ConditionalCheckFailedException') {
      response = {
        statusCode: 404,
        body: JSON.stringify(`Patient ${event.pathParameters.id} not found.`),
      };
    }
    response = {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  });
  return response;
};

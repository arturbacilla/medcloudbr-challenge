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
  };
  await dynamodb.get(params).promise().then((data) => {
    if (Object.keys(data).length !== 0) {
      response = {
        statusCode: 200,
        body: JSON.stringify(data.Item),
      };
    } else {
      response = {
        statusCode: 404,
        body: JSON.stringify(`Patient ${event.pathParameters.id} not found.`),
      };
    }
  }).catch((err) => {
    response = {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  });
  return response;
};

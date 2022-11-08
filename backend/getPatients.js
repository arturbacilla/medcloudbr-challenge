// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event) => {
  let response;
  const params = {
    TableName: 'medcloudbr',
  };
  await dynamodb.scan(params).promise().then((data) => {
    response = {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  }).catch((err) => {
    response = {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  });
  return response;
};

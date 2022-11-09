// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');
const { setResponse } = require('../../helpers/setResponse');

const dynamodb = new AWS.DynamoDB.DocumentClient();

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event) => {
  let response;
  const params = {
    TableName: 'medcloudbr',
  };
  await dynamodb.scan(params).promise()
    .then((data) => {
      response = setResponse(200, data.Items);
    }).catch((err) => {
      response = setResponse(500, `${err}`);
    });
  return response;
};

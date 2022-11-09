// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');
const { setResponse } = require('../../helpers/setResponse');

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
    response = Object.keys(data).length !== 0
      ? setResponse(200, data.Item)
      : setResponse(404, `Patient ${event.pathParameters.id} not found.`);
  }).catch((err) => {
    response = setResponse(500, `${err}`);
  });
  return response;
};

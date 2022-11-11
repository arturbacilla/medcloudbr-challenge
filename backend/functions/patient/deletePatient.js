// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');
const { setResponse } = require('../../helpers/setResponse');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  let response;
  const params = {
    TableName: 'medcloudbr',
    Key: {
      id: event.params.path.id,
    },
    ReturnValues: 'ALL_OLD',
    ConditionExpression: 'attribute_exists(id) AND contains(id, :i)',
    ExpressionAttributeValues: {
      ':i': event.params.path.id,
    },
  };
  await dynamodb.delete(params).promise().then((data) => {
    response = setResponse(204, data);
  }).catch((err) => {
    response = err.code === 'ConditionalCheckFailedException'
      ? setResponse(404, `Patient ${event.params.path.id} not found.`)
      : setResponse(500, `${err}`);
  });
  return response;
};

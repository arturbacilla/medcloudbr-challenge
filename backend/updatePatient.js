// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  let response;
  const newInfo = JSON.parse(event.body);
  const params = {
    TableName: 'medcloudbr',
    Key: {
      id: event.pathParameters.id,
    },
    ConditionExpression: 'attribute_exists(id) AND contains(id, :i)',
    UpdateExpression: 'SET #nm = :n, #bd = :bd, #em = :em, #ad = :ad, #adm = :adm',
    ExpressionAttributeNames: {
      '#nm': 'name',
      '#bd': 'birthdate',
      '#em': 'email',
      '#ad': 'address',
      '#adm': 'admin',
    },
    ExpressionAttributeValues: {
      ':i': event.pathParameters.id,
      ':n': newInfo.name,
      ':bd': newInfo.birthdate,
      ':em': newInfo.email,
      ':ad': newInfo.address,
      ':adm': newInfo.admin,
    },
    ReturnValues: 'UPDATED_NEW',
  };
  await dynamodb.update(params).promise().then((data) => {
    response = {
      statusCode: 200,
      body: JSON.stringify(data.Attributes),
    };
  }).catch((err) => {
    if (err.code === 'ConditionalCheckFailedException') {
      response = {
        statusCode: 404,
        body: JSON.stringify(`Patient ${event.pathParameters.id} not found.`),
      };
    } else {
      response = {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    }
  });
  return response;
};

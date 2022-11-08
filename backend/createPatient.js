// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  let response;
  const params = {
    TableName: 'medcloudbr',
    Item: {
      id: AWS.util.uuid.v4(),
      name: event.name,
      birthdate: event.birthdate,
      email: event.email,
      address: event.address,
      admin: false,
    },
  };
  await dynamodb.put(params).promise().then(() => {
    response = {
      statusCode: 200,
      body: JSON.stringify(`Patient ${event.name} created successfully!`),
    };
  }).catch((err) => {
    response = {
      statusCode: 500,
      err,
    };
  });
  return response;
};

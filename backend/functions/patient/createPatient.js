// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const { setResponse } = require('../../helpers/setResponse');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const salt = bcrypt.genSaltSync(10);

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
      password: bcrypt.hashSync(event.password, salt),
    },
  };
  await dynamodb.put(params).promise().then(() => {
    response = setResponse(200, `Patient ${event.name} created successfully!`);
  }).catch((err) => {
    response = setResponse(500, `${err}`);
  });
  return response;
};

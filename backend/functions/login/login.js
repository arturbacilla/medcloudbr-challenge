// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const { setResponse } = require('../../helpers/setResponse');
const { generateToken } = require('../../helpers/token');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.execute = async (event) => {
  let response;

  const params = {
    TableName: 'medcloudbr',
    FilterExpression: '#email = :email',
    ExpressionAttributeNames: { '#email': 'email' },
    ExpressionAttributeValues: { ':email': event.email },
  };
  await dynamodb.scan(params).promise().then((data) => {
    if (data.Items[0]) {
      const { email, password, admin } = data.Items[0];
      if (!admin) {
        response = setResponse(401, 'Only admins can access this area.');
      } else {
        const passCheck = bcrypt.compareSync(event.password, password);
        response = !passCheck ? setResponse(401, 'Invalid credentials.') : setResponse(200, { token: generateToken({ email, password }) });
      }
    } else {
      response = setResponse(404, 'User not found.');
    }
  }).catch((err) => {
    response = setResponse(500, `${err}`);
  });
  return response;
};

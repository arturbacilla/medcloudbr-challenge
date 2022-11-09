// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.userExists = async (email) => {
  const params = {
    TableName: 'medcloudbr',
    FilterExpression: '#email = :email',
    ExpressionAttributeNames: { '#email': 'email' },
    ExpressionAttributeValues: { ':email': email },
  };
  await dynamodb.scan(params).promise().then((data) => {
    if (data.Items[0]) return true;
    return false;
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
};

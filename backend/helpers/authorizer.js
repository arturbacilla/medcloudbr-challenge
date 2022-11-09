const { checkToken } = require('./token');

const generatePolicyDocument = (effect, methodArn) => {
  if (!effect || !methodArn) return null;
  const policyDocument = {
    Version: '2012-10-17',
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: methodArn,
    }],
  };
  return policyDocument;
};

const generateAuthResponse = (principalId, effect, methodArn) => {
  const policyDocument = generatePolicyDocument(effect, methodArn);
  return {
    principalId,
    policyDocument,
  };
};

module.exports.authorizer = async (event) => {
  const token = event.authorizationToken;
  const { methodArn } = event;
  const checkedToken = checkToken(token);
  if (checkedToken.valid) {
    return generateAuthResponse('user', 'Allow', methodArn);
  }
  return generateAuthResponse('user', 'Deny', methodArn);
};

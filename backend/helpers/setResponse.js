module.exports.setResponse = (code, msg) => ({
  statusCode: code,
  body: JSON.stringify(msg),
});

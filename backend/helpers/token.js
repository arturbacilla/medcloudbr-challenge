const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports.generateToken = (userdata) => jwt.sign(userdata, JWT_SECRET, JWT_CONFIG);

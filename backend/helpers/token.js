const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (userdata) => jwt.sign(userdata, JWT_SECRET, JWT_CONFIG);
const checkToken = (token) => {
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    if (typeof (verified) === 'string') return { valid: false, payload: {} };
    return { valid: true, payload: verified };
  } catch (error) {
    return { valid: false, payload: error };
  }
};

module.exports = { generateToken, checkToken };

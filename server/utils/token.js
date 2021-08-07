const jwt = require('jsonwebtoken');
require('dotenv').config();

const getTokenFrom = (request) => {
  // extract jwt from request header
  const authorization = request.get('authorization');
  console.log(authorization);
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }

  return null;
};

// returns true if token is valid, false otherwise
const verifyToken = (token) => {
  console.log('Token: ', token);
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!token || !decodedToken.id) {
    return false;
  }

  return decodedToken;
};

module.exports = {
  getTokenFrom,
  verifyToken,
};

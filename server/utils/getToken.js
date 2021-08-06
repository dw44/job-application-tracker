const getTokenFrom = (request) => {
  // extract jwt from request header
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }

  return null;
};

module.exports = getTokenFrom;

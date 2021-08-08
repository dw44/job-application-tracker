/* eslint-disable consistent-return */
// Add error handling for jwterror; casterror
const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({
      statusCode: 400,
      status: 'Bad Request',
      message: error.message,
    });
  }
  // jwt errors
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      statusCode: 401,
      status: 'Unauthorized',
      error: 'JSON Web Token Error',
    });
  }
  // mongoose id casting errors
  if (error.name === 'CastError') {
    return response.status(400).json({
      statusCode: 400,
      status: 'Bad Request',
      error: 'Incorrect ID',
    });
  }

  next(error);
};

module.exports = errorHandler;

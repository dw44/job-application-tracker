const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

loginRouter.post('/', async (request, response) => {
  const { body } = request;

  const user = await User.findOne({ username: body.username });

  // no password  if no user
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response
      .status(401)
      .json({
        statusCode: 401,
        status: 'Unauthorized',
        message: 'Incorrect username or password',
      });
  }

  const userForToken = {
    username: user.username,
    name: user.name,
    id: user._id.toString(),
  };

  const token = await jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

  return response.status(200).json({
    statusCode: 200,
    status: 'OK',
    message: `Logged in as ${user.username}`,
    token,
  });
});

module.exports = loginRouter;

const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.status(200).json({
    statusCode: 200,
    status: 'Success',
    users,
  });
});

usersRouter.post('/', async (request, response) => {
  const { body } = request;

  if (!body.username
      || !body.password
      || !body.firstName
      || !body.lastName
      || !body.secretQuestion
      || !body.secretAnswer) {
    response.status(400).json({
      statusCode: 400,
      status: 'Error',
      message: 'All fields are mandatory',
    });
  } else if (body.password.length < 3) {
    response.status(400).json({
      statusCode: 400,
      status: 'Error',
      message: 'Password must be at least 3 characters long',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const secretAnswerHash = await bcrypt.hash(body.secretAnswer, saltRounds);

  const user = new User({
    username: body.username,
    firstName: body.firstName,
    lastName: body.lastName,
    secretQuestion: body.secretQuestion,
    secretAnswerHash,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;

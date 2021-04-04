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

  // return error if any fields are missing. Can't have missing fields here
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
  }

  if (body.password.length < 3) {
    // Can't have short password
    response.status(400).json({
      statusCode: 400,
      status: 'Error',
      message: 'Password must be at least 3 characters long',
    });
  }

  // making sure that a preexisting username can't be registered again
  const preExisting = await User.find({ username: body.username });
  if (preExisting.length) {
    response.status(400).json({
      statusCode: 400,
      status: 'Error',
      message: 'Username Taken',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  // secret answer changed to hash from initially being stored in db as text
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

// #TODO: Implement delete functionality after auth

module.exports = usersRouter;

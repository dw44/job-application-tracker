const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// === GET all user ===
usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  return response.status(200).json({
    statusCode: 200,
    status: 'Success',
    users,
  });
});

// === CREATE/REGISTER new user ===
usersRouter.post('/', async (request, response) => {
  const { body } = request;
  // responses returned to avoid needless if-else nesting

  // return error if any fields are missing. Can't have missing fields here
  if (!body.username
      || !body.password
      || !body.email
      || !body.secretQuestion
      || !body.secretAnswer) {
    return response.status(400).json({
      statusCode: 400,
      status: 'Error',
      message: 'All fields are mandatory',
    });
  }

  if (body.password.length < 6) {
    // Can't have short password
    return response.status(400).json({
      statusCode: 400,
      status: 'Error',
      message: 'Password must be at least 6 characters long',
    });
  }

  if (body.username.trim().length < 3) {
    return response.status(400).json({
      statusCode: 400,
      status: 'Error',
      message: 'Username must be at least 3 characters long',
    });
  }

  if (body.secretQuestion.trim().length < 5) {
    return response.status(400).json({
      statusCode: 400,
      status: 'Error',
      message: 'Secret Question must be at least 5 characters long',
    });
  }

  if (body.secretAnswer.trim() === '') {
    return response.status(400).json({
      statusCode: 400,
      status: 'Error',
      message: 'Secret Answer cannot be empty',
    });
  }
  // making sure that a preexisting username can't be registered again
  const userNameExists = await User.find({ username: body.username });
  const emailExists = await User.find({ email: body.email });

  const preExisting = userNameExists.length > 0 || emailExists.length > 0;

  if (preExisting) {
    return response.status(400).json({
      statusCode: 400,
      status: 'Error',
      message: 'Username or email already registered',
    });
  }

  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  // secret answer changed to hash from initially being stored in db as text
  const secretAnswerHash = await bcrypt.hash(body.secretAnswer, saltRounds);

  const user = new User({
    username: body.username,
    email: body.email,
    secretQuestion: body.secretQuestion,
    secretAnswerHash,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.json({
    statusCode: 200,
    status: 'User successfully created',
    user: savedUser.username,
  });
});

// Change password functionality -> Multiple routes
usersRouter.get('/forgot_password', async (request, response) => {
  // return error if no username provided with request
  if (!request.body.username) {
    return response.status(400).json({
      statusCode: 400,
      status: 'Bad Request',
      message: 'No username provided',
    });
  }

  const user = await User.find({ username: request.body.username.trim() });

  // returns empty array if no result
  if (!user.length) {
    return response.status(404).json({
      statusCode: 404,
      status: 'Not Found',
      message: 'User not found',
    });
  }

  /* return user id with succesful request to search for user
    in next request in chain. pass secret question to next step
    from here to avoid unnecessary fetch requests in next step */

  return response.status(200).json({
    statusCode: 200,
    status: 'User found',
    message: 'Success',
    user: user[0]._id,
    question: user[0].secretQuestion,
  });
});

// step 2 of changing password via secret question.
usersRouter.put('/:id', async (request, response) => {
  const { secretAnswer, newPassword } = request.body;
  const user = await User.findById(request.params.id);

  // returns empty array if no result
  if (!user) {
    return response.status(404).json({
      statusCode: 404,
      status: 'Not Found',
      message: 'User not found',
    });
  }

  // compare secret answers
  const correctAnswer = await bcrypt.compare(secretAnswer, user.secretAnswerHash);

  if (!correctAnswer) {
    return response.status(401).json({
      statusCode: 401,
      status: 'Unauthorized',
      message: 'Incorrect secret answer',
    });
  }
  const saltRounds = 12;
  const newHash = await bcrypt.hash(newPassword, saltRounds);

  await User.findByIdAndUpdate(request.params.id, { passwordHash: newHash }, { new: true });

  return response.status(202).json({
    statusCode: 202,
    status: 'Accepted',
    message: 'Password updated',
  });
});

// change password functionality for authenticated users
// uses old and new password
usersRouter.put('/', async (request, response) => {
  const { newPassword } = request.body;

  const authorization = request.get('authorization');
  let token = null;

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      statusCode: 401,
      status: 'Unauthorized',
      message: 'Invalid or missing token',
    });
  }

  const saltRounds = 12;
  const newHash = await bcrypt.hash(newPassword, saltRounds);
  const updatedUser = await User.findByIdAndUpdate(
    decodedToken.id,
    { passwordHash: newHash },
    { new: true },
  );

  return response.status(202).json({
    statusCode: 202,
    status: 'Accepted',
    message: 'Password updated',
    updatedUser,
  });
});

module.exports = usersRouter;

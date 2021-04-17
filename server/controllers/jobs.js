const jobsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Job = require('../models/Job');
const User = require('../models/User');

const getTokenFrom = (request) => {
  // extract jwt from request header
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }

  return null;
};

// returns true if token is valid, false otherwise
const verifyToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!token || !decodedToken.id) {
    return false;
  }

  return decodedToken;
};

// NO DELETE FUNCTIONALITY THROUGH SERVER - CAN ONLY BE DELETED DIRECTLY FROM DB

// ==========
// add new job. needs auth
jobsRouter.post('/', async (request, response) => {
  const { body } = request;
  const token = getTokenFrom(request);

  // reject incomplete data
  if (!body.title || !body.city || !body.company) {
    return response.status(400).json({
      statusCode: 400,
      status: 'Failure',
    });
  }

  // don't authorize if valid token not provided
  const verifiedToken = verifyToken(token);
  if (verifiedToken) {
    return response.status(401).json({
      statusCode: 401,
      status: 'Unauthorized',
      message: 'Invalid or missing token',
    });
  }

  // get user id from jwt
  const user = await User.findById(verifiedToken.id);

  const job = new Job({
    title: body.title,
    city: body.city,
    company: body.company,
    link: body.link,
    notes: body.notes,
    user: user._id,
    status: body.status || 1,
  });

  const savedJob = await job.save();
  // add job to user's jobs array and save user too
  user.jobs = user.jobs.concat(savedJob._id);
  await user.save();

  response.status(201).json({
    statusCode: 201,
    status: 'Success',
    savedJob,
  });
});

// ==========
// retrieve jobs. Only retrieves jobs for logged in user
jobsRouter.get('/', async (request, response) => {
  // protected route. needs auth
  const token = getTokenFrom(request);

  // don't authorize if valid token not provided
  const verifiedToken = verifyToken(token);
  if (!verifiedToken) {
    return response.status(401).json({
      statusCode: 401,
      status: 'Unauthorized',
      message: 'Invalid or missing token',
    });
  }

  // auth passed. get user, and only the jobs created by the user
  const user = await User.findById(verifiedToken.id);
  const jobs = await Job.find({ user: user._id });

  response.status(201).json({
    statusCode: 201,
    status: 'Success',
    jobs,
  });
});

// ==========
// edit job. Requires authorization.
jobsRouter.put('/:id', async (request, response) => {
  // TBD
});

module.exports = jobsRouter;

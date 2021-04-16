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

jobsRouter.post('/', async (request, response) => {
  const { body } = request;
  const token = getTokenFrom(request);

  if (!body.title || !body.city || !body.company) {
    return response.status(400).json({
      statusCode: 400,
      status: 'Failure',
    });
  }

  // don't authorize if valid token not provided
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      statusCode: 401,
      status: 'Unauthorized',
      message: 'Invalid or missing token',
    });
  }

  const user = await User.findById(decodedToken.id);

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
  user.jobs = user.jobs.concat(savedJob._id);
  await user.save();

  response.status(201).json({
    statusCode: 201,
    status: 'Success',
    savedJob,
  });
});

module.exports = jobsRouter;

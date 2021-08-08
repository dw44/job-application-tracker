const jobsRouter = require('express').Router();

const Job = require('../models/Job');
const User = require('../models/User');

const { getTokenFrom, verifyToken } = require('../utils/token');

// NO DELETE FUNCTIONALITY THROUGH SERVER - CAN ONLY BE DELETED DIRECTLY FROM DB
// Delete functionality simulated by manipulating "markedTrash" property on

// ==========
// retrieve jobs. Only retrieves jobs for logged in user
jobsRouter.get('/', async (request, response) => {
  // protected route. needs auth
  const token = getTokenFrom(request);
  // don't authorize if valid token not provided
  const verifiedToken = verifyToken(token);

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
// add new job. needs auth
jobsRouter.post('/', async (request, response) => {
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

  // get user id from jwt
  const user = await User.findById(verifiedToken.id);

  const { body } = request;
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

  return response.status(201).json({
    statusCode: 201,
    status: 'Success',
    savedJob,
  });
});

// ==========
// edit job. Requires authorization.
// ==========
// TODO: block empty requests
jobsRouter.put('/:id', async (request, response) => {
  const { body } = request;
  const { id } = request.params;

  // token auth
  const token = getTokenFrom(request);
  const verifiedToken = verifyToken(token);

  // auth failed. shut things down.
  if (!verifiedToken) {
    return response.status(401).json({
      statusCode: 401,
      status: 'Unauthorized',
      message: 'Invalid or missing token',
    });
  }

  // auth passed. search db for job
  const job = await Job.findById(id);

  // no job found. shut things down
  if (!job) {
    return response.status(404).json({
      statusCode: 404,
      status: 'Not found',
      message: 'Job application not found',
    });
  }

  // job found, wrong user. this can't be allowed to happen. block via front end.
  if (job.user.toString() !== verifiedToken.id) {
    return response.status(401).json({
      statusCode: 401,
      status: 'Unathorized',
      message: 'User not authorized to edit this job',
    });
  }

  // reminder: send all values with req. don't use values from job fetched from db
  const newJob = {
    title: body.title || job.title,
    city: body.city || job.city,
    markedTrash: body.markedTrash || job.markedTrash,
    company: body.company || job.company,
    link: body.link || job.link,
    notes: body.notes || job.notes,
    status: body.status || job.status,
  };

  const updatedJob = await Job.findByIdAndUpdate(id, newJob, { new: true });

  return response.status(202).json({
    statusCode: 202,
    status: 'Accepted',
    updatedJob,
  });
});

module.exports = jobsRouter;

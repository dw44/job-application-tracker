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
  if (!verifiedToken) {
    return response.status(401).json({
      statusCode: 401,
      status: 'Unauthorized',
      message: 'Invalid or missing token',
    });
  }

  try {
  // auth passed. get user, and only the jobs created by the user
    const user = await User.findById(verifiedToken.id);
    const jobs = await Job.find({ user: user._id });

    response.status(201).json({
      statusCode: 201,
      status: 'Success',
      jobs,
    });
  } catch (error) {
    return response.status(500).json(error);
  }
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

  try {
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
  } catch (error) {
    return response.status(500).json(error);
  }
});

// ==========
// edit job. Requires authorization.
// ==========
jobsRouter.put('/:id', async (request, response) => {
  const { body } = request;
  const { id } = request.params;
  // token auth
  const token = getTokenFrom(request);
  const verifiedToken = verifyToken(token);
  if (!verifiedToken) {
    return response.status(401).json({
      statusCode: 401,
      status: 'Unauthorized',
      message: 'Invalid or missing token',
    });
  }

  try {
    const job = await Job.findById(id);

    if (!job) {
      response.status(404).json({
        statusCode: 404,
        status: 'Not found',
        message: 'Job application not found',
      });
    }

    if (job.user.toString() !== verifiedToken.id) {
      return response.status(401).json({
        statusCode: 401,
        status: 'Unathorized',
        message: 'User not authorized to edit this job',
      });
    }

    // reminder: send all values with req. don't use values from job fetched from db
    const newJob = {
      title: body.title,
      city: body.city,
      markedTrash: body.markedTrash,
      company: body.company,
      link: body.link,
      notes: body.notes,
      status: body.status,
    };

    const updatedJob = await Job.findByIdAndUpdate(id, newJob, { new: true });

    response.status(202).json({
      statusCode: 202,
      status: 'Accepted',
      updatedJob,
    });
  } catch (error) {
    return response.status(500).json(error);
  }
});

module.exports = jobsRouter;

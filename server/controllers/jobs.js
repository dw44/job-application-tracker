const jobsRouter = require('express').Router();
const Job = require('../models/Job');

jobsRouter.get('/', async (request, response) => {
  const jobs = await Job.find({});
  response.json({
    statusCode: 200,
    status: 'Success',
    jobs,
  });
});

jobsRouter.get('/:id', (request, response) => {
  const { id } = request.params;
  const entry = jobs.filter((job) => job.id === id);

  if (entry.length) {
    return response.status(200).json({
      statusCode: '200',
      status: 'Success',
      entry: entry[0],
    });
  }

  return response.status(404).json({
    statusCode: 404,
    status: 'Error',
    message: 'Not Found',
  });
});

// updated to post to db
jobsRouter.post('/', async (request, response) => {
  const { body } = request;
  // prevents submission going through without required fields
  if (!body.title || !body.city || !body.company) {
    return response.status(400).json({
      statusCode: 400,
      status: 'Failure',
    });
  }
  // #TODO - Handle date through a library
  const job = new Job({
    title: body.title,
    city: body.city,
    company: body.company,
    link: body.link,
    notes: body.notes,
  });

  const savedJob = await job.save();
  console.log(savedJob);
  response.status(201).json({
    statusCode: '201',
    status: 'Success',
    job: savedJob,
  });
});

jobsRouter.delete('/:id', (request, response) => response.status(204).json({
  statusCode: 204,
  status: 'Success',
}));

module.exports = jobsRouter;

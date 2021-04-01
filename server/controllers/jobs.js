const jobs = [
  {
    id: '1',
    title: 'President of the United States',
    city: 'Brasilia',
    company: 'Citibank',
    dateApplied: new Date().toDateString(),
    status: 1,
    categories: ['Professional', 'Full Time'],
    link: 'https://www.citibank.com',
  },
  {
    id: '2',
    title: 'CTO',
    city: 'Bay Area',
    company: 'Google',
    dateApplied: new Date().toDateString(),
    status: 5,
    categories: ['Professional', 'Full Time'],
    link: 'https://www.google.com',
  },
  {
    id: '3',
    title: 'CFO',
    city: 'NYC',
    company: 'NYT',
    dateApplied: new Date().toDateString(),
    status: 2,
    categories: ['Part Time'],
    link: 'https://www.nyt.com',
  },
];

const jobsRouter = require('express').Router();

jobsRouter.get('/', (request, response) => response.status(200).json({
  statusCode: 200,
  status: 'Success',
  jobs,
}));

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

module.exports = jobsRouter;

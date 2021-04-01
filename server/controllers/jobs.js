const jobs = [
  {
    title: 'President of the United States',
    city: 'Brasilia',
    company: 'Citibank',
    dateApplied: new Date().toDateString(),
    status: 1,
    categories: ['Professional', 'Full Time'],
    link: 'https://www.citibank.com',
  },
  {
    title: 'CTO',
    city: 'Bay Area',
    company: 'Google',
    dateApplied: new Date().toDateString(),
    status: 5,
    categories: ['Professional', 'Full Time'],
    link: 'https://www.google.com',
  },
  {
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

module.exports = jobsRouter;

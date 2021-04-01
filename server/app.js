require('dotenv').config();
const express = require('express');
const cors = require('cors');

const morgan = require('morgan');

const jobsRouter = require('./controllers/jobs');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/jobs', jobsRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});

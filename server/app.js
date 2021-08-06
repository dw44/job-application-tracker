require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const morgan = require('morgan');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/jobs', require('./controllers/jobs'));

app.use('/api/v1/users', require('./models/users'));

app.use('/api/v1/login', require('./controllers/login'));

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});

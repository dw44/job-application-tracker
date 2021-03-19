require('dotenv').config();
const express = require('express');
const cors = require('cors');

const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});

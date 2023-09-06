const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { routes } = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());

// Central error handler
app.use((err, req, res, next) => {
  // Internal Errors by default
  const { type = 500, message } = err;
  res
    .status(type)
    .send({
      // send same status as error code
      message: type === 500
        ? 'Internal server error'
        : message,
    });
  next();
});

const server = app.listen(PORT);
module.exports = server;

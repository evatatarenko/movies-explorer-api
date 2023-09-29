require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const limiter = require('../../movies-explorer-api/middlewares/rateLimit');
const errorProcesser = require('../../movies-explorer-api/middlewares/errorProcessing');
const { requestLogger, errorLogger } = require('../../movies-explorer-api/middlewares/logger');
const { MONGO_URL_DEV } = require('../../movies-explorer-api/utils/constants');
const { routes } = require('../../movies-explorer-api/routes');
const cors = require('./middlewares/cors');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : MONGO_URL_DEV);
app.use(cors);
app.use(requestLogger);
if (NODE_ENV === 'production') {
  app.use(helmet());
  app.use(limiter);
}
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorProcesser);

const server = app.listen(PORT);
module.exports = server;

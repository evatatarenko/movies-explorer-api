const express = require('express');
const mongoose = require('mongoose');

const { routes } = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

// const User = require('./models/user');
// const Movie = require('./models/movie');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(routes);

const server = app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

module.exports = server;

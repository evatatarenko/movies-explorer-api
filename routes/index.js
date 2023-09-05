const express = require('express');

const {
  login,
  createUser,
} = require('../controllers/user');

const auth = require('../middlewares/auth');
const {
  signUpValidation,
  signInValidation,
} = require('../middlewares/validation');

const { userRoutes } = require('./user');
// const { moviesRoutes } = require('./movie');

const routes = express.Router();

// роуты, не требующие авторизации,
// например, регистрация и логин
routes.post('/signup', express.json(), signUpValidation, createUser);
routes.post('/signin', express.json(), signInValidation, login);

// авторизация
routes.use(auth);

routes.use('/users', userRoutes);

routes.use('/', (req, res, next) => {
  next(new Error('Страница по указанному маршруту не найдена'));
});

exports.routes = routes;


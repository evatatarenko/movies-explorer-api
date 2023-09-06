const express = require('express');
const {
  getUser,
  patchUserMe,
} = require('../controllers/user');

const { patchUserValidation } = require('../middlewares/validation');

const userRoutes = express.Router();

userRoutes.get('/me', getUser);
userRoutes.patch('/me', express.json(), patchUserValidation, patchUserMe);

exports.userRoutes = userRoutes;

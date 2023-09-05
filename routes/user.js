const express = require('express');
const {
  getUser,
} = require('../controllers/user');

const userRoutes = express.Router();


userRoutes.get('/me', getUser);

exports.userRoutes = userRoutes;
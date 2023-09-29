const express = require('express');

const {
  getMovies,
  deleteMovieById,
  createMovie,
} = require('../controllers/movie');

const {
  createMovieValidation,
  MovieIdValidation,
} = require('../middlewares/validation');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);

moviesRoutes.post('/', express.json(), createMovieValidation, createMovie);

moviesRoutes.delete('/:_id', express.json(), MovieIdValidation, deleteMovieById);

exports.moviesRoutes = moviesRoutes;

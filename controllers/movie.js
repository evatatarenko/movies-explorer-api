const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFound');
const BadRequestError = require('../errors/badRequest');
const ForbiddenError = require('../errors/forbidden');
const { HTTP_RES_CODES } = require('../utils/constants');

exports.getMovies = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movies = await Movie.find({ owner });
    res.status(HTTP_RES_CODES.success).send(movies);
  } catch (err) {
    next(err);
  }
};

exports.deleteMovieById = async (req, res, next) => {
  const ownerId = req.user._id;
  try {
    const userMovie = await Movie.findOne({ _id: req.params._id });
    if (!userMovie) {
      throw new NotFoundError('This film does not exist');
    }
    if (!userMovie.owner.equals(ownerId)) {
      throw new ForbiddenError('This film does not exist');
    }
    await Movie.deleteOne({ _id: userMovie._id });
    res.status(HTTP_RES_CODES.success).send(userMovie);
  } catch (err) {
    next(err);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const ownerId = req.user._id;
    const movieNew = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: ownerId,
    });
    res.status(HTTP_RES_CODES.created).send({ data: movieNew });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Invalid request'));
    } else {
      next(err);
    }
  }
};

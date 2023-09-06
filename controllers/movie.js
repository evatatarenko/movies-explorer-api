const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFound');
const ConflictError = require('../errors/conflict');
const BadRequestError = require('../errors/badRequest');

exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.status(200).send(movies);
  } catch (err) {
    next(err);
  }
};

exports.deleteMovieById = async (req, res, next) => {
  const ownerId = req.user._id;
  try {
    const userMovie = await Movie.findOne({ movieId: req.params.movieId });
    if (!userMovie.owner.equals(ownerId)) {
      throw new NotFoundError('This film does not exist');
    }
    await Movie.deleteOne({ _id: userMovie._id });
    res.status(200).send(userMovie);
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
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const ownerId = req.user._id;
    const findMovie = await Movie.findOne({ movieId });
    if (findMovie) {
      next(new ConflictError('Ivalid movieId'));
    }
    const movieNew = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: ownerId,
    });
    res.status(201).send({ data: movieNew });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Invalid request'));
    } else {
      next(err);
    }
  }
};

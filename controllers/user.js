const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFound');
const ConflictError = require('../errors/conflict');
const BadRequestError = require('../errors/badRequest');
const { SALT_PASSWORD_LEN, TOKEN_EXPIRES, HTTP_RES_CODES } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((findUser) => {
      if (findUser) {
        throw new ConflictError('User with the same email already exists');
      }
      return bcrypt.hash(password, SALT_PASSWORD_LEN);
    }).then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const resp = {
        _id: user._id,
        email: user.email,
        name: user.name,
      };
      res.status(HTTP_RES_CODES.created).send({ data: resp });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid token'));
      } else {
        next(err);
      }
    });
};

exports.patchUserMe = async (req, res, next) => {
  const options = { new: true, runValidators: true };
  const ownerId = req.user._id;

  try {
    const { name, email } = req.body;
    const findUser = await User.findOne({ email });
    const userSpec = await User.findById(ownerId);
    const emailCur = userSpec.email;
    if (findUser && emailCur !== email) {
      throw new ConflictError('User with the same email already exists');
    }
    const userPatchMe = await User.findByIdAndUpdate(ownerId, { name, email }, options);
    if (userPatchMe) {
      res.status(HTTP_RES_CODES.success).send({ data: userPatchMe });
    } else {
      throw new BadRequestError('Invalid request');
    }
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  const ownerId = req.user._id;
  try {
    const userSpec = await User.findById(ownerId);
    if (userSpec) {
      res.status(HTTP_RES_CODES.success).send({ data: userSpec });
    } else {
      throw new NotFoundError(`User ${ownerId} not founded`);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: TOKEN_EXPIRES },
      );
      res.send({ token });
    })
    .catch(next);
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFound');
const ConflictError = require('../errors/conflict');
const BadRequestError = require('../errors/badRequest');

const { NODE_ENV, JWT_SECRET } = process.env;

const saltPasswordLen = 10;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((findUser) => {
      if (findUser) {
        throw new ConflictError('Ivalid data');
      }
      return bcrypt.hash(password, saltPasswordLen);
    }).then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch(next);
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
      throw new ConflictError('Ivalid data');
    }
    const userPatchMe = await User.findByIdAndUpdate(ownerId, { name, email }, options);
    if (userPatchMe) {
      res.status(200).send({ data: userPatchMe });
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
      res.status(200).send({ data: userSpec });
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
      );
      res.send({ token });
    })
    .catch(next);
};

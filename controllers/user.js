const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) {
    res.status(409).send();
  } else {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name,
        email,
        password: hash,
      }))
      .then((user) => res.status(201).send({ data: user }))
      .catch((err) => res.status(500).send({ err }));
  }
};

exports.patchUserMe = async (req, res) => {
  const options = { new: true, runValidators: true };
  const ownerId = req.user._id;

  try {
    const { name, email } = req.body;
    const findUser = await User.findOne({ email });
    const userSpec = await User.findById(ownerId);
    const emailCur = userSpec.email;
    if (findUser && emailCur !== email) {
      res.status(409).send({ message: 'ivalid data' });
    } else {
      const userPatchMe = await User.findByIdAndUpdate(ownerId, { name, email }, options);
      if (userPatchMe) {
        res.status(200).send({ data: userPatchMe });
      } else {
        res.status(400).send({ message: 'invalid request' });
      }
    }
  } catch (err) {
    res.status(400).send({ message: `invalid request: ${err}` });
  }
};

exports.getUser = async (req, res) => {
  const ownerId = req.user._id;
  try {
    const userSpec = await User.findById(ownerId);
    if (userSpec) {
      res.status(200).send({ data: userSpec });
    } else {
      res
        .status(400)
        .send({ message: `User ${ownerId} not founded` });
    }
  } catch (err) {
    res
      .status(401)
      .send({ message: err.message });
  }
};

module.exports.login = (req, res) => {
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
    .catch((err) => {
      // ошибка аутентификации
      res
        .status(401)
        .send({ message: err.message });
    });
};

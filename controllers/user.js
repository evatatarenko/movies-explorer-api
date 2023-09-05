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

exports.getUser = async (req, res) => {
  const ownerId = req.user._id;
  try {
    const userSpec = await User.findById(ownerId);
    if (userSpec) {
      res.status(200).send({ data: userSpec });
    } else {
      throw new Error(`Пользователь по указанному ${ownerId} не найден`);
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

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name,
      email,
      password,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ err }));
};

exports.getUser = (req, res) => {
  const ownerId = req.user._id;
  try {
    const userSpec = User.findById(ownerId);
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
        'some-secret-key',
        { expiresIn: 3600 },
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

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { JWT } = require('../utils/config');
const NotFound = require('../errors/NotFound');
const NotValidData = require('../errors/NotValidData');
const NotAllData = require('../errors/NotAllData');

const createUser = (req, res, next) => {
  bcrypt.hash(String(req.body.password), 10)
    .then((hashedPassword) => {
      User.create({ ...req.body, password: hashedPassword })
        .then((user) => {
          res.status(201).send({
            _id: user._id,
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          });
        })
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new NotAllData('Пользователь не найден'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const token = jwt.sign({ _id: user.id }, JWT, { expiresIn: '7d' });
            res.cookie('jwt', token, {
              maxAge: 3600 * 24 * 7,
              httpOnly: true,
            });
            res.status(200).send(user);
          } else {
            next(new NotAllData('Неверный пароль'));
          }
        })
        .catch(next);
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'куки удалены' });
  res.end();
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    // .orFail(new NotFound('Данные не найдены'))
    .then((user) => {
      if (!user) {
        return next(new NotFound('Данные не найдены'));
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotAllData('Ошибка в данных'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotAllData('Ошибка в данных'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  createUser, getUsers, getUser, getMe, updateUser, updateUserAvatar, login, signout,
};

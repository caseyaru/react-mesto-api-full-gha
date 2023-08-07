require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT, DB } = require('./utils/config');

const app = express();

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const { createUser, login, signout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { errorHandler } = require('./middlewares/errors');
const NotFound = require('./errors/NotFound');

const regex = /^https?:\/\/.+\.[a-z]+/;

mongoose.connect(DB);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.disable('x-powered-by');

const corsOptions = {
  origin: ['localhost:3001', 'https://casey.nomoreparties.co'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri({ scheme: ['http', 'https'] }).pattern(regex),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  login,
);
app.get('/signout', signout);

app.use(auth);

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

app.use('*', (req, res, next) => {
  next(new NotFound('Маршрут не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер жив (порт ${PORT})`);
});

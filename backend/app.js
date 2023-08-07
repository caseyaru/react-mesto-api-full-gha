require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT, DB } = require('./utils/config');
const { celebrateSignUp, celebrateSignIn } = require('./middlewares/validation');

const app = express();

const router = require('./routes/index');
const { createUser, login, signout } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { errorHandler } = require('./middlewares/errors');
const NotFound = require('./errors/NotFound');

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

app.post('/signup', celebrateSignUp, createUser);
app.post('/signin', celebrateSignIn, login);
app.get('/signout', signout);

app.use(router);

app.use('*', (req, res, next) => {
  next(new NotFound('Маршрут не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер жив (порт ${PORT})`);
});

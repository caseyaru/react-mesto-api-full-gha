const NotFound = require('../errors/NotFound');
const NotValidData = require('../errors/NotValidData');
const NotAllData = require('../errors/NotAllData');
const NotAllowed = require('../errors/NotAllowed');
const UserError = require('../errors/UserError');

const errorHandler = (err, req, res, next) => {
  // let error;

  // if (err.statusCode === 404) {
  //   error = new NotFound(err);
  // } else if (err.statusCode === 400) {
  //   error = new NotValidData(err);
  // } else if (err.statusCode === 401) {
  //   error = new NotAllData(err);
  // } else if (err.statusCode === 403) {
  //   error = new NotAllowed(err);
  // } else if (err.code === 11000) {
  //   error = new UserError(err);
  // }

  // проверяем статус ошибки и записываем в сообщение
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Ошибка на сервере' : err.message;

  res.status(statusCode).send(message);

  next();
};

module.exports = { errorHandler };

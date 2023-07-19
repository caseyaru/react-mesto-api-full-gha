// eslint-disable-next-line import/no-extraneous-dependencies, eol-last
const winston = require('winston');
// eslint-disable-next-line import/no-extraneous-dependencies
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  // Сохраняет логи запросов в указанный файл (корень бэкенда)
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  // Сохраняет логи ошибок запросов в указанный файл (корень бэкенда)
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
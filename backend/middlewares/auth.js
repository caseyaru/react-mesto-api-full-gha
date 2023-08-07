const jwt = require('jsonwebtoken');

const NotAllData = require('../errors/NotAllData');
const { JWT } = require('../utils/config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT);
  } catch (err) {
    next(new NotAllData('Ошибка в токене'));
    return;
  }

  req.user = payload;

  next();
};

module.exports = auth;

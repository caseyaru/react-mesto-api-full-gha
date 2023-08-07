const { celebrate, Joi } = require('celebrate');

const regex = /^https?:\/\/.+\.[a-z]+/;

const celebrateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri({ scheme: ['http', 'https'] }).pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const celebrateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports = {
  celebrateSignUp, celebrateSignIn,
};

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

const celebrateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

const celebrateUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина имени - 2 символа',
      'string.max': 'Максимальная длина имени - 30 символов',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина информации о себе - 2 символа',
      'string.max': 'Максимальная длина информации о себе - 30 символов',
    }),
  }),
});

const celebrateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri({ scheme: ['http', 'https'] }).pattern(regex),
  }),
});

const celebrateCardData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина названия - 2 символа',
        'string.max': 'Максимальная длина названия - 30 символов',
      }),
    link: Joi.string().required().uri({ scheme: ['http', 'https'] }).messages({
      'string.uri': 'Некорректная ссылка на изображение',
    }),
  }),
});

const celebrateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  celebrateSignUp,
  celebrateSignIn,
  celebrateUserId,
  celebrateUserData,
  celebrateUserAvatar,
  celebrateCardData,
  celebrateCardId,
};

const router = require('express').Router();
const { errors } = require('celebrate');

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { celebrateCardData, celebrateCardId } = require('../middlewares/validation');

router.post('/', celebrateCardData, createCard);
router.get('/', getCards);
router.delete('/:cardId', celebrateCardId, deleteCard);
router.put('/:cardId/likes', celebrateCardId, likeCard);
router.delete('/:cardId/likes', celebrateCardId, dislikeCard);

router.use(errors());

module.exports = router;

const router = require('express').Router();

const auth = require('../middlewares/auth');
const users = require('./users');
const cards = require('./cards');

router.use('/users', auth, users);
router.use('/cards', auth, cards);

module.exports = router;

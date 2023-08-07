const router = require('express').Router();
const { errors } = require('celebrate');

const {
  getUsers, getUser, getMe, updateUser, updateUserAvatar,
} = require('../controllers/users');
const { celebrateUserId, celebrateUserData, celebrateUserAvatar } = require('../middlewares/validation');

router.get('/me', getMe);
router.get('/', getUsers);
router.get('/:userId', celebrateUserId, getUser);
router.patch('/me', celebrateUserData, updateUser);
router.patch('/me/avatar', celebrateUserAvatar, updateUserAvatar);

router.use(errors());

module.exports = router;

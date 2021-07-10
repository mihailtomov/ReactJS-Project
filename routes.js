const router = require('express').Router();

const authController = require('./controllers/authController');
const articlesController = require('./controllers/articlesController');
const usersController = require('./controllers/usersController');

router.use('/auth', authController);
router.use('/articles', articlesController);
router.use('/users', usersController);

module.exports = router;
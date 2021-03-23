const router = require('express').Router();

const authController = require('./controllers/authController');
const articlesController = require('./controllers/articlesController');

router.use('/auth', authController);
router.use('/articles', articlesController);

module.exports = router;
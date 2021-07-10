const router = require('express').Router();
const path = require('path');

const authController = require('./controllers/authController');
const articlesController = require('./controllers/articlesController');
const usersController = require('./controllers/usersController');

router.use('/auth', authController);
router.use('/articles', articlesController);
router.use('/users', usersController);
router.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

module.exports = router;
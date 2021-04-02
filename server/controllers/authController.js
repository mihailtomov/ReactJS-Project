const router = require('express').Router();

const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authorization');

router.post('/register', (req, res, next) => {
    authService.register(req.body)
        .then(createdUser => {
            res.status(201).json({ _id: createdUser._id });
        })
        .catch(next);
});

router.post('/login', (req, res, next) => {
    authService.login(req.body)
        .then(userInfo => {
            res.status(200).json(userInfo);
        })
        .catch(next);
});

router.get('/validate', isAuth, (req, res) => {
    res.status(200).json({ message: 'validated' });
});

module.exports = router;
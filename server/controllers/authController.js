const router = require('express').Router();

const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/server');

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

router.get('/validate/:token', (req, res) => {
    const { token } = req.params;

    try {
        jwt.verify(token, SECRET);

        res.status(200).json({ message: 'validated' });
    } catch (error) {
        res.status(401).json({ err: { message: 'You cannot perform this action!' } });
    }
});

module.exports = router;
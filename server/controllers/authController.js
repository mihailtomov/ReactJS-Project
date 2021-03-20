const router = require('express').Router();

const authService = require('../services/authService');

router.post('/register', (req, res) => {
    authService.register(req.body)
        .then(createdUser => {
            res.status(201).json({ _id: createdUser._id });
        })
        .catch(err => {
            const message = err.message || 'Something went wrong!';
            const statusCode = err.status || 500;

            res.status(statusCode).json({ message });
        });
});

router.post('/login', (req, res) => {
    authService.login(req.body)
        .then(userInfo => {
            res.status(200).json(userInfo);
        })
        .catch(err => {
            const message = err.message || 'Something went wrong!';
            const statusCode = err.status || 500;

            res.status(statusCode).json({ message });
        });
});

module.exports = router;
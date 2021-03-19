const router = require('express').Router();

const authService = require('../services/authService');

router.post('/register', (req, res) => {
    authService.register(req.body)
        .then(createdUser => {
            res.status(201).json({ _id: createdUser._id });
        })
        .catch(err => console.log(err));
});

module.exports = router;
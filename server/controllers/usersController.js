const router = require('express').Router();
const { isAuth } = require('../middlewares/authorization');
const usersService = require('../services/usersService');

router.get('/:username', isAuth, (req, res, next) => {
    const { username } = req.params;

    usersService.getUserInfo(username)
        .then(userInfo => {
            res.status(200).json(userInfo);
        })
        .catch(next);
});

module.exports = router;
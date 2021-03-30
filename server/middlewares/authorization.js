const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/server');

const auth = (req, res, next) => {
    const authorizationHeader = req.get('Authorization');

    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];

        try {
            const decodedToken = jwt.verify(token, SECRET);

            req.user = decodedToken;
        } catch (error) {
            return next();
        }
    }

    next();
}

const isAuth = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ message: 'You cannot perform this action!' });
        return;
    }

    next();
}

module.exports = {
    auth,
    isAuth,
}
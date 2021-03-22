const User = require('../models/User');
const { SALT_ROUNDS, SECRET } = require('../config/server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = ({ username, password }) => {
    // Check if data is valid
    return User.exists({ username })
        .then(userExists => {
            if (userExists) throw { message: 'User already exists!' }

            return bcrypt.hash(password, SALT_ROUNDS);
        })
        .then(hash => {
            const user = new User({ username, password: hash });

            return user.save();
        })
}

const login = ({ username, password }) => {
    return User.findOne({ username })
        .then(user => {
            console.log(user);
            if (!user) {
                throw { message: 'Invalid username or password!' };
            };

            return bcrypt.compare(password, user.password)
                .then(isValidPassword => {
                    if (!isValidPassword) throw { message: 'Invalid username or password!' };

                    const token = jwt.sign({ _id: user._id, username }, SECRET, { expiresIn: '1h' });

                    return {
                        _id: user._id,
                        username,
                        token,
                    }
                })
        })
}

module.exports = {
    register,
    login,
}
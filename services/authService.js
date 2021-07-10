const User = require('../models/User');
const { SALT_ROUNDS, SECRET } = require('../config/server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isEmpty } = require('../helpers/validators');

const register = async ({ username, password }) => {
    if (!isEmpty(username) && !isEmpty(password)) {
        const userExists = await User.exists({ username });

        if (userExists) {
            return Promise.reject({ message: 'User already exists!' });
        }

        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        const user = new User({ username, password: hash });

        return await user.save();
    } else {
        return Promise.reject({ message: 'Username and password cannot be empty!' });
    }
}

const login = async ({ username, password }) => {
    if (!isEmpty(username) && !isEmpty(password)) {
        const user = await User.findOne({ username });

        if (!user) {
            return Promise.reject({ message: 'Invalid username or password!' });
        };

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return Promise.reject({ message: 'Invalid username or password!' });
        }

        const token = jwt.sign({ _id: user._id, username }, SECRET, { expiresIn: '1h' });

        return {
            _id: user._id,
            username,
            token,
        }
    } else {
        return Promse.reject({ message: 'Username and password cannot be empty!' });
    }
}

module.exports = {
    register,
    login,
}
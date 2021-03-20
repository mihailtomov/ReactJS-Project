const User = require('../models/User');
const { SALT_ROUNDS } = require('../config/server');
const bcrypt = require('bcrypt');

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

module.exports = {
    register,
}
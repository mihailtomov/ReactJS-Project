const User = require('../models/User');

const register = ({ username, password }) => {
    // Check if username exists

    // Check if data is valid

    // Hash password and register user

    const user = new User({username, password});

    return user.save();
}

module.exports = {
    register,
}
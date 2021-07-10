const User = require('../models/User');

const getUserInfo = (username) => {
    return User.findOne({ username }, 'comments createdArticles').populate('createdArticles', 'title');
}

module.exports = {
    getUserInfo,
}
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    createdArticles: [{
        type: mongoose.Types.ObjectId,
        ref: 'Article'
    }],
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }],
});

module.exports = mongoose.model('User', userSchema);
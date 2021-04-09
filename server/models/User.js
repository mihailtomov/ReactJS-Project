const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }],
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: String,
    content: String,
    imageUrl: String,
    youtubeUrl: String,
    category: String,
    author: String,
    date: String,
    usersLiked: Array,
    likes: { type: Number, default: 0 },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }],
});

module.exports = mongoose.model('Article', articleSchema);
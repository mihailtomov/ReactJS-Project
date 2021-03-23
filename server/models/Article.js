const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: String,
    content: String,
    imageUrl: String,
    category: String,
    author: String,
    date: String,
});

module.exports = mongoose.model('Article', articleSchema);
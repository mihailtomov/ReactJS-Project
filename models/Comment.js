const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    name: String,
    comment: String,
    date: String,
    number: Number,
});

module.exports = mongoose.model('Comment', commentSchema);
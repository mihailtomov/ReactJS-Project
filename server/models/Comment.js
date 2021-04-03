const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    name: String,
    comment: String,
});

module.exports = mongoose.model('Comment', commentSchema);
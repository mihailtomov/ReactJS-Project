const Article = require('../models/Article');
const Comment = require('../models/Comment');
const User = require('../models/User');

const getFormattedDate = require('../helpers/getFormattedDate');

const create = (articleData) => {
    articleData.date = getFormattedDate();
    articleData.youtubeUrl ?
        articleData.youtubeUrl = `https://www.youtube.com/embed/${articleData.youtubeUrl.split('=')[1]}` :
        articleData.youtubeUrl = ''

    const article = new Article(articleData);

    return article.save();
}

const getAll = (category) => {
    if (category === 'all') {
        return Article.find();
    } else {
        return Article.find({ category });
    }
}

const getOne = (articleId) => {
    return Article.findOne({ _id: articleId }).populate('comments');
}

const addComment = ({ articleId, name, comment }) => {
    const newComment = new Comment({ name, comment, date: getFormattedDate({ year: '2-digit', month: 'short' }) });

    return Article.findOne({ _id: articleId })
        .then(article => {
            newComment.number = article.comments.length + 1;

            article.comments.push(newComment);

            return article.save();
        })
        .then(() => {
            return User.findOne({ username: name })
        })
        .then(user => {
            user.comments.push(newComment);

            return user.save();
        })
        .then(() => {
            return newComment.save();
        });
}

module.exports = {
    create,
    getAll,
    getOne,
    addComment,
}
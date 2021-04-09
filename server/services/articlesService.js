const Article = require('../models/Article');
const Comment = require('../models/Comment');

const create = (articleData) => {
    const options = { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' };

    articleData.date = new Date().toLocaleDateString('en-GB', options);
    articleData.youtubeUrl = `https://www.youtube.com/embed/${articleData.youtubeUrl.split('=')[1]}`;

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

const addComment = ({articleId, name, comment}) => {
    const newComment = new Comment({name, comment});

    return Article.findOne({_id: articleId})
        .then(article => {
            article.comments.push(newComment);

            return article.save();
        })
        .then(() => {
            return newComment.save();
        })
}

module.exports = {
    create,
    getAll,
    getOne,
    addComment,
}
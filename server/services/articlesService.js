const Article = require('../models/Article');

const create = (articleData) => {
    const options = { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' };

    articleData.date = new Date().toLocaleDateString('en-GB', options);

    const article = new Article(articleData);

    return article.save();
}

const getAll = () => {
    return Article.find();
}

const getOne = (articleId) => {
    return Article.findOne({ _id: articleId });
}

module.exports = {
    create,
    getAll,
    getOne,
}
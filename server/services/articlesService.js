const Article = require('../models/Article');

const create = (articleData) => {
    const options = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };

    articleData.date = new Date().toLocaleDateString('en-GB', options);

    const article = new Article(articleData);

    return article.save();
}

const getAll = () => {
    return Article.find();
}

module.exports = {
    create,
    getAll,
}
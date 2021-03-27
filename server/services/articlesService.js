const Article = require('../models/Article');

const create = (articleData) => {
    const options = { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' };

    articleData.date = new Date().toLocaleDateString('en-GB', options);

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
    return Article.findOne({ _id: articleId });
}

module.exports = {
    create,
    getAll,
    getOne,
}
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const User = require('../models/User');

const getFormattedDate = require('../helpers/getFormattedDate');
const embedYoutubeUrl = require('../helpers/embedYoutubeUrl');
const { isEmpty, isValidProtocol } = require('../helpers/validators');

const create = (articleData) => {
    const { title, content, category, imageUrl, author } = articleData;

    if (!isEmpty(title) && !isEmpty(content) && !isEmpty(category) && !isEmpty(author)) {
        articleData.date = getFormattedDate();

        if (articleData.youtubeUrl && isValidProtocol(articleData.youtubeUrl)) {
            articleData.youtubeUrl = embedYoutubeUrl(articleData.youtubeUrl);
        } else if (articleData.youtubeUrl && !isValidProtocol(articleData.youtubeUrl)) {
            throw { message: 'Invalid Youtube URL!' };
        }

        if (imageUrl && !isValidProtocol(imageUrl)) {
            throw { message: 'Invalid image URL!' };
        }

        const article = new Article(articleData);

        return User.findOne({ username: articleData.author })
            .then(user => {
                user.createdArticles.push(article);

                return user.save();
            })
            .then(() => {
                return article.save();
            });
    } else {
        throw { message: 'There is an empty field or the image URL is invalid!' };
    }
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

const update = (articleId, updatedArticleData) => {
    const { title, content, category, imageUrl } = updatedArticleData;

    if (!isEmpty(title) && !isEmpty(content) && !isEmpty(category) && isValidProtocol(imageUrl)) {

        if (updatedArticleData.youtubeUrl) {

            if (isValidProtocol(updatedArticleData.youtubeUrl)) {
                updatedArticleData.youtubeUrl = embedYoutubeUrl(updatedArticleData.youtubeUrl);
            } else {
                throw { message: 'Invalid Youtube URL!' };
            }
        }

        return Article.findOneAndUpdate({ _id: articleId }, updatedArticleData, { new: true });
    } else {
        throw { message: 'There is an empty field or the image URL is invalid!' };
    }
}

const remove = (articleId) => {
    return Article.findOneAndDelete({ _id: articleId });
}

module.exports = {
    create,
    getAll,
    getOne,
    addComment,
    update,
    remove,
}
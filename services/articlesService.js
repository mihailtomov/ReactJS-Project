const Article = require('../models/Article');
const Comment = require('../models/Comment');
const User = require('../models/User');

const getFormattedDate = require('../helpers/getFormattedDate');
const embedYoutubeUrl = require('../helpers/embedYoutubeUrl');
const { isEmpty, isValidProtocol } = require('../helpers/validators');

const create = async (articleData) => {
    const { title, content, category, youtubeUrl, author } = articleData;

    if (!isEmpty(title) && !isEmpty(content) && !isEmpty(category)) {
        if (youtubeUrl && isValidProtocol(youtubeUrl)) {
            const embeddedUrl = embedYoutubeUrl(youtubeUrl);

            if (embeddedUrl === 'Invalid') {
                return Promise.reject({ message: 'Invalid Youtube URL!' });
            } else {
                articleData.youtubeUrl = embeddedUrl;
            }
        } else if (youtubeUrl && !isValidProtocol(youtubeUrl)) {
            return Promise.reject({ message: 'Invalid Youtube URL!' });
        }

        const article = new Article(articleData);

        const user = await User.findOne({ username: author });
        user.createdArticles.push(article);

        await user.save();
        return await article.save();
    } else {
        return Promise.reject({ message: 'There is an empty field' });
    }
}

const getAll = (category) => {
    if (category === 'home') {
        return Article.find().sort({ date: -1 }).limit(3);
    } else {
        return Article.find({ category }).sort({ date: -1 });
    }
}

const getOne = (articleId) => {
    return Article.findOne({ _id: articleId }).populate('comments');
}

const addComment = async ({ articleId, name, comment }) => {
    const newComment = new Comment({ name, comment, date: getFormattedDate({ year: '2-digit', month: 'short' }) });
    const article = await Article.findOne({ _id: articleId });

    newComment.number = article.comments.length + 1;
    article.comments.push(newComment);

    await article.save();

    const user = await User.findOne({ username: name });

    user.comments.push(newComment);
    await user.save();

    return await newComment.save();
}

const update = (articleId, updatedArticleData) => {
    const { youtubeUrl } = updatedArticleData;

    if (youtubeUrl) {

        if (isValidProtocol(youtubeUrl)) {
            const embeddedUrl = embedYoutubeUrl(youtubeUrl);

            if (embeddedUrl === 'Invalid') {
                return Promise.reject({ message: 'Invalid Youtube URL!' });
            } else {
                updatedArticleData.youtubeUrl = embeddedUrl;
            }
        } else {
            return Promise.reject({ message: 'Invalid Youtube URL!' });
        }
    }

    return Article.findOneAndUpdate({ _id: articleId }, updatedArticleData, { new: true });
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
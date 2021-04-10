const router = require('express').Router();
const articlesService = require('../services/articlesService');
const { isAuth } = require('../middlewares/authorization');
const { update } = require('../models/Article');

router.post('/', isAuth, (req, res, next) => {
    articlesService.create(req.body)
        .then(createdArticle => {
            res.status(201).json({ _id: createdArticle._id });
        })
        .catch(next);
});

router.post('/comments', isAuth, (req, res, next) => {
    articlesService.addComment(req.body)
        .then(createdComment => {
            res.status(201).json({ _id: createdComment._id })
        })
        .catch(next);
});

router.get('/category/:category', (req, res, next) => {
    const { category } = req.params;

    articlesService.getAll(category)
        .then(articles => {
            res.status(200).json({ articles });
        })
        .catch(next);
});

router.get('/:articleId', (req, res, next) => {
    const { articleId } = req.params;

    articlesService.getOne(articleId)
        .then(article => {
            res.status(200).json(article);
        })
        .catch(next);
});

router.patch('/:articleId/edit', isAuth, (req, res, next) => {
    const { articleId } = req.params;

    articlesService.update(articleId, req.body)
        .then(updatedArticle => {
            res.status(201).json({ _id: updatedArticle._id });
        })
        .catch(next);
});

module.exports = router;
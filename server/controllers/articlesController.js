const router = require('express').Router();
const articlesService = require('../services/articlesService');

router.get('/:category', (req, res) => {
    const { category } = req.params;

    articlesService.getAll(category)
        .then(articles => {
            res.status(200).json({ articles });
        })
});

router.post('/', (req, res) => {
    articlesService.create(req.body)
        .then(createdArticle => {
            res.status(201).json({ _id: createdArticle._id });
        })
        .catch(err => console.log(err));
});

router.get('/:articleId', (req, res) => {
    const { articleId } = req.params;

    console.log(articleId);

    articlesService.getOne(articleId)
        .then(article => {
            res.status(200).json(article);
        })
        .catch(err => console.log(err));
});

module.exports = router;
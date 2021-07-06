const router = require('express').Router();
const articlesService = require('../services/articlesService');
const { isAuth } = require('../middlewares/authorization');
const multer = require('multer');
const { unlinkSync } = require('fs');

const baseImageUrl = 'http://localhost:5000/images/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().split('T')[0] + '-' + file.originalname);
    }
})

const upload = multer({ storage }).single('image');

router.post('/', isAuth, (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return next(err);
        }

        let imageUrl = '';

        if (req.file) {
            imageUrl = `${baseImageUrl}${req.file.filename}`;
        }

        const data = { ...req.body, imageUrl };
        delete data.image;

        articlesService.create(data)
            .then(createdArticle => {
                res.status(201).json({ _id: createdArticle._id });
            })
            .catch(next);
    });
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

    upload(req, res, function (err) {
        if (err) {
            return next(err);
        }

        const oldImagePath = req.body.imageUrl.slice(22);

        if (req.file) {
            req.body.imageUrl = `${baseImageUrl}${req.file.filename}`;
        }

        const newImagePath = req.body.imageUrl.slice(22);

        
        if (newImagePath !== oldImagePath && oldImagePath !== '') {
            try {
                unlinkSync(`./public/${oldImagePath}`);
            } catch (err) {
                return next(err);
            }
        }

        const data = { ...req.body };
        delete data.image;

        articlesService.update(articleId, data)
            .then(updatedArticle => {
                res.status(200).json({ _id: updatedArticle._id });
            })
            .catch(next);
    })
});

router.delete('/:articleId/delete', isAuth, (req, res, next) => {
    const { articleId } = req.params;

    articlesService.remove(articleId)
        .then(deletedArticle => {
            try {
                unlinkSync(`./public/${deletedArticle.imageUrl.slice(22)}`);
            } catch (err) {
                return next(err);
            }

            res.status(200).json({ _id: deletedArticle._id });
        })
        .catch(next);
});

module.exports = router;
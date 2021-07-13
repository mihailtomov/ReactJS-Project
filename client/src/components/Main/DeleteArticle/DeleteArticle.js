import './DeleteArticle.css';

import { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { buildFirebaseStoragePath } from '../../../utils/config';
import { deleteImageFromFirebase } from '../../../utils/firebase';

import ErrorMessage from '../ErrorMessage/ErrorMessage.js';

import AuthContext from '../../../AuthContext';
import articleService from '../../../services/articleService';
import errorHandler from '../../../utils/errorHandler';

const DeleteArticle = ({
    match
}) => {
    const { loggedInStateHandler } = useContext(AuthContext);
    const { articleId } = match.params;

    const [isArticleDeleted, setIsArticleDeleted] = useState(false);
    const [onSubmitError, setOnSubmitError] = useState({ message: '' });

    useEffect(() => {
        loggedInStateHandler();
    }, []);

    const onDeleteClickHandler = async () => {
        const article = await articleService.getOne(articleId);
        const { imageUrl } = article;

        if (imageUrl) {
            const filePath = buildFirebaseStoragePath(imageUrl);

            deleteImageFromFirebase(filePath);
        }

        articleService.remove(articleId)
            .then(res => {
                if (res.err) throw res.err;

                setIsArticleDeleted(true);
            })
            .catch(err => errorHandler(setOnSubmitError, err));
    }

    if (isArticleDeleted) {
        return <Redirect to={{
            pathname: '/categories/home',
            message: {
                state: true,
                type: 'article deleted'
            }
        }} />
    }

    return (
        <section className="article-delete">
            {onSubmitError.message.length > 0 && <ErrorMessage message={onSubmitError.message} />}

            <h3>Are you sure you want to delete your article?</h3>
            <Link to={`/article/details/${articleId}`}>Back</Link>
            <a onClick={onDeleteClickHandler}>Delete</a>
        </section>

    );
}

export default DeleteArticle;
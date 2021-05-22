import './DeleteArticle.css';

import { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import AuthContext from '../../../AuthContext.js';
import articleService from '../../../services/articleService.js';

const DeleteArticle = ({
    match
}) => {
    const { loggedInStateHandler } = useContext(AuthContext);
    const { articleId } = match.params;

    const [isArticleDeleted, setIsArticleDeleted] = useState(false);

    useEffect(() => {
        loggedInStateHandler();
    }, []);

    const onDeleteClickHandler = () => {
        articleService.remove(articleId)
            .then(res => {
                if (res.err) throw res.err;

                setIsArticleDeleted(true);
            })
            .catch(err => console.log(err));
    }

    if (isArticleDeleted) {
        return <Redirect to={{
            pathname: '/categories/home',
            state: {
                isArticleDeleted,
                type: 'article deleted'
            }
        }} />
    }

    return (
        <section className="article-delete">
            <h3>Are you sure you want to delete your article?</h3>
            <Link to={`/article/details/${articleId}`}>Back</Link>
            <a onClick={onDeleteClickHandler}>Delete</a>
        </section>

    );
}

export default DeleteArticle;
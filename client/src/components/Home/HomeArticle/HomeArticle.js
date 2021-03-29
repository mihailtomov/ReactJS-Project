import { Link } from 'react-router-dom';

import './HomeArticle.css';

const HomeArticle = ({
    title,
    content,
    author,
    _id,
}) => {
    return (
        <article className="home-article">
            <h3>{title}</h3>
            <p className="description">
                {content.slice(0, 150)}&hellip;
                <Link className="read-more" to={`/article/details/${_id}`}>read more</Link>
            </p>
            <div>
                <span className="author-name">Published by <strong>{author}</strong></span>
            </div>
        </article>
    );
}

export default HomeArticle;
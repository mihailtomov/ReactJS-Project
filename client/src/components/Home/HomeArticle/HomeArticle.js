import './HomeArticle.css';

import { Link } from 'react-router-dom';

const HomeArticle = ({
    title,
    content,
    _id,
}) => {
    return (
        <article className="home-article">
            <h3>{title}</h3>
            <p className="description">
                {content.slice(0, 150)}&hellip;
                <Link className="read-more" to={`/article/details/${_id}`}>read more</Link>
            </p>
        </article>
    );
}

export default HomeArticle;
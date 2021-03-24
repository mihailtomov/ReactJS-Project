import { Link } from 'react-router-dom';

const HomeArticle = ({
    title,
    content,
    author,
    date,
    _id,
}) => {
    return (
        <article>
            <h3>{title}</h3>
            <p className="description">
                {content.slice(0, 100)}&hellip;
                <Link className="read-more" to={`article/details/${_id}`}>read more</Link>
            </p>
            <div>
                <span className="author-name">Published by <strong>{author}</strong></span>
                <p>
                    <time dateTime={date}>{date}</time>
                </p>
            </div>
        </article>
    );
}

export default HomeArticle;
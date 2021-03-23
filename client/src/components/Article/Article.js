import { Link } from 'react-router-dom';

const Article = ({
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
                {content}&hellip;
            </p>
            <div>
                <Link className="read-more" to={`article/details/${_id}`}>Read more</Link>
            </div>
            <div>
                <small>Author: </small>
                <span className="author-name">{author}</span>
                <p>
                    <time dateTime={date}>{date}</time>
                </p>
            </div>
        </article>
    );
}

export default Article;
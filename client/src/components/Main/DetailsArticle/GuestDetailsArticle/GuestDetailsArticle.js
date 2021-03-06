import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../../../AuthContext';

const GuestDetailsArticle = ({
    _id,
    title,
    imageUrl,
    youtubeUrl,
    content,
    author,
    date,
    hasLiked,
    likes,
    onLikeArticleHandler
}) => {
    const { username: currentUser } = useContext(AuthContext);

    let height;

    if ((imageUrl || youtubeUrl) && (window.innerWidth > 961)) {
        height = '300px';
    } else if ((imageUrl || youtubeUrl) && (window.innerWidth > 767)) {
        height = '180px';
    } else {
        height = null;
    }

    return (
        <article>
            <h3>{title}</h3>
            {
                currentUser === author && <div className="user-control">
                    <Link className="user-btn" to={`/article/edit/${_id}`}>&#91;Edit&#93;</Link>
                    <Link className="user-btn" to={`/article/delete/${_id}`}>&#91;Delete&#93;</Link>
                </div>
            }
            <div className="visual-section" style={{ height }}>
                {imageUrl && <img src={imageUrl} alt="" />}
                {youtubeUrl && <iframe width="500" height="281" src={youtubeUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
            </div>
            <p className="description">{content}</p>
            <div className="article-info">
                <span className="author-name">Published by <strong>{author}</strong></span>
                {!currentUser && <span className="cannot-like-article">{likes} <span>&#10084;</span></span>}
                {
                    hasLiked ?
                        currentUser && <span className="cannot-like-article">{likes} <span>&#10084;</span></span> :
                        currentUser && <span className="can-like-article">Click on the heart!<span onClick={onLikeArticleHandler}>&#10084;</span>We have {likes} hearts!</span>
                }
                <p>
                    <time dateTime={date}>{date}</time>
                </p>
            </div>
        </article>
    );
}

export default GuestDetailsArticle;
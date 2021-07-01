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
    const height = imageUrl || youtubeUrl ? '300px' : '0px';

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
            {content.split('\n\n').map((paragraph, i) => <p key={i} className="description">{paragraph}</p>)}
            <div className="article-info">
                <span className="author-name">Published by <strong>{author}</strong></span>
                {
                    hasLiked ?
                        currentUser && <span className="cannot-like-article">{likes} <span>&#10084;</span></span> :
                        currentUser && <span className="can-like-article">Like this article<span onClick={onLikeArticleHandler}>&#10084;</span>We have {likes} likes!</span>
                }
                <p>
                    <time dateTime={date}>{date}</time>
                </p>
            </div>
        </article>
    );
}

export default GuestDetailsArticle;
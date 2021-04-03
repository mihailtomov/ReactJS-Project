import './DetailsArticle.css';

import { useState, useEffect } from 'react';

import articleService from '../../services/articleService';
import Comment from '../DetailsArticle/Comment/Comment.js';

const DetailsArticle = (
    {
        match,
        loggedInStateHandler
    }
) => {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [_id, set_id] = useState('');
    const [comments, setComments] = useState([]);
    const [commentPosted, setCommentPosted] = useState('');

    useEffect(() => {
        if (localStorage['auth']) loggedInStateHandler();
    }, []);

    useEffect(() => {
        const { articleId } = match.params;

        articleService.getOne(articleId)
            .then(res => {
                if (res.err) throw res.err;

                const { _id, title, imageUrl, content, author, date, comments } = res;

                setTitle(title);
                setContent(content);
                setImageUrl(imageUrl);
                setAuthor(author);
                setDate(date);
                set_id(_id);
                setComments(comments);
            })
            .catch(err => console.log(err))
    }, [commentPosted]);


    const onCommentSubmitHandler = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const comment = e.target.comment.value;

        articleService.postComment({ articleId: _id, name, comment })
            .then(res => {
                if (res.err) throw res.err;

                setCommentPosted(res._id);
            })
            .catch(err => console.log(err));
    }

    return (
        <section className="details-article">

            <article>
                <h3>{title}</h3>
                <img src={imageUrl} alt="" />
                <p className="description">
                    {content}
                </p>
                <div>
                    <span className="author-name">Published by <strong>{author}</strong></span>
                    <p>
                        <time dateTime={date}>{date}</time>
                    </p>
                </div>
            </article>
            
            <h4>Comments</h4>
            <div>
                {comments.map(c => <Comment key={c._id} name={c.name} comment={c.comment} />)}
            </div>

            <form onSubmit={onCommentSubmitHandler}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" />
                <label htmlFor="comment">Comment: </label>
                <textarea name="comment" id="comment" cols="30" rows="8"></textarea>
                <input type="submit" value="Add comment" />
            </form>

        </section>
    );
}

export default DetailsArticle;
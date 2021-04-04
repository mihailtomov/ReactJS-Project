import './DetailsArticle.css';

import { useState, useEffect } from 'react';

import articleService from '../../services/articleService';
import GuestDetailsArticle from './GuestDetailsArticle/GuestDetailsArticle.js';
import AuthDetailsArticle from './AuthDetailsArticle/AuthDetailsArticle.js';

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

        const name = localStorage['user'];
        const comment = e.target.comment.value;

        articleService.postComment({ articleId: _id, name, comment })
            .then(res => {
                if (res.err) throw res.err;

                setCommentPosted(res._id);
            })
            .catch(err => console.log(err));
    }

    if (!localStorage['auth']) {
        return (
            <section className="details-article">
                <GuestDetailsArticle
                    title={title}
                    imageUrl={imageUrl}
                    content={content}
                    author={author}
                    date={date}
                />
            </section>
        );
    }

    return (
        <section className="details-article">
            <AuthDetailsArticle
                title={title}
                imageUrl={imageUrl}
                content={content}
                author={author}
                date={date}
                comments={comments}
                onCommentSubmitHandler={onCommentSubmitHandler}
            />
        </section>
    );
}

export default DetailsArticle;
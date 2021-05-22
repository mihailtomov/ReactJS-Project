import './DetailsArticle.css';

import { useContext, useState, useEffect } from 'react';

import articleService from '../../../services/articleService';
import timeoutMessage from '../../../utils/timeoutMessage';
import GuestDetailsArticle from './GuestDetailsArticle/GuestDetailsArticle.js';
import AuthDetailsArticle from './AuthDetailsArticle/AuthDetailsArticle.js';
import SuccessMessage from '../SuccessMessage/SuccessMessage.js';

import AuthContext from '../../../AuthContext';

const DetailsArticle = ({
    match,
    location,
}) => {
    const { loggedIn, loggedInStateHandler } = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [_id, set_id] = useState('');
    const [comments, setComments] = useState([]);
    const [commentPosted, setCommentPosted] = useState('');
    const [onSucessMessage, setOnSuccessMessage] = useState({
        state: location.state ? location.state.isArticleUpdated : false
    });

    useEffect(() => {
        if (localStorage['auth']) loggedInStateHandler();

        const timer = timeoutMessage(setOnSuccessMessage, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const { articleId } = match.params;

        articleService.getOne(articleId)
            .then(res => {
                if (res.err) throw res.err;

                const { _id, title, content, imageUrl, youtubeUrl, author, date, comments } = res;

                setTitle(title);
                setContent(content);
                setImageUrl(imageUrl);
                setYoutubeUrl(youtubeUrl);
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
                e.target.comment.value = '';
            })
            .catch(err => console.log(err));
    }

    if (!loggedIn) {
        return (
            <section className="details-article">
                <GuestDetailsArticle
                    title={title}
                    content={content}
                    imageUrl={imageUrl}
                    youtubeUrl={youtubeUrl}
                    author={author}
                    date={date}
                />
            </section>
        );
    }

    return (
        <section className="details-article">
            {onSucessMessage.state ? <SuccessMessage message="Article updated!" /> : null}

            <AuthDetailsArticle
                _id={_id}
                title={title}
                content={content}
                imageUrl={imageUrl}
                youtubeUrl={youtubeUrl}
                author={author}
                date={date}
                comments={comments}
                onCommentSubmitHandler={onCommentSubmitHandler}
            />

        </section>
    );
}

export default DetailsArticle;
import './DetailsArticle.css';

import { useContext, useState, useEffect } from 'react';

import GuestDetailsArticle from './GuestDetailsArticle/GuestDetailsArticle.js';
import AuthDetailsArticle from './AuthDetailsArticle/AuthDetailsArticle.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.js';
import SuccessMessage from '../SuccessMessage/SuccessMessage.js';

import AuthContext from '../../../AuthContext';
import articleService from '../../../services/articleService';
import errorHandler from '../../../utils/errorHandler';
import timeoutMessage from '../../../utils/timeoutMessage';


const DetailsArticle = ({
    match,
    location,
}) => {
    const { loggedIn, username, loggedInStateHandler } = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [usersLiked, setUsersLiked] = useState([]);
    const [likes, setLikes] = useState(0);
    const [_id, set_id] = useState('');
    const [comments, setComments] = useState([]);
    const [commentPosted, setCommentPosted] = useState('');
    const [onSubmitError, setOnSubmitError] = useState({ message: '' });
    const [onSucessMessage, setOnSuccessMessage] = useState({
        state: location.message ? location.message.state : false,
        type: location.message ? location.message.type : ''
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

                const { _id, title, content, imageUrl, youtubeUrl, author, date, usersLiked, likes, comments } = res;

                setTitle(title);
                setContent(content);
                setImageUrl(imageUrl);
                setYoutubeUrl(youtubeUrl);
                setAuthor(author);
                setDate(date);
                setUsersLiked(usersLiked);
                setLikes(likes);
                set_id(_id);
                setComments(comments);
            })
            .catch(err => errorHandler(setOnSubmitError, err))
    }, [commentPosted, likes]);

    const onCommentSubmitHandler = (e) => {
        e.preventDefault();

        const name = username;
        const comment = e.target.comment.value;

        articleService.postComment({ articleId: _id, name, comment })
            .then(res => {
                if (res.err) throw res.err;

                setCommentPosted(res._id);
                e.target.comment.value = '';
            })
            .catch(err => errorHandler(setOnSubmitError, err));
    }

    const hasLiked = usersLiked.includes(username) ? true : false;

    const onLikeArticleHandler = () => {
        if (!hasLiked) {
            usersLiked.push(username);

            articleService.update(_id, { likes: likes + 1, usersLiked })
                .then(res => {
                    if (res.err) throw res.err;

                    setLikes(oldLikes => oldLikes + 1);
                })
                .catch(err => errorHandler(setOnSubmitError, err));
        }
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
            {onSubmitError.message.length > 0 && <ErrorMessage message={onSubmitError.message} />}

            {onSucessMessage.state && <SuccessMessage message="Article updated!" />}

            <AuthDetailsArticle
                _id={_id}
                title={title}
                content={content}
                imageUrl={imageUrl}
                youtubeUrl={youtubeUrl}
                author={author}
                date={date}
                hasLiked={hasLiked}
                likes={likes}
                comments={comments}
                onCommentSubmitHandler={onCommentSubmitHandler}
                onLikeArticleHandler={onLikeArticleHandler}
            />

        </section>
    );
}

export default DetailsArticle;
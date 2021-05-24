import './Profile.css';

import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ErrorMessage from '../ErrorMessage/ErrorMessage.js';

import AuthContext from '../../../AuthContext.js';
import userService from '../../../services/userService.js';
import errorHandler from '../../../utils/errorHandler';


const Profile = () => {
    const { loggedInStateHandler } = useContext(AuthContext);

    const [userComments, setUserComments] = useState(0);
    const [userArticles, setUserArticles] = useState([]);
    const [onSubmitError, setOnSubmitError] = useState({ message: '' });

    useEffect(() => {
        if (localStorage['auth']) loggedInStateHandler();

        const username = localStorage['user'];

        userService.getUserInfo(username)
            .then(res => {
                if (res.err) throw res.err;

                const { comments, createdArticles } = res;

                setUserComments(comments.length);
                setUserArticles(createdArticles);
            })
            .catch(err => errorHandler(setOnSubmitError, err));
    }, []);

    return (
        <section className="user-profile">
            {onSubmitError.message.length > 0 && <ErrorMessage message={onSubmitError.message} />}

            <i className="material-icons">account_circle</i>
            <h4>My articles</h4>
            <ul>
                {
                    userArticles.map(a => <li key={a._id}><Link to={`/article/details/${a._id}`}>{a.title}</Link></li>)
                }
            </ul>
            <h4>Comments count</h4>
            <span>{userComments}</span>
        </section>
    );
}

export default Profile;
import './Profile.css';

import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../../AuthContext.js';
import userService from '../../../services/userService.js';

const Profile = () => {
    const { loggedInStateHandler } = useContext(AuthContext);

    const [userComments, setUserComments] = useState(0);
    const [userArticles, setUserArticles] = useState([]);

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
            .catch(err => console.log(err));
    }, []);

    return (
        <section className="user-profile">
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
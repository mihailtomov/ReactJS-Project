import './Profile.css';

import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../../AuthContext.js';

const Profile = () => {
    const { loggedInStateHandler } = useContext(AuthContext);

    useEffect(() => {
        if (localStorage['auth']) loggedInStateHandler();

        
    }, []);

    return (
        <section className="user-profile">
            <i className="material-icons">account_circle</i>
            <h4>My articles</h4>
            <ul>
                <li><Link>Article 1</Link></li>
                <li><Link>Article 2</Link></li>
                <li><Link>Article 3</Link></li>
                <li><Link>Article 4</Link></li>
            </ul>
            <h4>Comments count</h4>
            <span>152</span>
        </section>
    );
}

export default Profile;
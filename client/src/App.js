import './App.css';

import { useState, useEffect } from 'react';

import AsideMenu from './components/AsideMenu/AsideMenu.js';
import Header from './components/Header/Header.js';
import Main from './components/Main/Main.js';
import Footer from './components/Footer/Footer.js';

import authService from './services/authService';
import AuthContext from './AuthContext';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        loggedInStateHandler();
    }, [])

    const loggedInStateHandler = () => {
        const token = localStorage['auth'];

        if (token) {
            authService.validateToken(token)
                .then(res => {
                    if (!res.err) {
                        setLoggedIn(true);
                        setUsername(localStorage['user']);
                    } else {
                        localStorage.clear();
                        loggedOutStateHandler();
                    }
                })
        }
    }

    const loggedOutStateHandler = () => {
        setLoggedIn(false);
        setUsername('');
    }

    const context = {
        loggedIn,
        username,
        loggedInStateHandler,
        loggedOutStateHandler,
    }

    return (
        <div className="site-wrapper">

            <AsideMenu />

            <div className="container">
                <Header loggedIn={loggedIn} username={username} />

                <AuthContext.Provider value={context}>
                    <Main />
                </AuthContext.Provider>

                <Footer />
            </div>

        </div>
    );
}

export default App;
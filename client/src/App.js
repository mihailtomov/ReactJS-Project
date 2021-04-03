import './App.css';

import { Component } from 'react';

import AsideMenu from './components/AsideMenu/AsideMenu.js';
import Header from './components/Header/Header.js';
import Main from './components/Main/Main.js';
import Footer from './components/Footer/Footer.js';

import authService from './services/authService';

class App extends Component {
    constructor() {
        super();

        this.state = {
            loggedIn: false,
            username: '',
        }
    }

    loggedInStateHandler = () => {
        const token = localStorage['auth'];

        authService.validateToken(token)
            .then(res => {
                if (!res.err) {
                    this.setState({ loggedIn: true, username: localStorage['user'] });
                } else {
                    localStorage.clear();

                    this.setState({ loggedIn: false, username: '' });
                }
            })
    }

    loggedOutStateHandler = () => {
        this.setState({ loggedIn: false });
    }

    render() {
        return (
            <div className="site-wrapper">

                <AsideMenu />

                <div className="container">
                    <Header loggedIn={this.state.loggedIn} username={this.state.username} />

                    <Main
                        loggedInStateHandler={this.loggedInStateHandler}
                        loggedOutStateHandler={this.loggedOutStateHandler}
                    />

                    <Footer />
                </div>

            </div>
        );
    }
}

export default App;
import './App.css';

import { Component } from 'react';

import AsideMenu from './components/AsideMenu/AsideMenu.js';
import Header from './components/Header/Header.js';
import Main from './components/Main/Main.js';
import Footer from './components/Footer/Footer.js';

class App extends Component {
    constructor() {
        super();

        this.state = {
            loggedIn: false
        }
    }

    checkLoggedIn = () => {
        this.setState({ loggedIn: true });
    }

    checkLoggedOut = () => {
        this.setState({ loggedIn: false });
    }

    render() {
        return (
            <div className="site-wrapper">

                <AsideMenu />

                <div className="container">
                    <Header loggedIn={this.state.loggedIn} />

                    <Main checkLoggedIn={this.checkLoggedIn} checkLoggedOut={this.checkLoggedOut} />

                    <Footer />
                </div>

            </div>
        );
    }
}

export default App;
import './Main.css';

import {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../Home/Home.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import NotFound from '../NotFound/NotFound.js';
import Logout from '../Logout/Logout.js';
import ArticleCreate from '../ArticleCreate/ArticleCreate.js';

class Main extends Component {
    render() {
        return (
            <main className="main-wrapper">
                <Switch>
                    <Route path="/" exact>
                        <Home checkLoggedIn={this.props.checkLoggedIn} />
                    </Route>
                    <Route path="/article/create" exact>
                        <ArticleCreate checkLoggedIn={this.props.checkLoggedIn} />
                    </Route>
                    <Route path="/register" component={Register} exact />
                    <Route path="/login" component={Login} exact />
                    <Route path="/logout" exact>
                        <Logout checkLoggedOut={this.props.checkLoggedOut} />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </main>
        )

    }
}

export default Main;
import './Main.css';

import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../Home/Home.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import NotFound from '../NotFound/NotFound.js';
import Logout from '../Logout/Logout.js';
import CreateArticle from '../CreateArticle/CreateArticle.js';
import DetailsArticle from '../DetailsArticle/DetailsArticle.js';

class Main extends Component {
    render() {
        return (
            <main className="main-wrapper">
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/categories/all" />
                    </Route>

                    <Route
                        path="/categories/:category"
                        render={(props) => <Home {...props} loggedInStateHandler={this.props.loggedInStateHandler} />}
                    />

                    <Route path="/article/create">
                        {
                            localStorage['auth'] ?
                                <CreateArticle loggedInStateHandler={this.props.loggedInStateHandler} /> :
                                <Redirect to="/categories/all" />
                        }
                    </Route>

                    <Route
                        path="/article/details/:articleId"
                        render={(props) => <DetailsArticle {...props} loggedInStateHandler={this.props.loggedInStateHandler} />}
                    />

                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout">
                        <Logout loggedOutStateHandler={this.props.loggedOutStateHandler} />
                    </Route>

                    <Route component={NotFound} />

                </Switch>
            </main>
        )
    }
}

export default Main;
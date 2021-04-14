import './Main.css';

import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './Home/Home.js';
import Register from './Register/Register.js';
import Login from './Login/Login.js';
import NotFound from './NotFound/NotFound.js';
import Logout from './Logout/Logout.js';
import CreateArticle from './CreateArticle/CreateArticle.js';
import DetailsArticle from './DetailsArticle/DetailsArticle.js';
import EditArticle from './EditArticle/EditArticle.js';
import DeleteArticle from './DeleteArticle/DeleteArticle.js';
import Profile from './Profile/Profile.js';

import isAuth from '../../hoc/isAuth';

class Main extends Component {
    render() {
        return (
            <main className="main-wrapper">
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/categories/all" />
                    </Route>

                    <Route path="/categories/:category" component={Home} />
                    <Route path="/article/create" component={isAuth(CreateArticle)} />
                    <Route path="/article/details/:articleId" component={DetailsArticle} />
                    <Route path="/article/edit/:articleId" component={isAuth(EditArticle)} />
                    <Route path="/article/delete/:articleId" component={isAuth(DeleteArticle)} />
                    <Route path="/profile" component={isAuth(Profile)} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={isAuth(Logout)} />

                    <Route component={NotFound} />
                </Switch>
            </main>
        )
    }
}

export default Main;
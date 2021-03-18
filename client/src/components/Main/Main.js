import './Main.css';

import { Route, Switch } from 'react-router-dom';

import Home from '../Home/Home.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';

const Main = () => {
    return (
        <main className="main-wrapper">
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
        </main>
    )
}

export default Main;
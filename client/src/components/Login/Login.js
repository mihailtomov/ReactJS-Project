import { Component } from 'react';
import { Redirect } from 'react-router-dom';

import authService from '../../services/authService';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            loggedIn: false,
        }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        authService.login(this.state)
            .then(res => {
                if (res.message) throw res;

                localStorage.setItem('user', res.username);
                localStorage.setItem('auth', res.token);

                setTimeout(() => {
                    this.setState({ loggedIn: true });
                }, 500)
            })
            .catch(err => console.log(err))
    }

    render() {
        const { username, password, loggedIn } = this.state;

        if (loggedIn) {
            return <Redirect to="/" />
        }

        return (
            <section>
                <h2>Login</h2>
                <div>
                    <form onSubmit={this.onSubmitHandler}>
                        <label>Username:</label>
                        <input type="text" name="username" value={username} onChange={this.onChangeHandler} />
                        <label>Password:</label>
                        <input type="password" name="password" value={password} onChange={this.onChangeHandler} />
                        <input type="submit" value="Login" />
                    </form>
                </div>
            </section>
        );
    }
}

export default Login;
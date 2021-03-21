import { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { login } from '../../services/authService';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            loggedIn: false,
        }
    }

    changeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    changePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        login(this.state)
            .then(userInfo => {
                localStorage.setItem('user', userInfo.username);
                localStorage.setItem('auth', userInfo.token);

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
                    <form onSubmit={this.handleSubmit}>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={this.changeUsername} />
                        <label>Password:</label>
                        <input type="password" value={password} onChange={this.changePassword} />
                        <input type="submit" value="Login" />
                    </form>
                </div>
            </section>
        );
    }
}

export default Login;
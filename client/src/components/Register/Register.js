import { Component } from 'react';

import { register } from '../../services/authService';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
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

    changeRepeatPassword = (event) => {
        this.setState({
            repeatPassword: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        register(this.state)
            .then(data => console.log(data))
            .catch(err => console.log(err.message))
    }

    render() {
        const { username, password, repeatPassword } = this.state;

        return (
            <section>
                <h2>Register</h2>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={this.changeUsername} />
                        <label>Password:</label>
                        <input type="password" value={password} onChange={this.changePassword} />
                        <label>Repeat password:</label>
                        <input type="password" value={repeatPassword} onChange={this.changeRepeatPassword} />
                        <input type="submit" value="Register" />
                    </form>
                </div>
            </section>
        );
    }
}

export default Register;
import { Component } from 'react';
import { Redirect } from 'react-router-dom';

import authService from '../../services/authService';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            registered: false,
        }
    }
    
    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        authService.register(this.state)
            .then(res => {
                if (res.err) throw res.err;

                this.setState({ registered: true });
            })
            .catch(err => console.log(err))
    }

    render() {
        const { username, password, repeatPassword, registered } = this.state;

        if (registered) {
            return <Redirect to="/login" />
        }

        return (
            <section>
                <h2>Register</h2>
                <div>
                    <form onSubmit={this.onSubmitHandler}>
                        <label>Username:</label>
                        <input type="text" name="username" value={username} onChange={this.onChangeHandler} />
                        <label>Password:</label>
                        <input type="password" name="password" value={password} onChange={this.onChangeHandler} />
                        <label>Repeat password:</label>
                        <input type="password" name="repeatPassword" value={repeatPassword} onChange={this.onChangeHandler} />
                        <input type="submit" value="Register" />
                    </form>
                </div>
            </section>
        );
    }
}

export default Register;
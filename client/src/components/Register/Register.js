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
            // usernameErrors: ['error'],
            // passwordErrors: ['error'],
            // repeatPasswordErrors: ['error'],
        }
    }

    onChangeHandler = (e) => {
        // const inputLength = e.target.value.length;

        // switch (e.target.name) {
        //     case 'username':
        //         if (inputLength > 0 && inputLength < 3) {
        //             this.setState({ usernameErrors: ['error', 'minLength'] });
        //         } else {
        //             this.setState({ usernameErrors: ['error'] });
        //         }
        //         break;
        //     case 'password':
        //         if (inputLength > 0 && inputLength < 6) {
        //             this.setState({ passwordErrors: ['error', 'minLength'] });
        //         } else {
        //             this.setState({ passwordErrors: ['error'] });
        //         }
        //         break;
        //     default:
        //         if (inputLength > 0 && inputLength < 6) {
        //             this.setState({ repeatPasswordErrors: ['error', 'minLength'] });
        //         } else {
        //             this.setState({ repeatPasswordErrors: ['error'] });
        //         }
        //         break;
        // }

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
        const {
            username,
            password,
            repeatPassword,
            registered,
            usernameErrors,
            passwordErrors,
            repeatPasswordErrors
        }
            = this.state;

        if (registered) {
            return <Redirect to="/login" />
        }

        return (
            <section>
                <h2>Register</h2>
                <div>
                    <form onSubmit={this.onSubmitHandler}>
                        <label htmlFor="username">Username:</label>
                        <input type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={this.onChangeHandler}
                            minLength="3"
                            maxLength="12"
                            required
                        />
                        {/* <span className={usernameErrors.join(' ')}>username needs to be at least 3 characters long</span> */}

                        <label htmlFor="password">Password:</label>
                        <input type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={this.onChangeHandler}
                            minLength="6"
                            maxLength="20"
                            required
                        />
                        {/* <span className={passwordErrors.join(' ')}>password needs to be at least 6 characters long</span> */}

                        <label htmlFor="repeatPassword">Repeat password:</label>
                        <input type="password"
                            name="repeatPassword"
                            id="repeatPassword"
                            value={repeatPassword}
                            onChange={this.onChangeHandler}
                            minLength="6"
                            maxLength="20"
                            required
                        />
                        {/* <span className={repeatPasswordErrors.join(' ')}>repeat password needs to be at least 6 characters long</span> */}

                        <input type="submit" value="Register" />
                    </form>
                </div>
            </section>
        );
    }
}

export default Register;
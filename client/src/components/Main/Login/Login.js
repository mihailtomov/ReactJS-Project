import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import authService from '../../../services/authService';
import errorHandler from '../../../utils/errorHandler';
import timeoutMessage from '../../../utils/timeoutMessage';
import { MyTextInput } from '../../../reusable-components/reusable-components.js';

import ErrorMessage from '../ErrorMessage/ErrorMessage.js';
import SuccessMessage from '../SuccessMessage/SuccessMessage.js';

import AuthContext from '../../../AuthContext';

const Login = ({
    location
}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [onSubmitError, setOnSubmitError] = useState({ message: '' });
    const [onSucessMessage, setOnSuccessMessage] = useState({
        state: location.message ? location.message.state : false,
        type: location.message ? location.message.type : ''
    });

    const { loggedInStateHandler } = useContext(AuthContext);

    useEffect(() => {
        if (localStorage['auth']) loggedInStateHandler();

        const timer = timeoutMessage(setOnSuccessMessage, 3000);
        return () => clearTimeout(timer);
    }, [])

    if (loggedIn) {
        return <Redirect to={{
            pathname: '/categories/home',
            message: {
                state: true,
                type: 'logged in'
            },
        }} />
    }

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object({
                username: Yup.string()
                    .required('Username is required!'),
                password: Yup.string()
                    .required('Password is required!'),
            })}
            onSubmit={values => {
                authService.login(values)
                    .then(res => {
                        if (res.err) throw res.err;

                        localStorage.setItem('user', res.username);
                        localStorage.setItem('auth', res.token);

                        setTimeout(() => {
                            setLoggedIn(true);
                        }, 20)
                    })
                    .catch(err => errorHandler(setOnSubmitError, err));
            }}
        >
            <section>
                {onSubmitError.message.length > 0 && <ErrorMessage message={onSubmitError.message} />}
                {onSucessMessage.state && <SuccessMessage message="Successfully registered!" />}

                <h2>Login</h2>
                <div>
                    <Form>
                        <MyTextInput
                            label="Username:"
                            name="username"
                            type="text"
                        />

                        <MyTextInput
                            label="Password:"
                            name="password"
                            type="password"
                        />

                        <input type="submit" value="Login" />
                    </Form>
                </div>
            </section>
        </Formik>
    )
}

export default Login;
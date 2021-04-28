import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import authService from '../../../services/authService';
import errorHandler from '../../../utils/errorHandler';
import { MyTextInput } from '../../../reusable-components/reusable-components.js';

import ErrorMessage from '../ErrorMessage/ErrorMessage.js';

const Register = () => {
    const [registered, setRegistered] = useState(false);
    const [onSubmitError, setOnSubmitError] = useState({ message: '' });

    if (registered) {
        return <Redirect to="/login" />
    }

    return (
        <Formik
            initialValues={{ username: '', password: '', repeatPassword: '' }}
            validationSchema={Yup.object({
                username: Yup.string()
                    .required('Username is required!')
                    .min(4, 'Username needs to be at least 4 characters long!'),
                password: Yup.string()
                    .required('Password is required!')
                    .min(6, 'Password needs to be at least 6 characters long!'),
                repeatPassword: Yup.string()
                    .required('Repeat Password is required!')
                    .test('passwords-match', 'Passwords should match!', function (value) {
                        return this.parent.password === value
                    })
            })}
            onSubmit={values => {
                authService.register(values)
                    .then(res => {
                        if (res.err) throw res.err;

                        setRegistered(true);
                    })
                    .catch(err => errorHandler(setOnSubmitError, err))
            }}
        >
            <section>
                {onSubmitError.message.length > 0 ? <ErrorMessage message={onSubmitError.message} /> : null}

                <h2>Register</h2>
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

                        <MyTextInput
                            label="Repeat Password:"
                            name="repeatPassword"
                            type="password"
                        />

                        <input type="submit" value="Register" />
                    </Form>
                </div>
            </section>
        </Formik>
    );
}

export default Register;
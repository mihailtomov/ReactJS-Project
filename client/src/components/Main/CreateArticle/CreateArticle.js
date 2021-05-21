import './CreateArticle.css';

import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ArticleForm from '../ArticleForm/ArticleForm.js';
import articleService from '../../../services/articleService';
import errorHandler from '../../../utils/errorHandler';
import AuthContext from '../../../AuthContext';

import ErrorMessage from '../ErrorMessage/ErrorMessage.js';

const CreateArticle = () => {
    const [onSubmitError, setOnSubmitError] = useState({ message: '' });
    const { loggedInStateHandler } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (localStorage['auth']) loggedInStateHandler();
    }, [])

    return (
        <Formik
            initialValues={{ title: '', content: '', category: 'all', imageUrl: '', youtubeUrl: '', author: localStorage['user'] }}
            validationSchema={Yup.object({
                title: Yup.string()
                    .required('Title is required!'),
                content: Yup.string()
                    .required('Content is required!'),
                imageUrl: Yup.string()
                    .url('Invalid URL!'),
                youtubeUrl: Yup.string()
                    .url('Invalid URL!'),
            })}
            onSubmit={values => {
                articleService
                    .create(values)
                    .then(res => {
                        if (res.err) throw res.err;

                        history.push('/categories/home');
                    })
                    .catch(err => errorHandler(setOnSubmitError, err))
            }}
        >
            <section className="create-article">
                {onSubmitError.message.length > 0 ? <ErrorMessage message={onSubmitError.message} /> : null}
                <h2>Create new article</h2>
                <div>
                    <ArticleForm />
                </div>
            </section>
        </Formik>
    );
}

export default CreateArticle;
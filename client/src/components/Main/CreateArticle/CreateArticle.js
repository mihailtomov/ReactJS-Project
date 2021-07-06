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
    const { username, loggedInStateHandler } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (localStorage['auth']) loggedInStateHandler();
    }, []);

    return (
        <Formik
            initialValues={{ title: '', content: '', category: 'music', youtubeUrl: '', author: username, image: null }}
            validationSchema={Yup.object({
                title: Yup.string()
                    .required('Title is required!'),
                content: Yup.string()
                    .required('Content is required!'),
                youtubeUrl: Yup.string()
                    .url('Invalid URL!'),
            })}
            onSubmit={values => {
                const formData = new FormData();

                formData.append('title', values.title);
                formData.append('content', values.content);
                formData.append('category', values.category);
                formData.append('youtubeUrl', values.youtubeUrl);
                formData.append('author', values.author);
                formData.append('image', values.image);

                articleService
                    .create(formData)
                    .then(res => {
                        if (res.err) throw res.err;

                        history.push({
                            pathname: '/categories/home',
                            message: {
                                state: true,
                                type: 'article created'
                            }
                        });
                    })
                    .catch(err => errorHandler(setOnSubmitError, err));
            }}
        >
            {({ setFieldValue }) => (

                <section className="create-article">
                    {onSubmitError.message.length > 0 && <ErrorMessage message={onSubmitError.message} />}

                    <h2>Create new article</h2>
                    <div>
                        <ArticleForm setFieldValue={setFieldValue} />
                    </div>
                </section>
            )}
        </Formik>
    );
}

export default CreateArticle;
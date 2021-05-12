import './CreateArticle.css';

import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyTextInput, MyTextareaInput, MySelect } from '../../../reusable-components/reusable-components.js';
import articleService from '../../../services/articleService';
import AuthContext from '../../../AuthContext';

const availableOptions = [
    { value: 'all', label: 'All' },
    { value: 'music', label: 'Music' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'other', label: 'Other' },
]


const CreateArticle = () => {
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

                        history.push('/categories/all');
                    })
                    .catch(err => console.log(err))
            }}
        >
            <section className="create-article">
                <h2>Create new article</h2>
                <div>
                    <Form>
                        <MyTextInput
                            label="Title:"
                            name="title"
                            type="text"
                        />

                        <MyTextareaInput
                            label="Content:"
                            name="content"
                        />

                        <MySelect label="Category:" name="category">
                            {availableOptions.map(o => {
                                return <option key={o.value} value={o.value}>{o.label}</option>
                            })}
                        </MySelect>

                        <MyTextInput
                            label="Image URL (optional):"
                            name="imageUrl"
                            type="text"
                        />

                        <MyTextInput
                            label="Youtube URL (optional):"
                            name="youtubeUrl"
                            type="text"
                        />

                        <input type="submit" value="Submit" />
                    </Form>
                </div>
            </section>
        </Formik>
    );
}

export default CreateArticle;
import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ArticleForm from '../ArticleForm/ArticleForm.js';
import articleService from '../../../services/articleService.js';
import AuthContext from '../../../AuthContext.js';

const EditArticle = ({
    match
}) => {
    const { loggedInStateHandler } = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [isArticleUpdated, setIsArticleUpdated] = useState(false);
    const [isDataAvailable, setIsDataAvailable] = useState(false);

    useEffect(() => {
        loggedInStateHandler();

        const { articleId } = match.params;

        articleService.getOne(articleId)
            .then(res => {
                if (res.err) throw res.err;

                let { title, content, category, imageUrl, youtubeUrl } = res;

                youtubeUrl = youtubeUrl.replace('embed/', 'watch?v=');

                setTitle(title);
                setContent(content);
                setCategory(category);
                setImageUrl(imageUrl);
                setYoutubeUrl(youtubeUrl);

                setIsDataAvailable(true);
            })
            .catch(err => console.log(err))
    }, []);

    if (isArticleUpdated) {
        return <Redirect to={{
            pathname: `/article/details/${match.params.articleId}`,
            message: {
                state: true,
                type: 'article updated'
            }
        }} />
    } else if (isDataAvailable) {
        return (
            <Formik
                initialValues={{ title, content, category, imageUrl, youtubeUrl }}
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
                    const { articleId } = match.params;

                    articleService.update(articleId, values)
                        .then(res => {
                            if (res.err) throw res.err;

                            setIsArticleUpdated(true);
                        })
                        .catch(err => console.log(err))
                }}
            >
                <section className="edit-article">
                    <h2>Edit your article</h2>
                    <div>
                        <ArticleForm />
                    </div>
                </section>
            </Formik>
        );
    } else {
        return null;
    }
}

export default EditArticle;
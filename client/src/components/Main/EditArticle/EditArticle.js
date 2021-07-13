import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { buildFirebaseStoragePath } from '../../../utils/config';
import { uploadImageToFirebase, deleteImageFromFirebase } from '../../../utils/firebase';
import * as Yup from 'yup';

import ArticleForm from '../ArticleForm/ArticleForm.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.js';

import articleService from '../../../services/articleService';
import AuthContext from '../../../AuthContext.js';
import errorHandler from '../../../utils/errorHandler';

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
    const [onSubmitError, setOnSubmitError] = useState({ message: '' });

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
            .catch(err => errorHandler(setOnSubmitError, err))
    }, []);

    const onDeleteImageHandler = async () => {
        if (imageUrl) {
            const filePath = buildFirebaseStoragePath(imageUrl);

            deleteImageFromFirebase(filePath);

            const { articleId } = match.params;

            try {
                const article = await articleService.getOne(articleId);
                article.imageUrl = '';

                await articleService.update(articleId, article);
                setImageUrl('');
            } catch (err) {
                errorHandler(setOnSubmitError, err);
            }
        }
    }

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
                initialValues={{ title, content, category, imageUrl, youtubeUrl, image: null }}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .required('Title is required!'),
                    content: Yup.string()
                        .required('Content is required!'),
                    youtubeUrl: Yup.string()
                        .url('Invalid URL!'),
                })}
                onSubmit={async values => {
                    const { imageUrl, image } = values;
                    delete values.image;

                    if (imageUrl && image) {
                        const filePath = buildFirebaseStoragePath(imageUrl);

                        deleteImageFromFirebase(filePath);
                    }

                    if (image) {
                        const storageUrl = await uploadImageToFirebase(image);
                        values.imageUrl = storageUrl;
                    }

                    const { articleId } = match.params;

                    articleService.update(articleId, values)
                        .then(res => {
                            if (res.err) throw res.err;

                            setIsArticleUpdated(true);
                        })
                        .catch(err => errorHandler(setOnSubmitError, err))
                }}
            >
                {({ setFieldValue }) => (

                    <section className="edit-article">
                        {onSubmitError.message.length > 0 && <ErrorMessage message={onSubmitError.message} />}

                        <h2>Edit your article</h2>
                        <div>
                            <ArticleForm
                                setFieldValue={setFieldValue}
                                imageUrl={imageUrl}
                                onDeleteImageHandler={onDeleteImageHandler}
                            />
                        </div>
                    </section>
                )}
            </Formik>
        );
    } else {
        return null;
    }
}

export default EditArticle;
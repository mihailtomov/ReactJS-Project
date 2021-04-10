import './EditArticle.css';

import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

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
            })
            .catch(err => console.log(err))
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const { articleId } = match.params;

        const title = e.target.title.value;
        const content = e.target.content.value;
        const category = e.target.category.value;
        const imageUrl = e.target.imageUrl.value;
        const youtubeUrl = e.target.youtubeUrl.value;

        articleService.update(articleId, {
            title,
            content,
            category,
            imageUrl,
            youtubeUrl
        })
            .then(res => {
                if (res.err) throw res.err;

                setIsArticleUpdated(true);
            })
            .catch(err => console.log(err))
    }

    if (isArticleUpdated) {
        return <Redirect to={`/article/details/${match.params.articleId}`} />
    }

    return (
        <section className="edit-article">
            <h2>Edit your article</h2>
            <div>
                <ArticleForm
                    onSubmitHandler={onSubmitHandler}
                    title={title}
                    content={content}
                    imageUrl={imageUrl}
                    youtubeUrl={youtubeUrl}
                    category={category}
                />
            </div>
        </section>
    );
}

export default EditArticle;
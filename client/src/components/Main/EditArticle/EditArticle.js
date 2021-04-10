import './EditArticle.css';

import { useState, useEffect } from 'react';

import ArticleForm from '../ArticleForm/ArticleForm.js';
import articleService from '../../../services/articleService.js';

const EditArticle = ({
    match
}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');

    useEffect(() => {
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

    return (
        <section className="edit-article">
            <h2>Edit your article</h2>
            <div>
                <ArticleForm
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
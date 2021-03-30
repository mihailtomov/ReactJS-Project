import { useEffect, useState } from 'react';

import articleService from '../../services/articleService';

import './DetailsArticle.css';

const DetailsArticle = (
    { match }
) => {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const { articleId } = match.params;

        articleService.getOne(articleId)
            .then(res => {
                if (res.err) throw res.err;

                const { title, imageUrl, content, author, date } = res;

                setTitle(title);
                setContent(content);
                setImageUrl(imageUrl);
                setAuthor(author);
                setDate(date);
            })
            .catch(err => console.log(err))
    });

    return (
        <section>
            <article className="details-article">
                <h3>{title}</h3>
                <img src={imageUrl} alt="" />
                <p className="description">
                    {content}
                </p>
                <div>
                    <span className="author-name">Published by <strong>{author}</strong></span>
                    <p>
                        <time dateTime={date}>{date}</time>
                    </p>
                </div>
            </article>
        </section>
    );
}

export default DetailsArticle;
import { useEffect, useState } from 'react';

import articleService from '../../services/articleService';

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
            .then(article => {
                const { title, imageUrl, content, author, date } = article;

                setTitle(title);
                setContent(content);
                setImageUrl(imageUrl);
                setAuthor(author);
                setDate(date);
            })
    });

    return (
        <section>
            <article>
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
const GuestDetailsArticle = (
    {
        title, imageUrl, content, author, date
    }
) => {
    return (
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
    );
}

export default GuestDetailsArticle;
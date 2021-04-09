const GuestDetailsArticle = (
    {
        title, imageUrl, youtubeUrl, content, author, date
    }
) => {
    return (
        <article>
            <h3>{title}</h3>
            <div className="visual-section">
                <img src={imageUrl} alt="" />
                <iframe width="495" height="278" src={youtubeUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
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
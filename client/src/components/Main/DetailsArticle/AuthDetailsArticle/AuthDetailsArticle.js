import GuestDetailsArticle from '../GuestDetailsArticle/GuestDetailsArticle.js';
import Comment from '../Comment/Comment.js';

const AuthDetailsArticle = ({
    _id,
    title,
    content,
    imageUrl,
    youtubeUrl,
    author,
    date,
    hasLiked,
    likes,
    comments,
    onCommentSubmitHandler, 
    onLikeArticleHandler,
}) => {
    return (
        <>
            <GuestDetailsArticle
                _id={_id}
                title={title}
                content={content}
                imageUrl={imageUrl}
                youtubeUrl={youtubeUrl}
                author={author}
                date={date}
                hasLiked={hasLiked}
                likes={likes}
                onLikeArticleHandler={onLikeArticleHandler}
            />

            <h4>Comments</h4>
            <div>
                {
                    comments.map(c =>
                        <Comment
                            key={c._id}
                            _id={c._id}
                            name={c.name}
                            comment={c.comment}
                            date={c.date}
                            number={c.number}
                        />
                    )
                }
            </div>

            <form onSubmit={onCommentSubmitHandler}>
                <label htmlFor="comment">Comment: </label>
                <textarea name="comment" id="comment" cols="30" rows="8"></textarea>
                <input type="submit" value="Add comment" />
            </form>
        </>
    );
}

export default AuthDetailsArticle;
import GuestDetailsArticle from '../GuestDetailsArticle/GuestDetailsArticle.js';
import Comment from '../Comment/Comment.js';

const AuthDetailsArticle = (
    {
        title, imageUrl, content, author, date, comments, onCommentSubmitHandler
    }
) => {
    return (
        <>
            <GuestDetailsArticle
                title={title}
                imageUrl={imageUrl}
                content={content}
                author={author}
                date={date}
            />

            <h4>Comments</h4>
            <div>
                {
                    comments.map(c =>
                        <Comment key={c._id} name={c.name} comment={c.comment} />
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
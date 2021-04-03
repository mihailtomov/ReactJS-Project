import './Comment.css';

const Comment = (
    {
        name,
        comment,
    }
) => {
    return (
        <div className="comment-box">
            <div>{name}</div>
            <p>{comment}</p>
        </div>
    );
}

export default Comment;
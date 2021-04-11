import './Comment.css';

const Comment = ({
    _id,
    name,
    comment,
    date,
    number,
}) => {
    return (
        <div id={_id} className="comment-box">
            <var className="comment-number">{number}</var>
            <div className="comment-name">{name}</div>
            <time className="comment-date" dateTime={date}>{date}</time>
            <p className="comment-description">{comment}</p>
        </div>
    );
}

export default Comment;
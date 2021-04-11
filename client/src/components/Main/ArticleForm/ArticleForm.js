import './ArticleForm.css';

const availableOptions = [
    { value: 'all', label: 'All' },
    { value: 'music', label: 'Music' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'other', label: 'Other' },
]

const ArticleForm = ({
    onSubmitHandler,
    title,
    content,
    category,
    imageUrl,
    youtubeUrl,
}) => {
    return (
        <form className="article-form" onSubmit={onSubmitHandler}>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" placeholder="Title.." defaultValue={title} />

            <label htmlFor="content">Content:</label>
            <textarea name="content" id="content" placeholder="Description.." defaultValue={content}></textarea>

            <div>
                <label htmlFor="category">Category:</label>
                <select name="category" id="category" defaultValue="all">
                    {availableOptions.map(o => {
                        if (o.value === category) {
                            return <option key={o.value} value={o.value} selected>{o.label}</option>
                        } else {
                            return <option key={o.value} value={o.value}>{o.label}</option>
                        }
                    })}
                </select>
            </div>

            <label htmlFor="imageUrl">Image URL:</label>
            <input type="text" name="imageUrl" id="imageUrl" placeholder="http://" defaultValue={imageUrl} />

            <label htmlFor="youtubeUrl">Youtube URL (optional):</label>
            <input type="text" name="youtubeUrl" id="youtubeUrl" placeholder="https://" defaultValue={youtubeUrl} />

            <input type="submit" value="Submit" />
        </form>
    );
}

export default ArticleForm;
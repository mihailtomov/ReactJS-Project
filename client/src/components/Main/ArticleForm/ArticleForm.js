const availableOptions = [
    { value: 'all', label: 'All' },
    { value: 'music', label: 'Music' },
    { value: 'gaming', label: 'Gaming' },
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
        <form onSubmit={onSubmitHandler}>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" placeholder="Title.." value={title} />

            <label htmlFor="content">Content:</label>
            <textarea name="content" id="content" placeholder="Description.." value={content}></textarea>

            <div>
                <label htmlFor="category">Category:</label>
                <select name="category" id="category" defaultValue="all">
                    {availableOptions.map(o => {
                        if (o.value === category) {
                            return <option value={o.value} selected>{o.label}</option>
                        } else {
                            return <option value={o.value}>{o.label}</option>
                        }
                    })}
                </select>
            </div>

            <label htmlFor="imageUrl">Image URL:</label>
            <input type="text" name="imageUrl" id="imageUrl" placeholder="http://" value={imageUrl} />

            <label htmlFor="youtubeUrl">Youtube URL (optional):</label>
            <input type="text" name="youtubeUrl" id="youtubeUrl" placeholder="https://" value={youtubeUrl} />

            <input type="submit" value="Submit" />
        </form>
    );
}

export default ArticleForm;
import HomeArticle from '../HomeArticle/HomeArticle.js';

const HomeArticleList = ({
    articles
}) => {
    return (
        <section>
            <h2>Latest Articles</h2>

            {
                articles.map(x => <HomeArticle
                    key={x._id}
                    title={x.title}
                    content={x.content}
                    author={x.author}
                    date={x.date}
                    _id={x._id}
                />)
            }

        </section>
    );
}

export default HomeArticleList;
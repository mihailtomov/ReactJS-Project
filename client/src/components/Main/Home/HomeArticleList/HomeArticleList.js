import HomeArticle from '../HomeArticle/HomeArticle.js';

const HomeArticleList = ({
    articles,
    category
}) => {
    return (
        <section>
            {category === 'home' ? <h2>Latest articles</h2> : <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>}

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
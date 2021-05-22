import HomeArticle from '../HomeArticle/HomeArticle.js';
import SuccessMessage from '../../SuccessMessage/SuccessMessage.js';

const HomeArticleList = ({
    articles,
    category,
    onSucessMessage,
}) => {
    return (
        <section>
            {onSucessMessage.type === 'logged in' && <SuccessMessage message="Login successful!" /> }
            {onSucessMessage.type === 'article created' && <SuccessMessage message="Article created!" /> }


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
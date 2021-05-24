import HomeArticle from '../HomeArticle/HomeArticle.js';
import ErrorMessage from '../../ErrorMessage/ErrorMessage.js';
import SuccessMessage from '../../SuccessMessage/SuccessMessage.js';

const HomeArticleList = ({
    articles,
    category,
    onSubmitError,
    onSucessMessage,
}) => {
    return (
        <section>
            {onSubmitError.message.length > 0 && <ErrorMessage message={onSubmitError.message} />}
            
            {onSucessMessage.type === 'logged in' && <SuccessMessage message="Login successful!" /> }
            {onSucessMessage.type === 'article created' && <SuccessMessage message="Article created!" /> }
            {onSucessMessage.type === 'article deleted' && <SuccessMessage message="Article deleted!" /> }


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
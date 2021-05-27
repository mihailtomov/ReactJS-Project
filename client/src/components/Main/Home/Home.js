import { useContext, useState, useEffect } from 'react';

import HomeArticleList from './HomeArticleList/HomeArticleList.js';

import AuthContext from '../../../AuthContext';
import articleService from '../../../services/articleService';
import errorHandler from '../../../utils/errorHandler';
import timeoutMessage from '../../../utils/timeoutMessage';

const Home = ({
    match,
    location,
}) => {
    const { loggedInStateHandler } = useContext(AuthContext);

    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState('home');
    const [onSubmitError, setOnSubmitError] = useState({ message: '' });
    const [onSucessMessage, setOnSuccessMessage] = useState({
        state: location.message ? location.message.state : false,
        type: location.message ? location.message.type : ''
    });

    useEffect(() => {
        if (localStorage['auth']) loggedInStateHandler();

        if (Math.random() > 0.7) {
            throw new Error('Error throw from Home Component');
        }

        const timer = timeoutMessage(setOnSuccessMessage, 3000);
        return () => clearTimeout(timer);
    }, [])

    useEffect(() => {
        articleService.getAll(category)
            .then(res => {
                if (res.err) throw res.err;

                setArticles(res.articles);
            })
            .catch(err => errorHandler(setOnSubmitError, err));
    }, [category]);

    useEffect(() => {
        if (match.params.category !== category) {
            setCategory(match.params.category)
        };
    })

    if (articles.length > 0) {
        return <HomeArticleList
            articles={articles}
            category={category}
            onSubmitError={onSubmitError}
            onSucessMessage={onSucessMessage}
        />
    }

    return <p>There are no articles in this section. Be the first to create one!</p>
}

export default Home;
import { useContext, useState, useEffect } from 'react';

import HomeArticleList from './HomeArticleList/HomeArticleList.js';
import articleService from '../../../services/articleService';
import timeoutMessage from '../../../utils/timeoutMessage';
import AuthContext from '../../../AuthContext';

const Home = ({
    match,
    location,
}) => {
    const { loggedInStateHandler } = useContext(AuthContext);

    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState('home');
    const [onSucessMessage, setOnSuccessMessage] = useState({
        state: location.message ? location.message.state : false,
        type: location.message ? location.message.type : ''
    });

    useEffect(() => {
        if (localStorage['auth']) loggedInStateHandler();

        const timer = timeoutMessage(setOnSuccessMessage, 3000);
        return () => clearTimeout(timer);
    }, [])

    useEffect(() => {
        articleService.getAll(category)
            .then(res => {
                if (res.err) throw res.err;

                setArticles(res.articles);
            })
            .catch(err => {
                console.log(err);
            });
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
            onSucessMessage={onSucessMessage}
        />
    }

    return <p>There are no articles in this section. Be the first to create one!</p>
}

export default Home;
import { useState, useEffect } from 'react';

import HomeArticleList from './HomeArticleList/HomeArticleList.js';

import articleService from '../../services/articleService';

const Home = (
    {
        loggedInStateHandler,
        match,
    }
) => {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState('all');

    useEffect(() => {
        if (localStorage['auth']) loggedInStateHandler();

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
        return <HomeArticleList articles={articles} />
    }

    return <p>There are no articles in this section. Be the first to create one!</p>
}

export default Home;
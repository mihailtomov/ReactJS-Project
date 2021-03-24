import { Component } from 'react';

import HomeArticleList from './HomeArticleList/HomeArticleList.js';

import articleService from '../../services/articleService';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        if (localStorage['auth']) this.props.loggedInStateHandler();

        articleService.getAll()
            .then(articles => {
                this.setState(articles);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { articles } = this.state;

        if (articles.length > 0) {
            return <HomeArticleList articles={articles} />
        } 

        return <p>There are no articles here yet..</p>
    }
}


export default Home;
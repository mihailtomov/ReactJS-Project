import { Component } from 'react';

import HomeArticleList from './HomeArticleList/HomeArticleList.js';

import articleService from '../../services/articleService';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            category: 'all',
        }
    }

    componentDidMount() {
        if (localStorage['auth']) this.props.loggedInStateHandler();
        articleService.getAll(this.state.category)
            .then(res => {
                if (res.err) throw res;

                this.setState(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidUpdate() {
        let category = 'all';

        if (this.props.match) {
            category = this.props.match.params.category;
        }

        if (category !== this.state.category) {
            articleService.getAll(category)
                .then(res => {
                    if (res.err) throw res.err;

                    this.setState((oldState) => {
                        if (oldState.category !== category) {
                            res.category = category;

                            return res;
                        }
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    render() {
        const { articles } = this.state;

        if (articles.length > 0) {
            return <HomeArticleList articles={articles} />
        }

        return <p>There are no articles in this section. Be the first to create one!</p>
    }
}


export default Home;
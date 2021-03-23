import { Component } from 'react';

import ArticleList from '../ArticleList/ArticleList.js';

class Home extends Component {
    componentDidMount() {
        if (localStorage['auth']) this.props.loggedInStateHandler();
    }

    render() {
        return (
            <ArticleList />
        )
    }
}


export default Home;
import { Component } from 'react';

import Article from '../Article/Article.js';

class ArticleList extends Component {
    render() {
        return (
            <section>
                <h2>Latest Articles</h2>

                < Article />
                < Article />
                < Article />

            </section>
        );
    }
}

export default ArticleList;
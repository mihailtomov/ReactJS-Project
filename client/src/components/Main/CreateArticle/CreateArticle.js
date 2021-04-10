import './CreateArticle.css';

import { Component } from 'react';

import ArticleForm from '../ArticleForm/ArticleForm.js';
import articleService from '../../../services/articleService';
import AuthContext from '../../../AuthContext';

class CreateArticle extends Component {
    componentDidMount() {
        if (localStorage['auth']) this.context.loggedInStateHandler();
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const content = e.target.content.value;
        const category = e.target.category.value;
        const imageUrl = e.target.imageUrl.value;
        const youtubeUrl = e.target.youtubeUrl.value;
        const author = localStorage['user'];

        articleService
            .create({
                title,
                content,
                category,
                imageUrl,
                youtubeUrl,
                author
            })
            .then(res => {
                if (res.err) throw res.err;

                this.props.history.push('/categories/all');
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <section className="create-article">
                <h2>Create new article</h2>
                <div>
                    <ArticleForm onSubmitHandler={this.onSubmitHandler} />
                </div>
            </section>
        );
    }
}

CreateArticle.contextType = AuthContext;

export default CreateArticle;
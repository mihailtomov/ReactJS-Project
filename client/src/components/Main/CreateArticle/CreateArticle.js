import './CreateArticle.css';

import { Component } from 'react';
import { Redirect } from 'react-router-dom';

import articleService from '../../../services/articleService';

import AuthContext from '../../../AuthContext';

class CreateArticle extends Component {
    constructor() {
        super();

        this.state = {
            articleCreated: false,
            selectedFile: null,
        }
    }
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

                this.setState({ articleCreated: true });
            })
            .catch(err => console.log(err))
    }

    render() {
        if (this.state.articleCreated) {
            return <Redirect to="/categories/all" />
        } else {
            return (
                <section className="create-article">
                    <h2>Create new article</h2>
                    <div>
                        <form onSubmit={this.onSubmitHandler}>
                            <label htmlFor="title">Title:</label>
                            <input type="text" name="title" id="title" placeholder="Title.." />

                            <label htmlFor="content">Content:</label>
                            <textarea name="content" id="content" placeholder="Description.."></textarea>

                            <div>
                                <label htmlFor="category">Category:</label>
                                <select name="category" id="category" defaultValue="all">
                                    <option value="all">All</option>
                                    <option value="music">Music</option>
                                    <option value="gaming">Gaming</option>
                                </select>
                            </div>

                            <label htmlFor="imageUrl">Image URL:</label>
                            <input type="text" name="imageUrl" id="imageUrl" placeholder="http://" />

                            <label htmlFor="youtubeUrl">Youtube URL (optional):</label>
                            <input type="text" name="youtubeUrl" id="youtubeUrl" placeholder="https://" />

                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </section>
            );
        }
    }
}

CreateArticle.contextType = AuthContext;

export default CreateArticle;
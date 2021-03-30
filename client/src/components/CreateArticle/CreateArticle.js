import { Component } from 'react';
import { Redirect } from 'react-router-dom';

import articleService from '../../services/articleService';

class CreateArticle extends Component {
    constructor() {
        super();

        this.state = {
            articleCreated: false,
        }
    }
    componentDidMount() {
        if (localStorage['auth']) this.props.loggedInStateHandler();
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const content = e.target.content.value;
        const imageUrl = e.target.imageUrl.value;
        const category = e.target.category.value;
        const author = localStorage['user'];

        articleService.create({
            title,
            content,
            imageUrl,
            category,
            author
        }).then(res => {
            if (!res.message) {
                this.setState({ articleCreated: true });
            }
        })
    }

    render() {
        if (this.state.articleCreated) {
            return <Redirect to="/" />
        } else {
            return (
                <section>
                    <h2>Create new article</h2>
                    <div>
                        <form onSubmit={this.onSubmitHandler}>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" id="title" placeholder="Title.." />

                            <label htmlFor="content">Content</label>
                            <textarea name="content" id="content" placeholder="Description.."></textarea>

                            <div>
                                <label htmlFor="category">Category</label>
                                <select name="category" id="category" defaultValue="all">
                                    <option value="all">All</option>
                                    <option value="music">Music</option>
                                    <option value="gaming">Gaming</option>
                                </select>
                            </div>

                            <label htmlFor="imageUrl">Image URL</label>
                            <input type="text" name="imageUrl" id="imageUrl" placeholder="http://" />

                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </section>
            );
        }
    }
}

export default CreateArticle;
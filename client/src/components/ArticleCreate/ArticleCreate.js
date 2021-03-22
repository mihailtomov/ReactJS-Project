import { Component } from 'react';

class ArticleCreate extends Component {
    componentDidMount() {
        if (localStorage['auth']) this.props.checkLoggedIn();
    }

    render() {
        return (
            <section>
                <h2>Create new article</h2>
                <div>
                    <form>
                        <label>Article title</label>
                        <input type="text" className="title" />
                        <label>Content</label>
                        <textarea className="content"></textarea>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </section>
        );
    }
}

export default ArticleCreate;
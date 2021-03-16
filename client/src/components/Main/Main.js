import './Main.css';

const Main = () => {
    return (
        <main className="main-wrapper">
            <h2 className="posts-heading">All posts</h2>
            <section>
                <article>
                    <h3>Post Title</h3>
                    <p>Description</p>
                    <span className="author">Author: <small>Pesho</small></span>
                </article>

                <article>
                    <h3>Post Title</h3>
                    <p>Description</p>
                </article>

                <article>
                    <h3>Post Title</h3>
                    <p>Description</p>
                </article>
            </section>
        </main>
    )
}

export default Main;
import './Main.css';

const Main = () => {
    return (
        <main className="main-wrapper">
            <h2 className="posts-heading">All posts</h2>
            <section>
                <article>
                    <h3>Post heading</h3>
                    <img src="./blog.jpg" alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis similique ducimus laudantium hic numquam eveniet tempore eius ipsam architecto unde.</p>
                </article>
            </section>
        </main>
    )
}

export default Main;
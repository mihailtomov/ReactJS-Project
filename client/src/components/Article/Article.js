import { Link } from 'react-router-dom';

const Article = () => {
    return (
        <article>
            <h3>Astronomy</h3>
            <p className="description">
                Astronomy is a natural science that studies celestial objects and phenomena. It applies mathematics, physics, and chemistry,
                in an effort to explain the origin of those objects and phenomena and their evolution. Objects
                of interest include planets, moons, stars, galaxies, and comets; the phenomena include supernova
                explosions, gamma ray bursts,&hellip;
            </p>
            <div>
                <Link className="read-more" to="">Read more</Link>
            </div>
            <div>
                <small>Author: </small>
                <span className="author-name">pesho</span>
                <p>
                    <time dateTime="2015-05-16 19:00">2015-05-16 19:00</time>
                </p>
            </div>
        </article>
    );
}

export default Article;
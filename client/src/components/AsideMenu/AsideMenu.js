import './AsideMenu.css';

import { Link } from 'react-router-dom';

const AsideMenu = () => {
    return (
        <aside className="aside-menu">
            <div>
                <img src="../logo192.png" alt="" />
            </div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="#">Music</Link>
                <Link to="#">Gaming</Link>
                <Link to="#">Anything Else</Link>
            </nav>
        </aside>
    )
}

export default AsideMenu;
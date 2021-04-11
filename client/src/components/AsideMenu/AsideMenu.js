import './AsideMenu.css';

import { Link } from 'react-router-dom';

const AsideMenu = () => {
    return (
        <aside className="aside-menu">
            <div>
                <img src="../../logo192.png" alt="" />
            </div>
            <nav>
                <Link to="/categories/all">Home</Link>
                <Link to="/categories/music">Music</Link>
                <Link to="/categories/gaming">Gaming</Link>
                <Link to="/categories/other">Other</Link>
            </nav>
        </aside>
    )
}

export default AsideMenu;
import './Header.css';

import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="site-header">
            <nav>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><span>Welcome, Pesho!</span></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
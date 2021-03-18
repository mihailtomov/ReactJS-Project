import './Header.css';

const Header = () => {
    return (
        <header className="site-header">
            <nav>
                <ul>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><span>Welcome, Pesho!</span></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
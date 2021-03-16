import './Header.css';

const Header = () => {
    return (
        <header className="site-header">
            <nav>
                <ul>
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Register</a></li>
                    <li><span>Welcome, Pesho!</span></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
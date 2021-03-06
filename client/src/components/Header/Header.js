import './Header.css';

import { Component } from 'react';

import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        if (this.props.loggedIn) {
            return (
                <header className="site-header">
                    <nav>
                        <ul>
                            <li><Link to="/article/create" >Create Article</Link></li>
                            <li><span>Welcome, <Link to="/profile">{this.props.username}</Link>!</span></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </ul>
                    </nav>
                </header>
            );
        } else {
            return (
                <header className="site-header">
                    <nav>
                        <ul>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </ul>
                    </nav>
                </header>
            )
        }
    }
}

export default Header;
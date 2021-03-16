import './App.css';

import Navigation from './components/Navigation/Navigation.js';
import Main from './components/Main/Main.js';
import Footer from './components/Footer/Footer.js';

function App() {
    return (
        <div className="site-wrapper">
            <Navigation />

            <Main />

            <Footer />
        </div>
    );
}

export default App;
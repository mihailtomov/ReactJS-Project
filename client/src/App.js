import './App.css';

import AsideMenu from './components/AsideMenu/AsideMenu.js';
import Header from './components/Header/Header.js';
import Main from './components/Main/Main.js';
import Footer from './components/Footer/Footer.js';

function App() {
    return (
        <div className="site-wrapper">

            <AsideMenu />

            <div className="container">
                <Header />

                <Main />

                <Footer />
            </div>

        </div>
    );
}

export default App;
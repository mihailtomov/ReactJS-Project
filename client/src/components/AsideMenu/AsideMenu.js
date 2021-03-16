import './AsideMenu.css';

const AsideMenu = () => {
    return (
        <aside className="aside-menu">
            <div>
                <img src="logo192.png" alt=""/>
            </div>
            <nav>
                <a href="#">Home</a>
                <a href="#">Music</a>
                <a href="#">Gaming</a>
                <a href="#">Anything Else</a>
            </nav>
        </aside>
    )
}

export default AsideMenu;
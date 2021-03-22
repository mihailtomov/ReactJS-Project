import { Redirect } from 'react-router-dom';

const Logout = (props) => {
    localStorage.clear();

    setTimeout(() => {
        props.checkLoggedOut();
    }, 20);

    return (
        <Redirect to="/login" />
    )
}

export default Logout;
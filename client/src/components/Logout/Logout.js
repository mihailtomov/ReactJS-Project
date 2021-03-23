import { Redirect } from 'react-router-dom';

const Logout = (props) => {
    localStorage.clear();

    setTimeout(() => {
        props.loggedOutStateHandler();
    }, 20);

    return (
        <Redirect to="/login" />
    )
}

export default Logout;
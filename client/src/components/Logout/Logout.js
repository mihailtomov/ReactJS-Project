import { Redirect } from 'react-router-dom';

const Logout = (props) => {
    localStorage.clear();

    props.checkLoggedOut();

    return (
        <Redirect to="/login" />
    )
}

export default Logout;
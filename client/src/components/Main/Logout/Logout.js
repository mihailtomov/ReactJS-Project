import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../../../AuthContext'

const Logout = () => {
    const { loggedOutStateHandler } = useContext(AuthContext);

    localStorage.clear();

    setTimeout(() => {
        loggedOutStateHandler();
    }, 20);

    return (
        <Redirect to="/login" />
    )
}

export default Logout;
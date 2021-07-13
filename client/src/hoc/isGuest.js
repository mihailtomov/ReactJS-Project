import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../AuthContext';

const isGuest = (WrappedComponent) => {

    const Component = (props) => {
        const { loggedIn } = useContext(AuthContext);

        if (loggedIn) {
            return <Redirect to="/categories/home" />
        }

        return <WrappedComponent {...props} />
    }

    return Component;
}

export default isGuest;
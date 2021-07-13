import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../AuthContext';

const isAuth = (WrappedComponent) => {
    
    const Component = (props) => {
        const { loggedIn } = useContext(AuthContext);

        if (!loggedIn) {
            return <Redirect to="/login" />
        }

        return <WrappedComponent {...props} />
    }

    return Component;
}

export default isAuth;
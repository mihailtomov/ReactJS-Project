import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../AuthContext';

const isGuest = (WrappedComponent) => {

    const Component = (props) => {
        const { loggedIn } = useContext(AuthContext);
        const history = useHistory();

        if (loggedIn) {
            setTimeout(() => {
                history.push('/categories/home');
            }, 20)
            return null;
        }

        return <WrappedComponent {...props} />
    }

    return Component;
}

export default isGuest;
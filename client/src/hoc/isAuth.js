import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../AuthContext';

const isAuth = (WrappedComponent) => {
    
    const Component = (props) => {
        const { loggedIn } = useContext(AuthContext);
        const history = useHistory();

        if (!loggedIn) {
            history.push('/login');
            return null;
        }

        return <WrappedComponent {...props} />
    }

    return Component;
}

export default isAuth;
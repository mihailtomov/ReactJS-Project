import buildApiBaseUrl from '../utils/config';

const baseUrl = buildApiBaseUrl('auth');

const endpoint = {
    register: `${baseUrl}/register`,
    login: `${baseUrl}/login`,
    validateToken: `${baseUrl}/validate-token`,
}

const postOptions = (data) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
}

const register = ({ username, password }) => {
    return fetch(endpoint.register, postOptions({ username, password }))
        .then(res => res.json());
}

const login = ({ username, password }) => {
    return fetch(endpoint.login, postOptions({ username, password }))
        .then(res => res.json());
}

const validateToken = (token) => {
    return fetch(endpoint.validateToken, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json());
}

const authService = {
    register,
    login,
    validateToken,
}

export default authService;
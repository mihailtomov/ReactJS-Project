const baseUrl = 'http://localhost:5000/api/auth';

const endpoints = {
    register: `${baseUrl}/register`,
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

export const register = ({ username, password, repeatPassword }) => {
    const validateEmpty = username.trim() !== '' && password.trim() !== '' && repeatPassword.trim() !== '';

    const passwordsMatch = password === repeatPassword;

    if (validateEmpty && passwordsMatch) {
        return fetch(endpoints.register, postOptions({ username, password }))
            .then(res => res.json())
    } else {
        return Promise.reject({ message: 'Invalid input!' });
    }
}
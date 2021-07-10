const baseUrl = '/api/users';

const getUserInfo = (username) => {
    const token = localStorage['auth'];

    return fetch(`${baseUrl}/${username}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => res.json());
}

const userService = {
    getUserInfo,
}

export default userService;
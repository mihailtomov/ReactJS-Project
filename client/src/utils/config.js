const buildApiBaseUrl = (endpoint) => {
    return process.env.NODE_ENV === 'development' ? `http://localhost:5000/api/${endpoint}` : endpoint;
}

const buildFirebaseStoragePath = (imageUrl) => {
    return `images/${imageUrl.split('%2F')[1].split('?')[0]}`;
}

export {
    buildApiBaseUrl as default,
    buildFirebaseStoragePath,
}
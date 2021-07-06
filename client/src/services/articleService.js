const baseUrl = 'http://localhost:5000/api/articles';

const fetchOptions = (method, isFormData, data) => {
    const token = localStorage['auth'];

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    if (isFormData) {
        delete headers['Content-Type'];
    }

    return {
        method,
        headers,
        body: isFormData ? data : JSON.stringify(data)
    }
}

const create = (articleData) => {
    return fetch(baseUrl, fetchOptions('POST', true, articleData))
        .then(res => res.json())
}

const getAll = (category) => {
    return fetch(`${baseUrl}/category/${category}`)
        .then(res => res.json());
}

const getOne = (articleId) => {
    return fetch(`${baseUrl}/${articleId}`)
        .then(res => res.json());
}

const postComment = (commentData) => {
    return fetch(`${baseUrl}/comments`, fetchOptions('POST', false, commentData))
        .then(res => res.json());
}

const update = (articleId, updatedArticleData) => {
    return fetch(`${baseUrl}/${articleId}/edit`, fetchOptions('PATCH', true, updatedArticleData))
        .then(res => res.json());
}

const remove = (articleId) => {
    return fetch(`${baseUrl}/${articleId}/delete`, fetchOptions('DELETE', false, {}))
        .then(res => res.json());
}

const articleService = {
    create,
    getAll,
    getOne,
    postComment,
    update,
    remove,
}

export default articleService;
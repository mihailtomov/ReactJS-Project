const baseUrl = 'http://localhost:5000/api/articles';

const fetchOptions = (method, data, isFormData) => {
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
    return fetch(baseUrl, fetchOptions('POST', articleData, true))
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
    return fetch(`${baseUrl}/comments`, fetchOptions('POST', commentData, false))
        .then(res => res.json());
}

const update = (articleId, updatedArticleData, isFormData) => {
    return fetch(`${baseUrl}/${articleId}/edit`, fetchOptions('PATCH', updatedArticleData, isFormData))
        .then(res => res.json());
}

const remove = (articleId) => {
    return fetch(`${baseUrl}/${articleId}/delete`, fetchOptions('DELETE', {}, false))
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
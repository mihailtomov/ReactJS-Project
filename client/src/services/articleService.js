import buildApiBaseUrl from '../utils/config';

const baseUrl = buildApiBaseUrl('articles');

const fetchOptions = (method, data) => {
    const token = localStorage['auth'];

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    const body = JSON.stringify(data);

    return {
        method,
        headers,
        body
    }
}

const create = (articleData) => {
    return fetch(baseUrl, fetchOptions('POST', articleData))
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
    return fetch(`${baseUrl}/comments`, fetchOptions('POST', commentData))
        .then(res => res.json());
}

const update = (articleId, updatedArticleData) => {
    return fetch(`${baseUrl}/${articleId}/edit`, fetchOptions('PATCH', updatedArticleData))
        .then(res => res.json());
}

const remove = (articleId) => {
    return fetch(`${baseUrl}/${articleId}/delete`, fetchOptions('DELETE', {}))
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
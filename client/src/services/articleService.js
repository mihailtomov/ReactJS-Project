const baseUrl = 'http://localhost:5000/api/articles';

const postOptions = (data) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
}

const create = (articleData) => {
    // Validate data
    return fetch(baseUrl, postOptions(articleData))
        .then(res => res.json())
}

const getAll = (category) => {
    return fetch(`${baseUrl}/${category}`)
        .then(res => res.json());
}

const getOne = (articleId) => {
    return fetch(`${baseUrl}/${articleId}`)
        .then(res => res.json());
}

const articleService = {
    create,
    getAll,
    getOne,
}

export default articleService;
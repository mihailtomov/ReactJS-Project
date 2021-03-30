const baseUrl = 'http://localhost:5000/api/articles';

const create = (articleData) => {
    const token = localStorage['auth'];
    
    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(articleData)
    })
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

const articleService = {
    create,
    getAll,
    getOne,
}

export default articleService;
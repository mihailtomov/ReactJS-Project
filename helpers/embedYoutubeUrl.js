const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}

const embedYoutubeUrl = (youtubeUrl) => {
    const videoId = getYoutubeId(youtubeUrl);

    videoId !== null ?
        youtubeUrl = `https://www.youtube.com/embed/${videoId}` :
        youtubeUrl = 'Invalid'

    return youtubeUrl;
}

module.exports = embedYoutubeUrl;
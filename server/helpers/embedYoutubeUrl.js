const embedYoutubeUrl = (youtubeUrl) => {
    youtubeUrl ?
        youtubeUrl = `https://www.youtube.com/embed/${youtubeUrl.split('=')[1]}` :
        youtubeUrl = ''

    return youtubeUrl;
}

module.exports = embedYoutubeUrl;
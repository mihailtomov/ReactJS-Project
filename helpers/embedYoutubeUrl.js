const embedYoutubeUrl = (youtubeUrl) => {
    youtubeUrl ?
        youtubeUrl = `https://www.youtube.com/embed/${youtubeUrl.split('=')[1].slice(0, 11)}` :
        youtubeUrl = ''

    return youtubeUrl;
}

module.exports = embedYoutubeUrl;
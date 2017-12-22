export function getHeroeImage(heroe) {
    const heroeImagePath = heroe.thumbnail ? heroe.thumbnail.path + '/landscape_large' : null
    const heroeImageType = heroe.thumbnail ? heroe.thumbnail.extension : null
    const heroeImageComp = heroeImagePath ? heroeImagePath + '.' + heroeImageType : null

    if (heroeImageComp) {
        return { uri: heroeImageComp }
    }
    else {
        return require('maheroes/src/resources/no_image.png')
    }
}

export function getHeroeComics(heroe) {
    var comicsNames = []
    const available = heroe.comics.available ? heroe.comics.available : 0

    if (available > 0) {
        const comics = heroe.comics.items

        for (i = 0; i < comics.length; i++) {
            comicsNames = [...comicsNames, comics[i].name + ', ']
        }
    }

    return comicsNames
}

export function getUrl(heroe, urlType) {
    const urls = heroe.urls ? heroe.urls : null

    if (urls) {
        for (i = 0; i < urls.length; i++) {
            // Looking for the key type in the urls array
            if (urls[i].type == urlType) {
                return urls[i].url
            }
        }
    }

    return null
}
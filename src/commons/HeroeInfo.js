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

    if (heroe.comics.available > 0) {
        const comics = heroe.comics.items

        for (i = 0; i < comics.length; i++) {
            comicsNames = [...comicsNames, comics[i].name + ', ']
        }
    }

    return comicsNames
}
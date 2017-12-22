import * as types from '../types/characters'
import { PUBLIC_API_KEY } from 'maheroes/src/webservices/constants'
import { fetch } from 'maheroes/src/webservices/webservices'

function updateCharactersList(list) {
    return {
        type: types.CHARACTER_UPDATE_LIST,
        list
    }
}

function setCharactersFetching(value) {
    return {
        type: types.CHARACTER_SET_FETCHING,
        value
    }
}

export function fetchCharactersList() {

    return (dispatch, getState) => {

        dispatch(setCharactersFetching(true))

        const url = '/characters?apikey=' + PUBLIC_API_KEY
        fetch(url)
            .then( (response) => {
                console.log('RESPONSE: ', response)
                console.log('Heroe: ', response.data.results[1])
                dispatch(setCharactersFetching(false))

                const list = response.data.results
                const count = response.data.count
                const offset = response.data.offset
                dispatch(updateCharactersList(list))
            })
            .catch( (error) => {
                console.log('💩 FETCH_ERROR: ', error)
                dispatch(setCharactersFetching(false))
            })
    }
}

export function updateCharacterSelected(character) {
    return {
        type: types.CHARACTER_UPDATE_CHARACTER,
        character
    }
}


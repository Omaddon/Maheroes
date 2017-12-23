import * as types from '../types/characters'
import { PUBLIC_API_KEY, LIMIT } from 'maheroes/src/webservices/constants'
import { fetch } from 'maheroes/src/webservices/webservices'
import qs from 'qs'

function updateCharactersList(list, total) {
    return {
        type: types.CHARACTER_UPDATE_LIST,
        list,
        total
    }
}

function setCharactersFetching(value) {
    return {
        type: types.CHARACTER_SET_FETCHING,
        value
    }
}

export function updateCharactersListOffset(offset) {
    return {
        type: types.CHARACTER_UPDATE_LIST_OFFSET,
        offset
    }
}

export function initCharactersList() {
    return (dispatch, getState) => {
        // Empty list
        dispatch(updateCharactersList([], 0))
        // Set offset to 0
        dispatch(updateCharactersListOffset(0))
        // Fetch list
        dispatch(fetchCharactersList())

    }
}

export function fetchCharactersList() {

    return (dispatch, getState) => {

        dispatch(setCharactersFetching(true))

        const state = getState()
        const list = state.characters.list
        const offset = state.characters.offset
        const limit = LIMIT

        const filters = {
            offset: offset,
            limit: limit,
            apikey: PUBLIC_API_KEY
        }

        const url = 'characters?' + qs.stringify(filters)
        fetch(url)
            .then( (response) => {
                dispatch(setCharactersFetching(false))

                const newList = [...list, ...response.data.results]
                const total = response.data.total
                dispatch(updateCharactersList(newList, total))
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

export function postHeroe(newHeroe) {
    return {
        type: types.CHARACTER_POST_NEWCHAR,
        newHeroe
    }

    /*
    return (dispatch, getState) => {
        dispatch(setCharactersFetching(true))

        const fetchUrl = ''
        post(fetchUrl, newheroe)
            .then( (response) => {
                dispatch(setCharactersFetching(false))
                if (response) {
                    dispatch(fetchCharactersList())
                    dispatch(updateCharacterSelected(null))
                }
            })
            .catch( (error) => {
                console.log("axios delete error: ", error)
                dispatch(setCharactersFetching(false))
            })
    
    }
    */
}
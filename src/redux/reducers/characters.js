import * as types from '../types/characters'

const initialState = {
    list: [],
    isFecthing: false,
    selected: null,
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.CHARACTER_UPDATE_LIST:
            return {
                ...state,
                list: action.list
            }
        case types.CHARACTER_SET_FETCHING:
            return {
                ...state,
                isFecthing: action.value
            }
        case types.CHARACTER_UPDATE_CHARACTER:
            return {
                ...state,
                selected: action.character
            }
        case types.CHARACTER_POST_NEWCHAR:
            return {
                ...state,
                list: [...state.list, action.newHeroe]
            }
        default:
            return state
    }
}
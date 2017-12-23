import * as types from '../types/characters'

const initialState = {
    list:          [],
    total:          0,
    offset:         0,
    isFetching: false,
    selected:    null,
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.CHARACTER_UPDATE_LIST:
            return {
                ...state,
                list: action.list,
                total: action.total
            }
        case types.CHARACTER_SET_FETCHING:
            return {
                ...state,
                isFetching: action.value
            }
        case types.CHARACTER_UPDATE_LIST_OFFSET:
            return {
                ...state,
                offset: action.offset
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
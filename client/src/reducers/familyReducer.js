import {
    GET_FAMILY,
    CREATE_FAMILY
} from '../actions/types'

const initialState = {
    family: false,
    created: null
}

const familyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FAMILY: 
            return {
                ...state,
                family: action.payload
            }
        case CREATE_FAMILY: 
            return {
                ...state,
                created: action.payload
            }
        default:
            return state
    }
}

export default familyReducer
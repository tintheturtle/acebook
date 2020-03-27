import {
    GET_FAMILY
} from '../actions/types'

const initialState = {
    family: false,
}

const familyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FAMILY: 
            return {
                ...state,
                family: action.payload
            }
        default:
            return state
    }
}

export default familyReducer
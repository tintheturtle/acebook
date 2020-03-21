import { SEND_MESSAGE_TO } from '../actions/types'

const initialMessageState = {
    other: {}
}

const messageReducer = (state = initialMessageState, action ) => {
    switch(action.type) {
        case SEND_MESSAGE_TO:
            return {
                ...state,
                other: action.payload
            }
        default: {
            return state
        }
    }
}

export default messageReducer
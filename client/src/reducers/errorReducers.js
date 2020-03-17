import { GET_ERRORS } from '../actions/types'

const initialErrorState = {}

export default function(state = initialErrorState, action) {
        if (action.type === GET_ERRORS) {
            return action.payload
        }
            return state
}
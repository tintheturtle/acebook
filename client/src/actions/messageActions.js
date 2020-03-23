import { SEND_MESSAGE_TO } from './types'

export const sendMessageTo = (userData) => dispatch => {
    dispatch(setMessageUser(userData))
}

export const setMessageUser = (profile) => {
    return {
        type: SEND_MESSAGE_TO,
        payload: profile
    }
}
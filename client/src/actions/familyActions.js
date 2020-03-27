import axios from 'axios'
import {
    GET_FAMILY,
    GET_ERRORS
} from './types'

export const getFamily = email => async dispatch => {
    await axios
        .get('/api/family', email)
        .then(res => {
            const { family } = res.data
            dispatch({
                type: GET_FAMILY,
                payload: family
            })
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        }))
}

export const setFamily = (family) => {
    return {
        type: GET_FAMILY,
        payload: family
    }
}
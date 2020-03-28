import axios from 'axios'
import {
    GET_FAMILY,
    CREATE_FAMILY,
    GET_ERRORS
} from './types'

export const getFamily = email => async dispatch => {
    await axios
        .post('/api/family', email)
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

export const createFamily = (params) => async dispatch => {
    await axios
        .post('/api/family/create', params)
        .then(res => {
            const { status } = res.data
            dispatch({
                type: CREATE_FAMILY,
                payload: status
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
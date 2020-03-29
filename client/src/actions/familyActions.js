import axios from 'axios'
import {
    GET_FAMILY,
    CREATE_FAMILY,
    GET_ERRORS
} from './types'

export const getFamily = email => async dispatch => {
    await axios
        .post('/api/family/family', email)
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

export const createFamily = newFamily => async dispatch => {
    await axios
        .post('/api/family/create', newFamily)
        .then(res => {
            const { create }  = res.data
            dispatch({
                type: CREATE_FAMILY,
                payload: create
            })
        })
        
}

export const setFamily = (family) => {
    return {
        type: GET_FAMILY,
        payload: family
    }
}
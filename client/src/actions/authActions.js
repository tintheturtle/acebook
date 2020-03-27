import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from './types'

export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

export const loginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data
            const { profile } = res.data
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)
            dispatch(setCurrentUser(profile))
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const setCurrentUser = profile => {
    return {
        type: SET_CURRENT_USER,
        payload: profile
    }
}

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('persist:auth')
    localStorage.removeItem('persist:authReducer')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}
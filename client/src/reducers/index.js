import { combineReducers } from 'redux'
import authReducer from './authReducers'
import errorReducer from './errorReducers'
import messageReducer from './messageReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    message: messageReducer
})
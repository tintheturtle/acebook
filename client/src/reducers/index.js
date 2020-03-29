import { combineReducers } from 'redux'
import authReducer from './authReducers'
import errorReducer from './errorReducers'
import messageReducer from './messageReducer'
import familyReducer from './familyReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    message: messageReducer,
    family: familyReducer
})
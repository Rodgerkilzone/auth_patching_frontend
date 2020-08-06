import {combineReducers} from 'redux'

import token from './token'
import authStatus from './authStatus'
export default combineReducers({ token, authStatus})

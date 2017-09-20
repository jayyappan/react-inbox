import * as types from "../actions/actionTypes";

import { combineReducers } from 'redux'
import messages from './messages'

export default combineReducers({
  messages,
})

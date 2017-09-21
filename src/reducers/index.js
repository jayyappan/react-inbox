import * as types from "../actions/actionTypes";

import { combineReducers } from 'redux'
import messages from './messages'
import toolbar from './toolbar'

export default combineReducers({
  messages,
  toolbar,
})

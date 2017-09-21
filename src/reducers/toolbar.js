import * as types from "../actions/actionTypes";

const initialState = {
  composeState: false,
}

export default (state = initialState, action) => {

  switch (action.type) {
    case types.TOGGLE_COMPOSE:
      return {
        ...state,
        composeState: action.composeState,
      }
    default:
      return state
  }
}

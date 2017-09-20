import * as types from "../actions/actionTypes";

const initialState = {
  all: [],
  selected: {},
}

export default (state = initialState, action) => {

console.log ("messages reducer, state = ", state, ", action = ", action)

  switch (action.type) {
    case types.STAR_CLICKED:
      return {
        ...state,
        all: action.messages,
      }
    case types.FETCH_MESSAGES:
      return {
        ...state,
        all: action.messages,
        selected: action.selected,
      }
    case types.CHECKBOX_CLICKED:
      return {
        ...state,
        selected: action.selected,
      }
    default:
      return state
  }

}

import * as types from "../actions/actionTypes";

const initialState = {
  all: [],
  selected: {},
}

export default (state = initialState, action) => {

  switch (action.type) {
    case types.FETCH_MESSAGES:
      return {
        ...state,
        all: action.messages,
        selected: action.selected,
      }
    case types.CHECKBOX_CLICKED:
    case types.SELECT_UNSELECT_ALL:
      return {
        ...state,
        selected: action.selected,
      }
    case types.STAR_CLICKED:
    case types.MARK_AS_READ:
    case types.MARK_AS_UNREAD:
    case types.APPLY_LABEL:
    case types.REMOVE_LABEL:
    case types.DELETE_MESSAGES:
    case types.CREATE_MESSAGE:
      return {
        ...state,
        all: action.messages,
      }
    default:
      return state
  }

}

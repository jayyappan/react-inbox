import * as types from "../actions/actionTypes";

export const toggleStar = (message) => {
  return async (dispatch) => {
    //dispatch({ type: MESSAGES_REQUEST_STARTED })
    let requestBody = {
      "messageIds": [ message.id ],
      "command": "star",
      "star": !message.starred
    }
    let status = await updateServer(requestBody)
    let messages = await fetchMessges()

    dispatch({
      type: types.STAR_CLICKED,
      messages
    })
  }
}

export const initialLoad = () => {
  return async (dispatch) => {
    let messages = await fetchMessges()
    dispatch({
      type: types.FETCH_MESSAGES,
      messages
    })
  }
}

async function updateServer(requestBody) {
  const response = await fetch ("http://localhost:3001/api/messages", {
    method: 'PATCH',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  return response.status
}

async function fetchMessges() {
  const response = await fetch("http://localhost:3001/api/messages")
  const json = await response.json()
  const messages = json._embedded.messages
  return messages
}

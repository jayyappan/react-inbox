import * as types from "../actions/actionTypes";

export const selectunselectmessages = (select, messages) => {
  return async (dispatch) => {
    let newSelected = {}
    messages.map(message => {
      newSelected[message.id] = select
      return true
    })

    dispatch({
      type: types.SELECT_UNSELECT_ALL,
      selected: newSelected
    })
  }
}

export const markAsRead = (selected, messages) => {
  return async (dispatch) => {
    let messageIds = messages.filter(message => (selected[message.id])).map(message => message.id)
    let requestBody = {
      "messageIds": messageIds,
      "command": "read",
      "read": true
    }

    await updateServer(requestBody)
    let newMessages = await fetchMessges()

    dispatch({
      type: types.MARK_AS_READ,
      messages: newMessages
    })
  }
}

export const markAsUnRead = (selected, messages) => {
  return async (dispatch) => {
    let messageIds = messages.filter(message => (selected[message.id])).map(message => message.id)
    let requestBody = {
      "messageIds": messageIds,
      "command": "read",
      "read": false
    }

    await updateServer(requestBody)
    let newMessages = await fetchMessges()

    dispatch({
      type: types.MARK_AS_UNREAD,
      messages: newMessages
    })
  }
}

export const applyLabel = (selected, messages, newLabel) => {
  return async (dispatch) => {
    let messageIds = messages.filter(message => selected[message.id] && newLabel !== 'Apply label' && !message.labels.some(label => label === newLabel)).map(message => message.id)
    let requestBody = {
      "messageIds": messageIds,
      "command": "addLabel",
      "label": newLabel
    }

    await updateServer(requestBody)
    let newMessages = await fetchMessges()

    dispatch({
      type: types.APPLY_LABEL,
      messages: newMessages
    })
  }
}

export const removeLabel = (selected, messages, removeLabel) => {
  return async (dispatch) => {
    let messageIds = messages.filter(message => selected[message.id] && removeLabel !== 'Remove label' && message.labels.some(label => label === removeLabel)).map(message => message.id)
    let requestBody = {
      "messageIds": messageIds,
      "command": "removeLabel",
      "label": removeLabel
    }

    await updateServer(requestBody)
    let newMessages = await fetchMessges()

    dispatch({
      type: types.REMOVE_LABEL,
      messages: newMessages
    })
  }
}

export const deleteMessages = (selected, messages) => {
  return async (dispatch) => {
    let messageIds = messages.filter(message => (selected[message.id])).map(message => message.id)
    let requestBody = {
      "messageIds": messageIds,
      "command": "delete"
    }

    await updateServer(requestBody)
    let newMessages = await fetchMessges()

    dispatch({
      type: types.DELETE_MESSAGES,
      messages: newMessages
    })
  }
}

export const toggleCompose = (composeState) => {
  return async (dispatch) => {
    let newComposeState = !composeState
    dispatch({
      type: types.TOGGLE_COMPOSE,
      composeState: newComposeState,
    })
  }
}

export const addMessage = (subject, body) => {
  return async (dispatch) => {
    let requestBody = {
      "subject": subject,
      "body": body
    }

    await createMessage(requestBody)
    let messages = await fetchMessges()

    dispatch({
      type: types.TOGGLE_COMPOSE,
      composeState: false
    })

    dispatch({
      type: types.CREATE_MESSAGE,
      messages
    })
  }
}

export const toggleStar = (message) => {
  return async (dispatch) => {
    //dispatch({ type: MESSAGES_REQUEST_STARTED })
    let requestBody = {
      "messageIds": [ message.id ],
      "command": "star",
      "star": !message.starred
    }
    await updateServer(requestBody)
    let messages = await fetchMessges()

    dispatch({
      type: types.STAR_CLICKED,
      messages
    })
  }
}

export const fetchMessageDetail = (id) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:3001/api/messages/${id}`)
    const messageDetail = await response.json()
    // dispatch({
    //   type: types.TOGGLE_COMPOSE,
    //   composeState: false
    // })
    dispatch({
      type: types.MESSAGE_SUBJECT_CLICKED,
      messageDetail
    })
  }
}

export const toggleCheckBox = (id, selected) => {
  return async (dispatch) => {
    let newSelected = {...selected}
    newSelected[id] = !selected[id]
    dispatch({
      type: types.CHECKBOX_CLICKED,
      selected: newSelected
    })
  }
}

export const initialLoad = () => {
  return async (dispatch) => {
    let messages = await fetchMessges()
    let selected = {}
    messages.map(message => {
      selected[message.id] = false
      return false
    })
    dispatch({
      type: types.FETCH_MESSAGES,
      messages,
      selected
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

async function createMessage(requestBody) {
  await fetch ("http://localhost:3001/api/messages", {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
}

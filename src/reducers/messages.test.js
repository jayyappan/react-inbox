import reducer from './messages'
import * as actions from "../actions/actionTypes";
import deepFreeze from 'deep-freeze'

const messages = [
  {
    _links: {
        self: {
        href: "http://localhost:3001/api/messages/1"
      }
    },
    id: 1,
    subject: "You can't input the protocol without calculating the mobile RSS protocol!",
    starred: true,
    read: false,
    labels: [
    "dev",
    "personal"
    ]
  },
{
  _links: {
      self: {
      href: "http://localhost:3001/api/messages/2"
    }
  },
  id: 2,
  subject: "connecting the system won't do anything, we need to input the mobile AI panel!",
  starred: false,
  read: false,
  labels: [ ]
}
]

const selected = {1: true, 2: false}

describe('messages reduces', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      all: [],
      selectedMessageDetail: {},
      selected: {},
    })
  })

  it('should handle FETCH_MESSAGES', () => {
    const currentState = {}


    deepFreeze(currentState)

    expect(
      reducer(currentState, {
        type: actions.FETCH_MESSAGES,
        messages,
        selected,
      })
    ).toEqual({
      all: messages,
      selected,
    })
  })

  it('should handle CHECKBOX_CLICKED', () => {
    const currentState = {}
    deepFreeze(currentState)
    // const selected = {1: true, 2: false}

    expect(
      reducer(currentState, {
        type: actions.CHECKBOX_CLICKED,
        selected,
      })
    ).toEqual({
      selected,
    })
  })

  it('should handle SELECT_UNSELECT_ALL', () => {
    const currentState = {}
    deepFreeze(currentState)
    // const selected = {1: true, 2: false}

    expect(
      reducer(currentState, {
        type: actions.CHECKBOX_CLICKED,
        selected,
      })
    ).toEqual({
      selected,
    })
  })

  it('should handle STAR_CLICKED', () => {
    const currentState = {}
    deepFreeze(currentState)
    // const selected = {1: true, 2: false}

    expect(
      reducer(currentState, {
        type: actions.STAR_CLICKED,
        messages,
      })
    ).toEqual({
      all: messages,
    })
  })

  it('should handle MARK_AS_READ', () => {
    const currentState = {}
    deepFreeze(currentState)
    // const selected = {1: true, 2: false}

    expect(
      reducer(currentState, {
        type: actions.MARK_AS_READ,
        messages,
      })
    ).toEqual({
      all: messages,
    })
  })

  it('should handle MARK_AS_UNREAD', () => {
    const currentState = {}
    deepFreeze(currentState)
    // const selected = {1: true, 2: false}

    expect(
      reducer(currentState, {
        type: actions.MARK_AS_UNREAD,
        messages,
      })
    ).toEqual({
      all: messages,
    })
  })

  it('should handle APPLY_LABEL', () => {
    const currentState = {}
    deepFreeze(currentState)
    // const selected = {1: true, 2: false}

    expect(
      reducer(currentState, {
        type: actions.APPLY_LABEL,
        messages,
      })
    ).toEqual({
      all: messages,
    })
  })

  it('should handle REMOVE_LABEL', () => {
    const currentState = {}
    deepFreeze(currentState)
    // const selected = {1: true, 2: false}

    expect(
      reducer(currentState, {
        type: actions.REMOVE_LABEL,
        messages,
      })
    ).toEqual({
      all: messages,
    })
  })

  it('should handle DELETE_MESSAGES', () => {
    const currentState = {}
    deepFreeze(currentState)
    // const selected = {1: true, 2: false}

    expect(
      reducer(currentState, {
        type: actions.DELETE_MESSAGES,
        messages,
      })
    ).toEqual({
      all: messages,
    })
  })

  it('should handle CREATE_MESSAGE', () => {
    const currentState = {}
    deepFreeze(currentState)
    // const selected = {1: true, 2: false}

    expect(
      reducer(currentState, {
        type: actions.CREATE_MESSAGE,
        messages,
      })
    ).toEqual({
      all: messages,
    })
  })

  it('should handle MESSAGE_SUBJECT_CLICKED', () => {
    const currentState = {}
    deepFreeze(currentState)
    const messageDetail = {id: 1, body: 'body'}

    expect(
      reducer(currentState, {
        type: actions.MESSAGE_SUBJECT_CLICKED,
        messages,
        messageDetail,
      })
    ).toEqual({
      all: messages,
      selectedMessageDetail: messageDetail,
    })
  })

  it('should handle TOGGLE_COMPOSE', () => {
    const currentState = {}
    deepFreeze(currentState)
    const messageDetail = {id: 1, body: 'body'}

    expect(
      reducer(currentState, {
        type: actions.TOGGLE_COMPOSE,
        messages,
        messageDetail,
      })
    ).toEqual({
      selectedMessageDetail: {},
    })
  })

})

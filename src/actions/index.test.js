import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './index'
import * as actionsTypes from './actionTypes'
import fetchMock from 'fetch-mock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const messages = [
    {
      _links: {
        self: {
          href: "http://localhost:8082/api/messages/1"
        }
      },
      id: 1,
      subject: "You can't input the protocol without calculating the mobile RSS protocol!",
      starred: true,
      read: true,
      labels: [
      "dev",
      "personal"
      ]
    },
    {
      _links: {
        self: {
          href: "http://localhost:8082/api/messages/2"
        }
      },
      id: 2,
      subject: "connecting the system won't do anything, we need to input the mobile AI panel!",
      starred: false,
      read: true,
      labels: [ ]
    },
]

describe('sync actions', () => {
  it('creates SELECT_UNSELECT_ALL when the selectunselectmessages action creator is called', () => {

    const expectedActions = [
      { type: actionsTypes.SELECT_UNSELECT_ALL, selected: {1: true, 2: true} }
    ]
    const store = mockStore({ messages: {} })

    store.dispatch(actions.selectunselectmessages(true, messages))

    expect(store.getActions()).toEqual(expectedActions)

  })
})


describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_MESSAGES after the initialLoad', async () => {

    fetchMock.get('end:/api/messages', {
      "_links": {
        "self": {
          "href": "http://localhost:8082/api/messages"
        }
      },
      "_embedded": { messages }
    })

    const expectedActions = [
      { type: actionsTypes.FETCH_MESSAGES, messages, selected: {1: false, 2: false} }
    ]
    const store = mockStore({ messages: {} })

    await store.dispatch(actions.initialLoad())

    expect(store.getActions()).toEqual(expectedActions)
  })
})

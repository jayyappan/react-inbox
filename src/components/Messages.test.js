import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Messages from './Messages'

const messages = {
  all: [
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
}

describe('Message', () => {
  it('renders messages', () => {
    const wrapper = shallow(<Messages.WrappedComponent messages={ messages.all } />)

    expect(wrapper.find('Connect(Message)')).toHaveLength(2)
    expect(wrapper.find('Route').props().path).toBe('/compose')
    expect(wrapper.find('Connect(Message)').get(1).props.message).toHaveProperty('id', 2)
  })
})

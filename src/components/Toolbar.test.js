import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import Toolbar from './Toolbar'

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
  }],
  selected: {1: false, 2: false}
}

describe('Toolbar', () => {
  it('renders toolbar with all the messages not selected and so the buttons are disabled', () => {
    const wrapper = shallow(<Toolbar.WrappedComponent messages={ messages.all } selected={ messages.selected } />)

    expect(wrapper.find('button')).toHaveLength(4)
    expect(wrapper.find('button').get(0).props.children.props.className).toBe('fa fa-square-o')
    expect(wrapper.find('button').get(1).props.disabled).toBe(true)
    expect(wrapper.find('button').get(1).props.children).toBe("Mark As Read")
    expect(wrapper.find('button').get(2).props.disabled).toBe(true)
    expect(wrapper.find('button').get(2).props.children).toBe("Mark As Unread")
    expect(wrapper.find('button').get(3).props.disabled).toBe(true)
  })

  it('renders toolbar with all the messages selected and so the buttons are not disabled', () => {
    messages.selected[1] = true
    messages.selected[2] = true
    const wrapper = shallow(<Toolbar.WrappedComponent messages={ messages.all } selected={ messages.selected } />)

    expect(wrapper.find('button').get(0).props.children.props.className).toBe('fa fa-check-square-o')
    expect(wrapper.find('button').get(1).props.disabled).toBe(false)
    expect(wrapper.find('button').get(2).props.disabled).toBe(false)
    expect(wrapper.find('button').get(3).props.disabled).toBe(false)
  })

  it('renders toolbar with some messages selected and so the select/unslected toolbar is drawn with a - in it', () => {
    messages.selected[1] = true
    messages.selected[2] = false
    const wrapper = shallow(<Toolbar.WrappedComponent messages={ messages.all } selected={ messages.selected } />)

    expect(wrapper.find('button').get(0).props.children.props.className).toBe('fa fa-minus-square-o')
  })

  it('calls all the call back functions', () => {
    messages.selected[1] = true
    messages.selected[2] = false
    const selectunselectmessages = jest.fn()
    const markAsRead = jest.fn()
    const markAsUnRead = jest.fn()
    const applyLabel = jest.fn()
    const removeLabel = jest.fn()
    const deleteMessages = jest.fn()
    const toggleCompose = jest.fn()

    const wrapper = mount(
      <MemoryRouter>
        <Toolbar.WrappedComponent messages={ messages.all }
                                                      selected={ messages.selected }
                                                      markAsRead = { markAsRead}
                                                      markAsUnRead = { markAsUnRead }
                                                      deleteMessages = { deleteMessages }
                                                      selectunselectmessages = { selectunselectmessages }
                                                      applyLabel = { applyLabel }
                                                      removeLabel = { removeLabel }
                                                      toggleCompose = { toggleCompose } />
      </MemoryRouter>)

    // console.log("wrapper.debug=", wrapper.debug())
    // console.log("*****", wrapper.find('Switch'))

    wrapper.find(`[title="Mark as Unread"]`).simulate('click')
    wrapper.find(`[title="Mark as Read"]`).simulate('click')
    wrapper.find(`[title="Delete Messages"]`).simulate('click')
    wrapper.find(`[title="Select/Unselect Messages"]`).simulate('click')
    wrapper.find(`[title="Apply label"]`).simulate('change')
    wrapper.find(`[title="Remove label"]`).simulate('change')
    wrapper.find('Switch').simulate('click')
    expect(markAsUnRead).toHaveBeenCalled()
    expect(markAsRead).toHaveBeenCalled()
    expect(deleteMessages).toHaveBeenCalled()
    expect(selectunselectmessages).toHaveBeenCalled()
    expect(applyLabel).toHaveBeenCalled()
    expect(removeLabel).toHaveBeenCalled()
    expect(toggleCompose).toHaveBeenCalled()
  })

  it('calls the selectunselectmessages call back when the path is /compose', () => {
    messages.selected[1] = true
    messages.selected[2] = false
    const selectunselectmessages = jest.fn()


    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/compose' ]}>
        <Toolbar.WrappedComponent messages={ messages.all }
                                                      selected={ messages.selected }
                                                      selectunselectmessages = { selectunselectmessages } />
      </MemoryRouter>
    )

      wrapper.find(`[title="Select/Unselect Messages"]`).simulate('click')
      expect(selectunselectmessages).toHaveBeenCalled()
  })

  it('calls the selectunselectmessages call back when the path is /messages/id', () => {
    messages.selected[1] = true
    messages.selected[2] = false
    const selectunselectmessages = jest.fn()


    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/messages/1' ]}>
        <Toolbar.WrappedComponent messages={ messages.all }
                                                      selected={ messages.selected }
                                                      selectunselectmessages = { selectunselectmessages } />
      </MemoryRouter>
    )

      wrapper.find(`[title="Select/Unselect Messages"]`).simulate('click')
      expect(selectunselectmessages).toHaveBeenCalled()
  })

  it('renders 0 messages read when no message is read', () => {
    messages.all[0].read = true
    messages.all[1].read = true
    const wrapper = shallow(<Toolbar.WrappedComponent messages={ messages.all } selected={ messages.selected } />)

    // console.log("wrapper.debug=", wrapper.debug())
    // console.log("p=", wrapper.find('p').get(0).props.children[1])
    expect(wrapper.find('p').get(0).props.children[0].props.children).toBe(0)
    expect( wrapper.find('p').get(0).props.children[1]).toBe('unread messages')
    // expect(wrapper.find('button').get(1).props.disabled).toBe(true)
    // expect(wrapper.find('button').get(1).props.children).toBe("Mark As Read")
    // expect(wrapper.find('button').get(2).props.disabled).toBe(true)
    // expect(wrapper.find('button').get(2).props.children).toBe("Mark As Unread")
    // expect(wrapper.find('button').get(3).props.disabled).toBe(true)
  })
})

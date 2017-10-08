import React from 'react';
import Compose from './Compose';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

test('renders the same way every time', () => {
  const tree = renderer.create( <Compose.WrappedComponent /> ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Compose', () => {
  it('renders compose', () => {
    const wrapper = shallow(<Compose.WrappedComponent />)

    expect(wrapper.find('h4').props().children).toBe('Compose Message')
  })

  it('calls the add message call back function on submit', () => {
    const addMessage = jest.fn()
    const history = {push: jest.fn()}
    const wrapper = shallow(<Compose.WrappedComponent addMessage={ addMessage } history={ history } />)

    wrapper.simulate('submit', { preventDefault () {}, target: { subject: {value: 'subject'}, body: {value: 'body'}} });
    expect(addMessage).toHaveBeenCalled()
  })
})

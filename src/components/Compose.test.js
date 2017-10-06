import React from 'react';
import Compose from './Compose';
import renderer from 'react-test-renderer';

test('renders the same way every time', () => {
  const tree = renderer.create( <Compose.WrappedComponent /> ).toJSON();
  expect(tree).toMatchSnapshot();
});

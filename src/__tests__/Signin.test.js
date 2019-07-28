import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Signin from '../components/Signin';
describe('Sign in Page Tests', () => {
  it('renders Sign In template', () => {
    shallow(<Signin />);
  });
});

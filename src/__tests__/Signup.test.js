import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Signup from '../components/Signup';
describe('Sign up Page Tests', () => {
  it('renders Sign Up template', () => {
    shallow(<Signup />);
  });
});

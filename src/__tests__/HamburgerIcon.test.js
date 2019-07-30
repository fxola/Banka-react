import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import HamburgerIcon from '../components/HamburgerIcon';
describe('HamburgerIcon Test', () => {
  it('renders HamburgerIcon component', () => {
    shallow(<HamburgerIcon />);
  });
});

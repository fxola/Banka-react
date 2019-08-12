import React from 'react';
import { shallow } from 'enzyme';

import HamburgerIcon from '../components/HamburgerIcon';
describe('HamburgerIcon Test', () => {
  it('renders HamburgerIcon component', () => {
    shallow(<HamburgerIcon />);
  });
});

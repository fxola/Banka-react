import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../components/Footer';
describe('Footer Test', () => {
  it('renders Footer component', () => {
    shallow(<Footer />);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import LandingPage from '../views/LandingPage';
describe('Landing Page Tests', () => {
  it('renders Landing Page template', () => {
    shallow(<LandingPage />);
  });
});

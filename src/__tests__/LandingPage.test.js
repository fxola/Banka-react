import React from 'react';
import { shallow } from 'enzyme';

import LandingPage from '../views/LandingPage';
describe('Landing Page Tests', () => {
  it('renders Landing Page template', () => {
    shallow(<LandingPage />);
  });
});

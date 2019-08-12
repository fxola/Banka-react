import React from 'react';
import { shallow } from 'enzyme';

import AccountCard from '../components/AccountCard';
describe('Footer Test', () => {
  it('renders AccountCard component', () => {
    const defaultProps = {
      handleView: jest.fn(),
      handleDelete: jest.fn(),
      fullName: 'Some name',
      accountNumber: 102000002,
      ownerEmail: 'owner@gmail.com',
      status: 'active',
      balance: '9000'
    };
    const wrapper = shallow(<AccountCard {...defaultProps} />);
    expect(wrapper.find('#view-account').text()).toBe('View Account');
    expect(wrapper.find('#delete-trigger').text()).toBe('Delete Account');
  });
});

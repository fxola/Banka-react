import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import {
  fetchAccountsRequest,
  fetchAccountsError
} from '../actions/fetchAccountsAction';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  Accounts,
  mapStateToProps,
  mapDispatchToProps
} from '../views/Accounts';
import {
  FETCH_ALL_ACCOUNTS_ERROR,
  FETCH_ALL_ACCOUNTS
} from '../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const renderAccountsPage = args => {
  const defaultProps = {
    fetchAccountsRequest: jest.fn(),
    userAccounts: {},
    history: {},
    match: {}
  };
  const props = { ...defaultProps, ...args };
  return mount(
    <BrowserRouter>
      <Accounts {...props} />
    </BrowserRouter>
  );
};
const token =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nemo';
describe('Accounts Components Tests', () => {
  it('renders Accounts template', () => {
    const wrapper = renderAccountsPage();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('#admin-dashboard-section').length).toBe(1);
  });

  it('should dispatch fetch accounts request action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchAccountsRequest(token);
  });

  it('should show initial state', () => {
    const initialState = {
      userAccounts: {}
    };
    expect(mapStateToProps(initialState).userAccounts).toEqual({});
  });
});

describe('Sign In Actions Tests', () => {
  afterEach(() => {
    store.clearActions();
    global.fetch.mockClear();
    delete global.fetch;
  });
  const store = mockStore();
  it('Should Trigger the FETCH_ALL_ACCOUNTS dispatch function', async () => {
    const mockData = {
      status: 200,
      success: true,
      data: [
        {
          accountNumber: 1026676127,
          avatar: 'uploads/avatar.png',
          balance: '0.00',
          createdOn: '2019-08-13T13:28:28.927Z',
          fullName: 'Meim Hakkas',
          ownerEmail: 'souljah@mail.com',
          status: 'draft',
          type: 'savings'
        }
      ]
    };
    const mockJsonPromise = Promise.resolve(mockData);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    try {
      await fetch();
    } catch (error) {}
    const expectedActions = [
      { type: FETCH_ALL_ACCOUNTS, payload: mockData.data }
    ];
    await store.dispatch(fetchAccountsRequest(token));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should Trigger the FETCH_ALL_ACCOUNTS_ERROR dispatch function on network error', async () => {
    const mockData = {
      stack: 'TypeError: Failed to fetch',
      message: 'Failed To Fetch'
    };
    const mockJsonPromise = Promise.resolve(mockData);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const expectedActions = [
      { type: FETCH_ALL_ACCOUNTS_ERROR, payload: mockData.message }
    ];
    await store.dispatch(fetchAccountsRequest(token));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

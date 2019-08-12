import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { signUpUserRequest, signUpUserError } from '../actions/signUpAction';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Signup, mapStateToProps } from '../views/Signup';
import { SIGN_UP_USER_ERROR, SIGN_UP_USER } from '../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const renderSignUpPage = args => {
  const defaultProps = {
    isLoading: false,
    history: {},
    users: {},
    match: {},
    dispatch: jest.fn()
  };
  const props = { ...defaultProps, ...args };
  return mount(
    <BrowserRouter>
      <Signup {...props} />
    </BrowserRouter>
  );
};

describe('Sign up Components Tests', () => {
  it('renders Sign Up template', () => {
    const wrapper = renderSignUpPage();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('form').length).toBe(1);
  });

  it('Simulates a form submit event', () => {
    const wrapper = renderSignUpPage();
    wrapper.find('form').simulate('submit');
  });

  it('should show initial state', () => {
    const initialState = {
      users: {}
    };
    expect(mapStateToProps(initialState).users).toEqual({});
  });
});

describe('Sign Up Actions Tests', () => {
  afterEach(() => {
    store.clearActions();
    global.fetch.mockClear();
    delete global.fetch;
  });
  const store = mockStore();
  const userDetails = {
    firstName: 'some',
    lastName: 'user',
    email: 'someuser@gmail.com',
    password: 'randompassword'
  };
  it('Should Trigger the SIGN_UP_USER dispatch function', async () => {
    const mockData = {
      success: true,
      data: {
        firstName: 'some',
        lastName: 'user',
        email: 'someuser@gmail.com',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsI…c4OX0.DfJClt28K3qIgJJWp9FMypDO0tKD1NoiNtO9YvEOvsQ'
      }
    };
    const mockJsonPromise = Promise.resolve(mockData);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const expectedActions = [{ type: SIGN_UP_USER, payload: mockData.data }];
    const historyObject = {
      push: jest.fn()
    };
    await store.dispatch(signUpUserRequest(userDetails, historyObject));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should Trigger the SIGN_UP_USER_ERROR dispatch function on network error', async () => {
    const mockData = {
      success: false,
      error: 'Network Error',
      message: 'Failed To Fetch'
    };
    const mockJsonPromise = Promise.resolve(mockData);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const historyObject = {
      push: jest.fn()
    };
    const expectedActions = [
      { type: SIGN_UP_USER_ERROR, payload: mockData.message }
    ];
    await store.dispatch(signUpUserRequest(userDetails, historyObject));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should Trigger the LOG_IN_USER_ERROR dispatch function on API error', async () => {
    const mockData = {
      success: false,
      status: 409,
      message: 'Email Already exists'
    };
    const mockJsonPromise = Promise.resolve(mockData);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const expectedActions = [
      { type: SIGN_UP_USER_ERROR, payload: mockData.message }
    ];
    const historyObject = {
      push: jest.fn()
    };
    await store.dispatch(signUpUserRequest(userDetails, historyObject));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

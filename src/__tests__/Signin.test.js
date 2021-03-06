import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { logInUserRequest, loginUserError } from '../actions/loginAction';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Signin, mapDispatchToProps } from '../views/Signin';
import { LOG_IN_USER, LOG_IN_USER_ERROR } from '../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const renderSignInPage = args => {
  const defaultProps = {
    LoginUserRequest: jest.fn(),
    isLoading: false,
    history: {},
    match: {}
  };
  const props = { ...defaultProps, ...args };
  return mount(
    <BrowserRouter>
      <Signin {...props} />
    </BrowserRouter>
  );
};

describe('Sign in Components Tests', () => {
  it('renders Sign In template', () => {
    const wrapper = renderSignInPage();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('form').length).toBe(1);
  });

  it(`Simulates an onchange event on form email input`, () => {
    const wrapper = renderSignInPage();
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { currentTarget: { value: 'fola@gmail.com' } });
  });

  it(`Simulates an onchange event on form password input`, () => {
    const wrapper = renderSignInPage();
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { currentTarget: { value: 'password' } });
  });
  it('Simulates a form submit event', () => {
    const wrapper = renderSignInPage();
    wrapper.find('form').simulate('submit');
  });

  it('should dispatch login request action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).LoginUserRequest();
  });
});

describe('Sign In Actions Tests', () => {
  afterEach(() => {
    store.clearActions();
    global.fetch.mockClear();
    delete global.fetch;
  });
  const store = mockStore();
  const userCredentials = {
    email: 'someuser@gmail.com',
    password: 'randompassword'
  };

  it('Should Trigger the LOG_IN_USER dispatch function', async () => {
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
    const expectedActions = [{ type: LOG_IN_USER, payload: mockData.data }];
    const historyObject = {
      push: jest.fn()
    };
    await store.dispatch(logInUserRequest(userCredentials, historyObject));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should Trigger the LOG_IN_USER_ERROR dispatch function on network error', async () => {
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
    try {
      await fetch();
    } catch (error) {}
    const historyObject = {
      push: jest.fn()
    };
    const expectedActions = [
      { type: LOG_IN_USER_ERROR, payload: mockData.message }
    ];
    await store.dispatch(logInUserRequest(userCredentials, historyObject));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should Trigger the LOG_IN_USER_ERROR dispatch function on API error', async () => {
    const mockData = {
      success: false,
      error: 'Invalid Credentials Provided'
    };
    const mockJsonPromise = Promise.resolve(mockData);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const expectedActions = [
      { type: LOG_IN_USER_ERROR, payload: mockData.error }
    ];
    const historyObject = {
      push: jest.fn()
    };
    await store.dispatch(logInUserRequest(userCredentials, historyObject));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

import * as types from './actionTypes';
import makeRequest from '../services/apiRequest';
import { checkAuth } from '../services/checkAuth';
export const fetchAccounts = userAccounts => {
  return { type: types.FETCH_ALL_ACCOUNTS, payload: userAccounts };
};

export const fetchAccountsError = error => {
  return { type: types.FETCH_ALL_ACCOUNTS_ERROR, payload: error };
};

export const fetchAccountDetails = accountDetails => {
  return { type: types.FETCH_USER_ACCOUNT_DETAILS, payload: accountDetails };
};

export const fetchAccountDetailsStart = () => {
  return { type: types.FETCH_USER_ACCOUNT_DETAILS_START };
};

export const fetchAccountsRequest = token => {
  return async dispatch => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const response = await makeRequest('/accounts', options);
      if (response.status !== 200) throw response;
      dispatch(fetchAccounts(response.data));
    } catch (error) {
      dispatch(fetchAccountsError(error.message));
    }
  };
};

export const fetchAccountDetailsRequest = accountNumber => {
  return async dispatch => {
    try {
      dispatch(fetchAccountDetailsStart());
      if (!checkAuth) {
        throw {
          msg: 'you need to sign in'
        };
      }
      const user = JSON.parse(localStorage.getItem('user'));
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      const response = await makeRequest(`/accounts/${accountNumber}`, options);
      console.log(response);
      if (response.status !== 200) throw response;
      dispatch(fetchAccountDetails(response.data));
    } catch (error) {
      dispatch(fetchAccountsError(error.message));
    }
  };
};

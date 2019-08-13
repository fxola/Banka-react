import * as types from './actionTypes';
import makeRequest from '../services/apiRequest';
export const fetchAccounts = userAccounts => {
  return { type: types.FETCH_ALL_ACCOUNTS, payload: userAccounts };
};

export const fetchAccountsError = error => {
  return { type: types.FETCH_ALL_ACCOUNTS_ERROR, payload: error };
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

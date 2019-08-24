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

export const makeTransaction = payload => {
  return { type: types.MAKE_TRANSACTION, payload };
};
export const cleanUpTransaction = () => {
  return { type: types.CLEAN_UP_TRANSACTION };
};
export const makeTransactionError = payload => {
  return { type: types.MAKE_TRANSACTION_ERROR, payload };
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
      const user = JSON.parse(localStorage.getItem('user'));
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      const response = await makeRequest(`/accounts/${accountNumber}`, options);
      // console.log(response);
      if (response.status !== 200) throw response;
      dispatch(fetchAccountDetails(response.data));
    } catch (error) {
      dispatch(fetchAccountsError(error.message));
    }
  };
};

export const makeTransactionRequest = (payload, accountNumber) => {
  return async dispatch => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ amount: payload.amount })
      };
      const response = await makeRequest(
        `/transactions/${accountNumber}/${payload.type}`,
        options
      );
      console.log(response);
      if (response.status !== 201) throw response;
      dispatch(makeTransaction(response));
      dispatch(cleanUpTransaction());
    } catch (error) {
      dispatch(makeTransactionError(error.message));
      dispatch(cleanUpTransaction());
    }
  };
};

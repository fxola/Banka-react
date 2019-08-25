import * as types from './actionTypes';
import makeRequest from '../services/apiRequest';
export const createAccount = payload => {
  return { type: types.CREATE_BANK_ACCOUNT, payload };
};

export const createAccountError = payload => {
  return { type: types.CREATE_BANK_ACCOUNT_ERROR, payload };
};

export const fetchClientAccountStart = () => {
  return { type: types.FETCH_BANK_ACCOUNT_START };
};
export const fetchClientAccount = payload => {
  return { type: types.FETCH_BANK_ACCOUNT, payload };
};

export const fetchClientAccountError = payload => {
  return { type: types.FETCH_BANK_ACCOUNT_ERROR, payload };
};

export const createAccountRequest = (type, token) => {
  return async dispatch => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ type })
      };
      const response = await makeRequest(`/accounts`, options);
      if (response.status !== 201) throw response;
      dispatch(createAccount(response));
    } catch (error) {
      dispatch(createAccountError(error.message));
    }
  };
};

export const fetchClientAccountRequest = (email, token) => {
  return async dispatch => {
    try {
      dispatch(fetchClientAccountStart());
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const response = await makeRequest(`/user/${email}/accounts`, options);
      if (response.status !== 200) throw response;
      dispatch(fetchClientAccount(response.data[0]));
    } catch (error) {
      dispatch(fetchClientAccountError(error.message));
    }
  };
};

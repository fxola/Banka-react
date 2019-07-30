import * as types from './actionTypes';
import makeRequest from '../services/apiRequest';
import { toast } from 'react-toastify';
export const signUpUser = user => {
  return { type: types.SIGN_UP_USER, payload: user };
};

export const signUpUserRequest = user => {
  return async dispatch => {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };
    const response = await makeRequest('/auth/signup', option);
    if (!response.success) {
      response.status == 409
        ? toast.error(
            'Email Already Exists. Please provide another email address'
          )
        : toast.error(response.message);
    }
    if (response.success) {
      toast.success(response.message);
      dispatch(signUpUser(response.data));
    }
  };
};

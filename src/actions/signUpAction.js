import * as types from './actionTypes';
import makeRequest from '../services/apiRequest';
import { toast } from 'react-toastify';
export const signUpUser = user => {
  return { type: types.SIGN_UP_USER, payload: user };
};

export const signUpUserError = error => {
  return { type: types.SIGN_UP_USER_ERROR, payload: error };
};

export const signUpUserRequest = (user, history) => {
  return async dispatch => {
    try {
      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      };
      const response = await makeRequest('/auth/signup', option);
      if (!response.success) {
        if (response.error === 'Network Error') throw response;
        response.status == 409
          ? toast.error(
              'Email Already Exists. Please provide another email address'
            )
          : toast.error(response.message);
        dispatch(signUpUserError(response.message));
      }
      if (response.success) {
        toast.success(response.message);
        history.push('/profile');
        dispatch(signUpUser(response.data));
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again');
      dispatch(signUpUserError(error.message));
    }
  };
};

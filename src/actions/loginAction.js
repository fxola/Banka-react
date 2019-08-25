import * as types from './actionTypes';
import makeRequest from '../services/apiRequest';
import { toast } from 'react-toastify';
export const logInUser = user => {
  return { type: types.LOG_IN_USER, payload: user };
};

export const loginUserError = error => {
  return { type: types.LOG_IN_USER_ERROR, payload: error };
};

export const logInUserRequest = (user, history) => {
  return async dispatch => {
    try {
      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      };
      const response = await makeRequest('/auth/signin', option);

      if (!response.success) {
        if (response.error === 'Network Error') throw response;
        toast.error(response.error);
        dispatch(loginUserError(response.error));
      }

      if (response.success) {
        toast.success('Log in Successful');
        localStorage.setItem('user', JSON.stringify(response.data));
        setTimeout(() => {
          /* istanbul ignore next */
          switch (response.data.type) {
            case 'client':
              history.push('/profile');
              break;
            case 'staff':
              history.push('/accounts');
          }
        }, 3000);
        dispatch(logInUser(response.data));
      }
    } catch (error) {
      toast.error(
        'Something went wrong. Please check your Connection and Try Again'
      );
      dispatch(loginUserError(error.message));
    }
  };
};

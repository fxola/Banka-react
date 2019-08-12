import * as types from '../actions/actionTypes';

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SIGN_UP_USER:
      return { ...state, user: action.payload };
    case types.SIGN_UP_USER_ERROR:
      return { ...state, error: action.payload };
    case types.LOG_IN_USER:
      return { ...state, user: action.payload };
    case types.LOG_IN_USER_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;

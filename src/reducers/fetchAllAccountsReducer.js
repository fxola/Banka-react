import * as types from '../actions/actionTypes';

const fetchAccountsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_ALL_ACCOUNTS:
      return { ...state, user: action.payload };
    case types.FETCH_ALL_ACCOUNTS_ERROR:
      return { ...state, error: action.payload };
    case types.FETCH_USER_ACCOUNT_DETAILS_START:
      return { ...state, isLoading: true };
    case types.FETCH_USER_ACCOUNT_DETAILS:
      return { ...state, singleAccount: action.payload, isLoading: false };
    default:
      return state;
  }
};

export default fetchAccountsReducer;

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
    case types.MAKE_TRANSACTION:
      return {
        ...state,
        singleAccount: { ...state.singleAccount, transaction: action.payload }
      };
    case types.CLEAN_UP_TRANSACTION:
      return {
        ...state,
        singleAccount: {
          ...state.singleAccount,
          transaction: { ...state.singleAccount.transaction, message: null }
        }
      };
    case types.MAKE_TRANSACTION_ERROR:
      return {
        ...state,
        singleAccount: {
          ...state.singleAccount,
          transaction: {
            ...state.singleAccount.transaction,
            message: action.payload,
            success: false
          }
        }
      };
    default:
      return state;
  }
};

export default fetchAccountsReducer;

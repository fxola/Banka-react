import * as types from '../actions/actionTypes';
const clientActivityReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_BANK_ACCOUNT:
      return { ...state, newBankAccount: action.payload };
    case types.CREATE_BANK_ACCOUNT_ERROR:
      return {
        ...state,
        newBankAccount: { ...state.newBankAccount, error: action.payload }
      };
    case types.FETCH_BANK_ACCOUNT:
      return {
        ...state,
        isLoading: false,
        existingBankAccount: action.payload
      };
    case types.FETCH_BANK_ACCOUNT_START:
      return { ...state, isLoading: true };
    case types.FETCH_BANK_ACCOUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        existingBankAccount: {
          ...state.bankAccount,
          error: action.payload
        }
      };
    default:
      return state;
  }
};

export default clientActivityReducer;

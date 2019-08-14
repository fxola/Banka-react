import { combineReducers } from 'redux';
import users from './authReducer';
import userAccounts from './fetchAllAccountsReducer';

const rootReducer = combineReducers({
  users,
  userAccounts
});

export default rootReducer;

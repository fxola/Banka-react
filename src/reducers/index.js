import { combineReducers } from 'redux';
import users from './authReducer';
import userAccounts from './staffActivityReducer';
import userDetails from './clientActivityReducer';

const rootReducer = combineReducers({
  users,
  userAccounts,
  userDetails
});

export default rootReducer;

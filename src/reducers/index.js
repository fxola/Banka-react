import { combineReducers } from 'redux';
import users from './authReducer';

const rootReducer = combineReducers({
  users
});

export default rootReducer;

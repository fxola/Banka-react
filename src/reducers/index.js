import { combineReducers } from 'redux';
import users from './signUpReducer';

const rootReducer = combineReducers({
  users 
});

export default rootReducer;

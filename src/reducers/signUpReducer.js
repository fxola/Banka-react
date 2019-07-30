import * as types from '../actions/actionTypes';

const signUpReducer = (state = {}, action) => {
  const id = Object.keys(state).length + 1;
  switch (action.type) {
    case types.SIGN_UP_USER:
      const newState = { ...state };
      newState[id] = { ...action.payload };
      return newState;
    default:
      return state;
  }
};
export default signUpReducer;

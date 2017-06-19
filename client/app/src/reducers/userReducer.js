import { SET_LOGIN_USERS } from '../constants/actionTypes';
import isEmpty from 'lodash/isEmpty';

const signUpUsers = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_USERS': {
      return Object.assign(...state, { user: action.payload });
    }
    default:
      return state;
  }
};
const fetchUsers = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USERS': {
      return Object.assign(...state, { users: action.payload, error: null });
    }
    default:
      return state;
  }
};
const initialState = {
  isAuthenticated: false,
  user: {}
};
const loginUsersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_LOGIN_USERS: {
      return {
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload)
      };
    }
    default:
      return state;
  }
}
export { fetchUsers, signUpUsers, loginUsersReducer };

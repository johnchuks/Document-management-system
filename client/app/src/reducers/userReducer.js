import { SET_LOGIN_USERS, CREATE_USERS, FETCH_USERS } from '../constants/actionTypes';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export const usersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_LOGIN_USERS: {
      return {
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload)
      };
    }
    case CREATE_USERS: {
      return {
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload)
      };
    }
    case FETCH_USERS: {
       return Object.assign(...state, { users: action.payload, error: null });
     }
    default:
      return state;
  }

};

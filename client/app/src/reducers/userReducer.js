import isEmpty from 'lodash/isEmpty';
import { SET_LOGIN_USERS, CREATE_USERS,
  FETCH_USERS, SEARCH_USERS, EDIT_USER } from '../constants/actionTypes';


const initialState = {
  isAuthenticated: false,
  user: {},
  users: {}
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
      return Object.assign({ ...state, users: action.users });
    }
    case SEARCH_USERS: {
      return Object.assign({ ...state, users: action.users });
    }

    case EDIT_USER: {
      return Object.assign(...state, { user: action.payload });
    }
    default:
      return state;
  }
};

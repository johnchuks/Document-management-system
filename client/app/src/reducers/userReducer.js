import { SET_LOGIN_USERS, CREATE_USERS } from '../constants/actionTypes';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
};
// const signUpUsers = (state = initialState, action) => {
//   switch (action.type) {
//     case CREATE_USERS: {
//       return {
//         isAuthenticated: !isEmpty(action.payload),
//         user: action.payload
//       };
//     }
//     default:
//       return state;
//   }
// };
const fetchUsers = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS': {
      return Object.assign(...state, { users: action.payload, error: null });
    }
    default:
      return state;
  }
};

const createUsersReducer = (state = initialState, action = {}) => {
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
    default:
      return state;
  }
};
export { fetchUsers, createUsersReducer };

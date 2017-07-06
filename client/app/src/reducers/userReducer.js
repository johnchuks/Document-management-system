import isEmpty from 'lodash/isEmpty';
import { SET_LOGIN_USERS, CREATE_USERS,
  FETCH_USERS, SEARCH_USERS, EDIT_USER,
  DELETE_USER
} from '../constants/actionTypes';


const initialState = {
  isAuthenticated: false,
  user: {},
  users: {}
};

 /**
 *
 *
 * @param {object} [state=initialState] - sets the intialstate of users
 * @param {object} [action={}] - object payload from the actions
 * @returns {object} - returns users in an object
 */
const usersReducer = (state = initialState, action = {}) => {
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
      return { ...state, users: action.users };
    }
    case SEARCH_USERS: {
      return { ...state, users: action.users };
    }

    case EDIT_USER: {
      return { ...state, user: action.payload };
    }
    case DELETE_USER: {
      const remainingUsers = state.users
        .filter(user => user.id !== action.payload);
      return { ...state, users: remainingUsers };
    }
    default:
      return state;
  }
};
export default usersReducer;

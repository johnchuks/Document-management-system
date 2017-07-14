import isEmpty from 'lodash/isEmpty';
import { SET_AUTH_USERS,
  FETCH_USERS, SEARCH_USERS, EDIT_PROFILE,
  DELETE_USER, GET_USER
} from '../constants/actionTypes';


const initialState = {
  isAuthenticated: false,
  user: {},
  users: [],
  pagination: {}
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
    case SET_AUTH_USERS: {
      return {
        user: action.user,
        isAuthenticated: !isEmpty(action.user)
      };
    }
    case GET_USER: {
      return {
        user: action.user,
        isAuthenticated: !isEmpty(action.user)
      };
    }
    case FETCH_USERS: {
      return { ...state,
        users: action.users.user,
        pagination: action.users.pagination
      };
    }
    case SEARCH_USERS: {
      return { ...state,
        users: action.users.user,
        pagination: action.users.pagination.pageCount
      };
    }

    case EDIT_PROFILE: {
      return {
        user: action.user,
        isAuthenticated: !isEmpty(action.user)
      };
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

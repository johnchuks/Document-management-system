import isEmpty from 'lodash/isEmpty';
import { SET_AUTH_USERS, SET_AUTH_USERS_ERROR, FETCH_USERS_ERROR,
  FETCH_USERS, SEARCH_USERS, SEARCH_USERS_ERROR, EDIT_PROFILE,
  DELETE_USER, GET_USER
} from '../constants/actionTypes';


const initialState = {
  isAuthenticated: false,
  user: {},
  users: [],
  pagination: {},
  error: {}
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
      return { ...state,
        user: action.user,
        isAuthenticated: !isEmpty(action.user),
        error: {}
      };
    }
    case GET_USER: {
      return { ...state,
        user: action.user,
        isAuthenticated: !isEmpty(action.user),
        error: {}
      };
    }
    case FETCH_USERS: {
      return { ...state,
        users: action.users.user,
        pagination: action.users.pagination,
        error: {}
      };
    }
    case SEARCH_USERS: {
      return { ...state,
        users: action.users.user,
        pagination: action.users.pagination,
        error: {}
      };
    }

    case EDIT_PROFILE: {
      return { ...state,
        user: action.user,
        isAuthenticated: !isEmpty(action.user)
      };
    }
    case DELETE_USER: {
      const remainingUsers = state.users
        .filter(user => user.id !== action.payload);
      return { ...state, users: remainingUsers };
    }
    case SEARCH_USERS_ERROR:
    case FETCH_USERS_ERROR:
    case SET_AUTH_USERS_ERROR:
      return { ...state,
        error: action.error,
        users: []
      };

    default:
      return state;
  }
};
export default usersReducer;

import axios from 'axios';
import { createUser, loginUsers } from '../api/Api';
import { CREATE_USERS, FETCH_USERS, LOGIN_USERS } from '../constants/actionTypes';

const signupAction = (userData) => {
  return createUser(userData)
    .then(result => ({
      type: CREATE_USERS,
      payload: result
    }));
};

const fetchUserAction = () => ({
  type: FETCH_USERS,
  payload: axios.get('/api/users').then(response => response.data)
});

const loginAction = (user) => {
  return loginUsers(user).then((response) => {
    return {
      type: LOGIN_USERS,
      payload: response
    };
  });
};

export { signupAction, fetchUserAction, loginAction };


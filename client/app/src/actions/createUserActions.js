import axios from 'axios';
import { createUser } from '../api/Api';
import { CREATE_USERS, FETCH_USERS } from '../constants/actionTypes';

export const signupAction = (userData) => createUser(userData)
  .then(result => ({
    type: CREATE_USERS,
    payload: result
  }));

export const fetchUserAction = () => ({
  type: FETCH_USERS,
  payload: axios.get('/api/users').then(response => response.data)
});


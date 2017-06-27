import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { CREATE_USERS, FETCH_USERS, SET_LOGIN_USERS, SEARCH_USERS, EDIT_PROFILE } from '../constants/actionTypes';
import Authorization from '../../utils/authorization';

const fetchUserAction = users => ({
  type: FETCH_USERS,
  users,
});
const fetchUser = () => (dispatch) => {
  return axios.get('/api/users').then((response) => {
    dispatch(fetchUserAction(response.data.rows));
  });
};
const searchUserAction = (users) => {
  return {
    type: SEARCH_USERS,
    users
  }
}
const searchUser = (params) => (dispatch) => {
  return axios.get(`/api/search/users/?q=${params.searchString}`).then((response) => {
    dispatch(searchUserAction(response.data.rows));
  }).catch(error => error);
}
const createUserAction = user => ({
  type: CREATE_USERS,
  payload: user
});
const signupAction = userData => (dispatch) => {
  return axios.post('/users', userData).then((response) => {
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    Authorization.setAuthToken(token);
    dispatch(createUserAction(jwtDecode(token)));
  }).catch(error => error);
};

const setLoginUser = user => ({
  type: SET_LOGIN_USERS,
  payload: user
});

const loginAction = user => (dispatch) => {
  return axios.post('/users/login', user).then((response) => {
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    Authorization.setAuthToken(token);
    dispatch(setLoginUser(jwtDecode(token)));
  }).catch(error => (error));
};
const editProfileAction = user => ({
  type: EDIT_PROFILE,
  payload: user
});
const editProfile = (user) => {
  const id = user.userId;
  return dispatch => axios.put(`/api/users/${id}`, user).then((response) => {
    dispatch(editProfileAction(response.data));
  });
};


export { signupAction, fetchUser, loginAction, setLoginUser, createUserAction, editProfile, searchUser };


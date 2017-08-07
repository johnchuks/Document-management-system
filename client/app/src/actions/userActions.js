import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { FETCH_USERS, FETCH_USERS_ERROR,
   SET_AUTH_USERS, SET_AUTH_USERS_ERROR
  , SEARCH_USERS, SEARCH_USERS_ERROR,
  EDIT_PROFILE, EDIT_PROFILE_ERROR,
    DELETE_USER, DELETE_USER_ERROR,
    GET_USER, GET_USER_ERROR } from '../constants/actionTypes';
import Authorization from '../../utils/authorization';

/**
 * @return {array} - array of users
 * dispatches the fetch users payload to the reducer
 * @param {array} users - array of users
 */
const fetchUserSuccess = users => ({
  type: FETCH_USERS,
  users,
});

/**
 *
 * @return {object} - error
 * @param {object} error dispatched error object
 */
const fetchUserError = error => ({
  type: FETCH_USERS_ERROR,
  error
});
/**
 *  @return {array} - array of users
 * fetches all users from the server side
 */
const fetchUser = ({ limit, offset }) => dispatch =>
  axios.get(`/api/v1/users/?limit=${limit}&offset=${offset}`)
    .then((response) => {
      dispatch(fetchUserSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchUserError(error.response.data));
    });

/**
 * @return {array} - array of users
 * sends the array of users to the reducer
 * @param {array} users - array of search users
 */
const searchUserSuccess = users => ({
  type: SEARCH_USERS,
  users
});

/**
 *
 * @return {object} error
 * @param {object} error dispatched error object
 */
const searchUserError = error => ({
  type: SEARCH_USERS_ERROR,
  error
});
/**
 * @return {array} - array of users
 *sends a search string as a query to retrieve search results
 * @param {object} params - searchstring as a param
 */
const searchUser = ({ offset, searchString, limit }) =>
dispatch => axios.get(`/api/v1/search/users/?
q=${searchString}&limit=${limit}&offset=${offset}`)
  .then((response) => {
    dispatch(searchUserSuccess(response.data));
  }).catch((error) => {
    dispatch(searchUserError(error.response.data));
  });

/**
 * @return {object} - an object of created user
 * sends created user response as a payload to the reducer
 * @param {object} user - created user payload
 */
const setAuthUser = user => ({
  type: SET_AUTH_USERS,
  user
});
/**
 *
 * @return {object} error
 * @param {error} error - dispatched error object
 */
const setAuthUserError = error => ({
  type: SET_AUTH_USERS_ERROR,
  error
});


/**
 * @return {object} - created user from the server side
 * sends an object of the created user and returns an auth token for the user
 * @param {object} userData - userdetails to be registered
 */
const signupAction = userData => dispatch =>
axios.post('/api/v1/users', userData).then((response) => {
  const token = response.data.token;
  localStorage.setItem('jwtToken', token);
  Authorization.setAuthToken(token);
  dispatch(setAuthUser(jwtDecode(token)));
}).catch((error) => {
  dispatch(setAuthUserError(error.response.data));
});

/**
 * @return {object} - returns an object of logged in user
 *sends the decoded user payload to the reducer
 * @param {object} user - logged in user payload
 */

/**
 *  @return {object} - array of users
 * sends the users details to be verified before proceeding
 * @param {object} user - logged in user payload
 */
const loginAction = user => dispatch =>
axios.post('/api/v1/users/login', user).then((response) => {
  const token = response.data.token;
  localStorage.setItem('jwtToken', token);
  Authorization.setAuthToken(token);
  dispatch(setAuthUser(jwtDecode(token)));
}).catch((error) => {
  dispatch(setAuthUserError(error.response.data));
  return error;
});

/**
 *
 *
 * @param {object} user -  dispatched object
 * containing the user details
 * @returns {object} - user object obtained from the server
 */
const getUserSuccess = user => ({
  type: GET_USER,
  user
});

/**
 *
 * @return {object} - error
 * @param {object} error dispatched error object
 */
const getUserError = error => ({
  type: GET_USER_ERROR,
  error
});
/**
 *
 *
 * @param {number} profileId - id of the requested user
 * @returns {object} requested user object
 */
const getUser = profileId => dispatch =>
 axios.get(`/api/v1/users/${profileId}`).then((response) => {
   dispatch(getUserSuccess(response.data[0]));
 }).catch((error) => {
   dispatch(getUserError(error.response.data));
 });

/**
 *  @return {object} - an object of edited user
 * dispatches the updated user to the reducer
 * @param {object} user - edited user payload
 */
const editProfileSuccess = user => ({
  type: EDIT_PROFILE,
  user
});

/**
 *
 * @return {object} - error
 * @param {object} error - dispatched error object
 */
const editProfileError = error => ({
  type: EDIT_PROFILE_ERROR,
  error
});

/**
 *
 * update logged in user with the current user detail supplied
 * @param {object} user - id of the user and payload
 * @returns {object} an updated user details in an object
 */
const editProfile = (user) => {
  const id = user.userId;
  return dispatch =>
    axios.put(`/api/v1/users/${id}`, user).then().then((response) => {
      dispatch(editProfileSuccess(response.data));
    })
  .catch((error) => {
    dispatch(editProfileError(error.response.data));
    return error;
  });
};

/**
 *
 * dispatches the deleted user id to the reducer to update the state
 * @param {number} user - user id of the deleted user
 * @returns {object} payload container the user id of the deleted user
 */
const deleteUserSuccess = user => ({
  type: DELETE_USER,
  payload: user
});

/**
 *
 * @return {object} - error
 * @param {object} error - dispatched error object
 */
const deleteUserError = error => ({
  type: DELETE_USER_ERROR,
  error
});

/**
 *
 *Performs a delete request of a user taking in the user id as a param
 * @param {number} user - deleted user id
 * @returns {null} - null
 */
const deleteUser = user => dispatch =>
  axios.delete(`/api/v1/users/${user}`).then(() => {
    dispatch(deleteUserSuccess(user));
    dispatch(fetchUser({ limit: 4, offset: 0 }));
  }).catch((error) => {
    dispatch(deleteUserError(error));
  });


export { signupAction, fetchUser, getUser, getUserSuccess,
   loginAction, setAuthUser, fetchUserSuccess,
   editProfile, searchUser, deleteUser,
   deleteUserSuccess, editProfileSuccess, searchUserSuccess
};


import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { FETCH_USERS, SET_AUTH_USERS
  , SEARCH_USERS, EDIT_PROFILE, DELETE_USER } from '../constants/actionTypes';
import Authorization from '../../utils/authorization';

/**
 * @return {array} - array of users
 * dispatches the fetch users payload to the reducer
 * @param {array} users - array of users
 */
const fetchUserAction = users => ({
  type: FETCH_USERS,
  users,
});

/**
 *  @return {array} - array of users
 * fetches all users from the server side
 */
const fetchUser = () => dispatch =>
 axios.get('/api/users').then((response) => {
   dispatch(fetchUserAction(response.data.rows));
 });

/**
 * @return {array} - array of users
 * sends the array of users to the reducer
 * @param {array} users - array of search users
 */
const searchUserAction = users => ({
  type: SEARCH_USERS,
  users
});

/**
 * @return {array} - array of users
 *sends a search string as a query to retrieve search results
 * @param {object} params - searchstring as a param
 */
const searchUser = params => dispatch =>
axios.get(`/api/search/users/?q=${params.searchString}`)
  .then((response) => {
    dispatch(searchUserAction(response.data.rows));
  }).catch(error => error);

/**
 * @return {object} - an object of created user
 * sends created user response as a payload to the reducer
 * @param {object} user - created user payload
 */
// const createUserAction = user => ({
//   type: CREATE_USERS,
//   payload: user
// });
const setAuthUser = user => ({
  type: SET_AUTH_USERS,
  user
});


/**
 * @return {object} - created user from the server side
 * sends an object of the created user and returns an auth token for the user
 * @param {object} userData - userdetails to be registered
 */
const signupAction = userData => dispatch =>
axios.post('/users', userData).then((response) => {
  const token = response.data.token;
  localStorage.setItem('jwtToken', token);
  Authorization.setAuthToken(token);
  dispatch(setAuthUser(jwtDecode(token)));
}).catch(error => error);

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
axios.post('/users/login', user).then((response) => {
  const token = response.data.token;
  localStorage.setItem('jwtToken', token);
  Authorization.setAuthToken(token);
  dispatch(setAuthUser(jwtDecode(token)));
}).catch(error => (error));

/**
 *  @return {object} - an object of edited user
 * dispatches the updated user to the reducer
 * @param {object} user - edited user payload
 */
const editProfileAction = user => ({
  type: EDIT_PROFILE,
  payload: user
});
/**
 *
 * update logged in user with the current user detail supplied
 * @param {object} user - id of the user and payload
 * @returns {object} an updated user details in an object
 */
const editProfile = (user) => {
  const id = user.userId;
  return dispatch => axios.put(`/api/users/${id}`, user).then((response) => {
    dispatch(editProfileAction(response.data));
  }).catch(error => error);
};

/**
 *
 * dispatches the deleted user id to the reducer to update the state
 * @param {number} user - user id of the deleted user
 * @returns {object} payload container the user id of the deleted user
 */
const deleteUserAction = user => ({
  type: DELETE_USER,
  payload: user
});

/**
 *
 *Performs a delete request of a user taking in the user id as a param
 * @param {number} user - deleted user id
 * @returns {null} - null
 */
const deleteUser = user => dispatch =>
  axios.delete(`api/users/${user}`).then(() => {
    dispatch(deleteUserAction(user));
  }).catch(error => error);


export { signupAction, fetchUser,
   loginAction, setAuthUser, fetchUserAction, editProfile, searchUser, deleteUser, deleteUserAction, editProfileAction };


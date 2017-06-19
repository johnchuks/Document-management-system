import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { CREATE_USERS, FETCH_USERS, SET_LOGIN_USERS } from '../constants/actionTypes';
import Authorization from '../../utils/authorization';


const fetchUserAction = () => ({
  type: FETCH_USERS,
  payload: axios.get('/api/users').then(response => response.data)
});

const createUserAction = (user) => {
  return {
    type: CREATE_USERS,
    payload: user
  };
};
const signupAction = (userData) => {
  return (dispatch) => {
    return axios.post('/users', userData).then((response) => {
      const token = response.data.token;
      console.log(token);
      localStorage.setItem('jwtToken', JSON.stringify(token));
      Authorization.setAuthToken(token);
      dispatch(createUserAction(jwtDecode(token)));
    }).catch(error => error);
  };
};

const setLoginUser = (user) => {
  return {
    type: SET_LOGIN_USERS,
    payload: user
  };
};

const loginAction = (user) => {
  return (dispatch) => {
    return axios.post('/users/login', user).then((response) => {
      const token = response.data.token;
      localStorage.setItem('jwtToken', JSON.stringify(token));
      Authorization.setAuthToken(token);
      dispatch(setLoginUser(jwtDecode(token)));
    }).catch(error => (error));
  };
};


export { signupAction, fetchUserAction, loginAction, setLoginUser, createUserAction };


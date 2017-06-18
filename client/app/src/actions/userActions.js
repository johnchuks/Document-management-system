import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { createUser } from '../api/Api';
import { CREATE_USERS, FETCH_USERS, SET_LOGIN_USERS } from '../constants/actionTypes';
import Authorization from '../../utils/authorization';


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

const setLoginUser = (user) => {
  return {
    type: SET_LOGIN_USERS,
    payload: user
  }
};

const loginAction = (user) => {
  return (dispatch) => {
    return axios.post('/users/login', user).then((response) => {
      const token = response.data.token;
      localStorage.setItem('jwtToken', JSON.stringify(token));
      Authorization.setAuthToken(token);
      dispatch(setLoginUser(jwtDecode(token)));
    }).catch(error => (error));
  }
};


export { signupAction, fetchUserAction, loginAction, setLoginUser };


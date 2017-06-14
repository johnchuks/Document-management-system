import { createUser } from '../api/Api';

export const CREATE_USER = 'CREATE_USER'

const signupAction = (userData) => createUser(userData)
  .then(result => ({
    type: 'CREATE_USER',
    payload: result
  }));
export default signupAction;

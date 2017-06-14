import { createUser } from '../api/Api';

export const CREATE_FLASH_MESSAGES = 'CREATE_FLASH_MESSAGES';

const signupAction = (userData) => createUser(userData)
  .then(result => ({
    type: 'CREATE_FLASH_MESSAGES',
    payload: result
  }));
export default signupAction;

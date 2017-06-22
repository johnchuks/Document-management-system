import axios from 'axios';

class Authorization {
  static setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common['x-access-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-access-token'];
    }
  };
}
export default Authorization;

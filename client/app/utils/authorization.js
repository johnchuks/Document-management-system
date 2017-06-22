import axios from 'axios';

class Authorization {
  static setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };
}
export default Authorization;

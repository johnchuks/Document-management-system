import axios from 'axios';

export const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const url = '/users';
    axios.post(url, userData)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
  });
};


import axios from 'axios';

export const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const url = '/users';
    axios.post(url, userData)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
  });
};
export const fetchUsers = () => {
  const url = '/api/users';
  return axios.get(url)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => error);
};

export const loginUsers = (user) => {
  return new Promise((resolve, reject) => {
    axios.post('/users/login', user)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};


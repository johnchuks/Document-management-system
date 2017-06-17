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

export const createDocument = (document) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/documents', document)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};


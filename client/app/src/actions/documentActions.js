import axios from 'axios';
import { CREATE_DOCUMENT } from '../constants/actionTypes';

const createDocumentAction = (document) => {
  return {
    type: CREATE_DOCUMENT,
    document,
  };
};
const createDocument = (document) => {
  return (dispatch) => {
    return axios.post('/api/documents', document).then((response) => {
      const documentData = response.data;
      dispatch(createDocumentAction(documentData));
    });
  };
};
const fetchDocumentAction = (userId) => {
  return axios.get(`/api/users/${userId}/documents`).then((response) => {
    return response.data;
  });
};
export { createDocumentAction, createDocument, fetchDocumentAction };


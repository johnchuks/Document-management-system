import axios from 'axios';
import { CREATE_DOCUMENT, FETCH_USER_DOCUMENTS, FETCH_ALL_DOCUMENTS } from '../constants/actionTypes';

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
const fetchAllDocumentsAction = (documents) => {
  return {
    type: FETCH_ALL_DOCUMENTS,
    payload: documents
  };
};
const fetchAllDocuments = () => {
  return (dispatch) => {
    return axios.get('/api/documents').then((response) => {
      const documents = response.data;
      dispatch(fetchAllDocumentsAction(documents));
    });
  }
}
const fetchDocumentAction = (document) => {
  return {
    type: FETCH_USER_DOCUMENTS,
    payload: document
  };
};
const fetchDocument = (userId) => {
  return (dispatch) => {
    return axios.get(`/api/users/${userId}/documents`).then((response) => {
      const userDocuments = response.data;
      dispatch(fetchDocumentAction(userDocuments));
    });
  };
};

export { createDocumentAction, createDocument, fetchDocumentAction, fetchDocument, fetchAllDocuments, fetchAllDocumentsAction };


import axios from 'axios';
import { CREATE_DOCUMENT, FETCH_USER_DOCUMENTS, FETCH_ALL_DOCUMENTS, DELETE_DOCUMENT } from '../constants/actionTypes';

const createDocumentAction = (document) => {
  return {
    type: CREATE_DOCUMENT,
    document,
  };
};
const fetchAllDocumentsAction = (documents) => {
  return {
    type: FETCH_ALL_DOCUMENTS,
    payload: documents
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
const fetchAllDocuments = () => {
  return (dispatch) => {
    const token = localStorage.getItem('jwtToken');
    return axios.get('/api/documents', {
      headers: {
        authorization: token
      }
    }).then((response) => {
      const documents = response.data;
      dispatch(fetchAllDocumentsAction(documents));
    });
  };
};
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
const updateDocument = (document) => {
  return (dispatch) => {
    return axios.put(`/api/documents/${documentId}`, document).then((response) => {
     return response.data;
    });
  }
}
const deleteDocumentAction = (documentId) => {
  return {
    type: DELETE_DOCUMENT,
    payload: documentId
  }
}
const deleteDocument = (document) => {
  return (dispatch) => {
    return axios.delete(`api/documents/${document.documentId}`).then(() => {
      dispatch(deleteDocumentAction(document.documentId));
    });
  };
};


export { createDocumentAction,
   createDocument, fetchDocumentAction,
  fetchDocument, fetchAllDocuments,
  fetchAllDocumentsAction, updateDocument, deleteDocument };


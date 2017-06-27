import axios from 'axios';
import { CREATE_DOCUMENT, FETCH_USER_DOCUMENTS, FETCH_ALL_DOCUMENTS, DELETE_DOCUMENT,
UPDATE_DOCUMENT, SEARCH_DOCUMENT } from '../constants/actionTypes';

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
const fetchAllDocuments = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem('jwtToken');
    return axios.get(`/api/documents/?limit=${params.limit}&?offset=${params.offset}`, {
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
const updateDocumentAction = (document) => {
  return {
    type: UPDATE_DOCUMENT,
    document
  };
};
const updateDocument = (document) => {
  const documentId = document.documentId;
  return (dispatch) => {
    return axios.put(`/api/documents/${documentId}`, document).then((response) => {
      dispatch(updateDocumentAction(response.data));
      return response;
    });
  };
};
const deleteDocumentAction = (documentId) => {
  return {
    type: DELETE_DOCUMENT,
    payload: documentId
  };
};
const deleteDocument = (document) => {
  return (dispatch) => {
    return axios.delete(`api/documents/${document.documentId}`).then(() => {
      dispatch(deleteDocumentAction(document.documentId));
    });
  };
};
const searchDocumentAction = (searchDocuments) => {
  return {
    type: SEARCH_DOCUMENT,
    searchDocuments,
  }
};
const searchDocument = (search) => {
  const title = search.searchString;
  return (dispatch) => {
    return axios.get(`api/search/documents/?q=${title}`).then((response) => {
      dispatch(searchDocumentAction(response.data));
    }).catch(error => error);
  };
};


export { createDocumentAction,
   createDocument, fetchDocumentAction,
  fetchDocument, fetchAllDocuments,
  fetchAllDocumentsAction, updateDocument, searchDocument, deleteDocument };


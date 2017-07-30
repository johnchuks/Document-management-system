/* eslint max-len:off */
import axios from 'axios';
import { CREATE_DOCUMENT, CREATE_DOCUMENT_ERROR,
   FETCH_USER_DOCUMENTS,
   FETCH_USER_DOCUMENTS_ERROR, FETCH_ALL_DOCUMENTS_ERROR,
   FETCH_ALL_DOCUMENTS, DELETE_DOCUMENT, DELETE_DOCUMENT_ERROR,
UPDATE_DOCUMENT, UPDATE_DOCUMENT_ERROR,
SEARCH_DOCUMENT, SEARCH_DOCUMENT_ERROR } from '../constants/actionTypes';

/**
 *@return {object} - object of created document
 *Dispatches created document to the reducer
 * @param {object} document - created document
 *
 */
const createDocumentSuccess = document => ({
  type: CREATE_DOCUMENT,
  document,
});

/**
 *
 * @return{object} - error object for unsuccessful document
 * creation
 * @param {object} error - object of error message
 */
const createDocumentError = error => ({
  type: CREATE_DOCUMENT_ERROR,
  error
});
/**
 * @return {array} - returns array of documents
 *  dispatches all document in an array to the reducer
 * @param {array} documents - fetched documents
 */
const fetchAllDocumentsSuccess = documents => ({
  type: FETCH_ALL_DOCUMENTS,
  payload: documents
});

/**
 *
 * @return {object} - error object
 * @param {object} error - error object
 */
const fetchAllDocumentsError = error => ({
  type: FETCH_ALL_DOCUMENTS_ERROR,
  error
});

/**
 *
 * @return {object} - error object
 * @param {object} error - dispatched error object
 */
const fetchDocumentError = error => ({
  type: FETCH_USER_DOCUMENTS_ERROR,
  error
});

/**
 * @return {array} - array of users document
 * dispatch fetchDocument payload to the reducer
 * @param {array} document - fetched user document
 */
const fetchDocumentSuccess = document => ({
  type: FETCH_USER_DOCUMENTS,
  payload: document
});

/**
 * @return {array} - array of fetched documents
 *fetches all user documents with the limit and offsets as queries
 * @param {object} user - an object containing the id and offsets limits
 */
const fetchDocument = ({ limit, offset, id }) => dispatch =>
axios.get(`/api/v1/users/${id}/documents/
?limit=${limit}&offset=${offset}`)
.then((response) => {
  const userDocuments = response.data;
  dispatch(fetchDocumentSuccess(userDocuments));
}).catch((error) => {
  dispatch(fetchDocumentError(error.response.data));
});

/**
 *
 * @return {object} - error object
 * @param {object} error - dispatched error object
 */
const updateDocumentError = error => ({
  type: UPDATE_DOCUMENT_ERROR,
  error
});

/**
 *
 * @return {object} - error object
 * @param {object} error dispatched error object
 */
const deleteDocumentError = error => ({
  type: DELETE_DOCUMENT_ERROR,
  error
});

/**
 *
 * @return {object} - error object
 * @param {object} error - dispatched error object
 */
const searchDocumentError = error => ({
  type: SEARCH_DOCUMENT_ERROR,
  error
});
/**
 * @return {object} - newly created document
 * makes an api post request of the document object
 * @param {object} document - document payload to be created
 */
const createDocument = document => dispatch =>
axios.post('/api/v1/documents', document).then((response) => {
  const documentData = response.data;
  const id = documentData.userId;
  dispatch(createDocumentSuccess(documentData));
  dispatch(fetchDocument({ id, limit: 6, offset: 0 }));
}).catch((error) => {
  dispatch(createDocumentError(error.response.data));
});

/**
 * @return {array} - array of documents with pagination
 * fetches all document with the limit and offet as queries
 * @param {object} params - limits and offset as queries
 */

const fetchAllDocuments = ({ offset, limit }) => dispatch => axios
  .get(`/api/v1/documents/?limit=${limit}&offset=${offset}`)
  .then((response) => {
    const documents = response.data;
    dispatch(fetchAllDocumentsSuccess(documents));
  }).catch((error) => {
    dispatch(fetchAllDocumentsError(error.response.data));
  });


/**
 * @return {object} - updated document
 * dispatches the update document payload to the reducer
 * @param {object} document - updated document
 */
const updateDocumentSuccess = document => ({
  type: UPDATE_DOCUMENT,
  document
});

/**
 *
 * updates the document with a put request container the document id
 * @param {object} document - contains the document id
 * @returns {func} dispatch action method
 */
const updateDocument = (document) => {
  const documentId = document.documentId;
  return dispatch => axios.put(`/api/v1/documents/${documentId}`, document)
  .then((response) => {
    dispatch(updateDocumentSuccess(response.data));
  }).catch((error) => {
    dispatch(updateDocumentError(error.response.data));
  });
};

/**
 * @return {number} document id of deleted document
 * dispatch the deleted document id to the reducer
 * @param {number} documentId - document id of deleted document
 */
const deleteDocumentSuccess = documentId => ({
  type: DELETE_DOCUMENT,
  documentId
});

/**
 * @return {object} - deleted document id
 * performs a delete document request to the server
 * @param {object} documentId - document to be deleted
 */
const deleteDocument = ({ documentId, userId }) => dispatch =>
 axios.delete(`/api/v1/documents/${documentId}`).then(() => {
   const id = userId;
   dispatch(deleteDocumentSuccess(documentId));
   dispatch(fetchDocument({ id, limit: 6, offset: 0 }));
 }).catch((error) => {
   dispatch(deleteDocumentError(error.response.data));
 });

/**
 * @return {array} - searched documents payload
 * dispatches the searchResults to the reducer
 * @param {object} searchDocuments - array of searched documents
 */
const searchDocumentSuccess = searchDocuments => ({
  type: SEARCH_DOCUMENT,
  searchDocuments,
});
/**
 * @return {array} - searched documents payload
 * performs a get request for the title searched for
 * @param {object} search - search input
 * @returns {func} a dispatch function that makes an api call to the server
 */
const searchDocument = ({ offset, searchString, limit }) =>
  dispatch =>
    axios
      .get(`/api/v1/search/documents/?q=${searchString}&limit=${limit}&offset=${offset}`)
  .then((response) => {
    dispatch(searchDocumentSuccess(response.data));
  }).catch((error) => {
    dispatch(searchDocumentError(error.response.data));
  });


export { createDocumentSuccess,
   createDocument, fetchDocumentSuccess,
  fetchDocument, fetchAllDocuments, deleteDocumentSuccess,
  fetchAllDocumentsSuccess, updateDocument,
  updateDocumentSuccess, searchDocument, deleteDocument
};


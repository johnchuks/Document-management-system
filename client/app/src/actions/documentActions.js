import axios from 'axios';
import { CREATE_DOCUMENT, FETCH_USER_DOCUMENTS,
   FETCH_ALL_DOCUMENTS, DELETE_DOCUMENT,
UPDATE_DOCUMENT, SEARCH_DOCUMENT } from '../constants/actionTypes';

/**
 *@return {object} - object of created document
 *Dispatches created document to the reducer
 * @param {object} document - created document
 */
const createDocumentAction = document => ({
  type: CREATE_DOCUMENT,
  document,
});

/**
 * @return {array} - returns array of documents
 *  dispatches all document in an array to the reducer
 * @param {array} documents - fetched documents
 */
const fetchAllDocumentsAction = documents => ({
  type: FETCH_ALL_DOCUMENTS,
  payload: documents
});
/**
 * @return {object} - newly created document
 * makes an api post request of the document object
 * @param {object} document - document payload to be created
 */
const createDocument = document => dispatch =>
axios.post('/api/documents', document).then((response) => {
  const documentData = response.data;
  dispatch(createDocumentAction(documentData));
}).catch(error => error);

/**
 * @return {array} - array of documents with pagination
 * fetches all document with the limit and offet as queries
 * @param {object} params - limits and offset as queries
 */

const fetchAllDocuments = params => (dispatch) => {
  return axios
  .get(`/api/documents/?limit=${params.limit}&offset=${params.offset}`)
  .then((response) => {
    const documents = response.data;
    dispatch(fetchAllDocumentsAction(documents));
  }).catch(error => error);
};

/**
 * @return {array} - array of users document
 * dispatch fetchDocument payload to the reducer
 * @param {array} document - fetched user document
 */
const fetchDocumentAction = document => ({
  type: FETCH_USER_DOCUMENTS,
  payload: document
});

/**
 * @return {array} - array of fetched documents
 *fetches all user documents with the limit and offsets as queries
 * @param {object} user - an object containing the id and offsets limits
 */
const fetchDocument = user => dispatch =>
axios.get(`/api/users/${user.id}/documents/
?limit=${user.limit}&offset=${user.offset}`)
.then((response) => {
  const userDocuments = response.data;
  dispatch(fetchDocumentAction(userDocuments));
}).catch(error => error);

/**
 * @return {object} - updated document
 * dispatches the update document payload to the reducer
 * @param {object} document - updated document
 */
const updateDocumentAction = document => ({
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
  return dispatch => axios.put(`/api/documents/${documentId}`, document)
  .then((response) => {
    dispatch(updateDocumentAction(response.data));
  }).catch(error => error);
};

/**
 * @return {number} document id of deleted document
 * dispatch the deleted document id to the reducer
 * @param {number} documentId - document id of deleted document
 */
const deleteDocumentAction = documentId => ({
  type: DELETE_DOCUMENT,
  payload: documentId
});

/**
 * @return {object} - deleted document id
 * performs a delete document request to the server
 * @param {object} document - document to be deleted
 */
const deleteDocument = document => dispatch =>
 axios.delete(`api/documents/${document.documentId}`).then(() => {
   dispatch(deleteDocumentAction(document.documentId));
 }).catch(error => error);

/**
 * @return {array} - searched documents payload
 * dispatches the searchResults to the reducer
 * @param {object} searchDocuments - array of searched documents
 */
const searchDocumentAction = searchDocuments => ({
  type: SEARCH_DOCUMENT,
  searchDocuments,
});
/**
 * @return {array} - searched documents payload
 * performs a get request for the title searched for
 * @param {object} search - search input
 * @returns {func} a dispatch function that makes an api call to the server
 */
const searchDocument = (search) => {
  const title = search.searchString;
  return dispatch => axios.get(`api/search/documents/?q=${title}`)
  .then((response) => {
    dispatch(searchDocumentAction(response.data));
  }).catch(error => error);
};


export { createDocumentAction,
   createDocument, fetchDocumentAction,
  fetchDocument, fetchAllDocuments,
  fetchAllDocumentsAction, updateDocument, searchDocument, deleteDocument };


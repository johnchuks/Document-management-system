import {
  CREATE_DOCUMENT, FETCH_USER_DOCUMENTS,
  FETCH_ALL_DOCUMENTS, DELETE_DOCUMENT, UPDATE_DOCUMENT, SEARCH_DOCUMENT
} from '../constants/actionTypes';

const initialState = {
  document: [],
  pagination: {}
};

 /**
 *
 *
 * @param {object} [state=initialState] sets the intial state of the documents
 * @param {array} action - contains payload from the action
 * @returns {array} - returns an array of documents after updating the state
 */
const fetchDocuments = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_DOCUMENTS: {
      return {
        document: action.payload.document,
        pagination: action.payload.pagination
      };
    }
    case FETCH_USER_DOCUMENTS: {
      return {
        document: action.payload.document,
        pagination: action.payload.pagination
      };
    }
    case DELETE_DOCUMENT: {
      const documentsRemaining = state.document.filter(document =>
       document.id !== action.payload);
      return {
        ...state, document: documentsRemaining
      };
    }
    case CREATE_DOCUMENT: {
      const result = [...state.document, action.document];
      return {
        ...state,
        document: result
      };
    }
    case UPDATE_DOCUMENT: {
      const updatedDocument = state.document.map((document) => {
        if (document.id === action.document.id) return action.document;
        return document;
      });
      return {
        ...state, document: updatedDocument
      };
    }
    case SEARCH_DOCUMENT: {
      return Object.assign({}, { document: action.searchDocuments });
    }

    default:
      return state;
  }
};

export default fetchDocuments;

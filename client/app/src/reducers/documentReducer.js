import {
  CREATE_DOCUMENT, CREATE_DOCUMENT_ERROR, FETCH_USER_DOCUMENTS,
  FETCH_ALL_DOCUMENTS, DELETE_DOCUMENT, UPDATE_DOCUMENT, SEARCH_DOCUMENT, SEARCH_DOCUMENT_ERROR
} from '../constants/actionTypes';

const initialState = {
  document: [],
  pagination: {},
  error: {}
};

 /**
 *
 *
 * @param {object} [state=initialState] sets the intial state of the documents
 * @param {array} action - contains payload from the action
 * @returns {array} - returns an array of documents after updating the state
 */
const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_DOCUMENTS: {
      return { ...state,
        document: action.payload.document,
        pagination: action.payload.pagination
      };
    }
    case FETCH_USER_DOCUMENTS: {
      return { ...state,
        document: action.payload.document,
        pagination: action.payload.pagination
      };
    }
    case DELETE_DOCUMENT: {
      const documentsRemaining = state.document.filter(document =>
       document.id !== action.documentId);
      return {
        ...state, document: documentsRemaining
      };
    }
    case CREATE_DOCUMENT: {
      const result = [action.document, ...state.document];
      return {
        ...state,
        document: result,
        error: {}
      };
    }
    case SEARCH_DOCUMENT_ERROR:
    case CREATE_DOCUMENT_ERROR:
      return {
        ...state,
        error: action.error
      };

    case UPDATE_DOCUMENT: {
      const updatedDocument = state.document.map((document) => {
        if (document.id === action.document.id) return action.document;
        return document;
      });
      return {
        ...state,
        document: updatedDocument,
        error: {}
      };
    }
    case SEARCH_DOCUMENT: {
      return { ...state,
        document: action.searchDocuments.document,
        pagination: action.searchDocuments.pagination,
        error: {}
      };
    }

    default:
      return state;
  }
};

export default documentReducer;

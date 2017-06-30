import {
  CREATE_DOCUMENT, FETCH_USER_DOCUMENTS,
  FETCH_ALL_DOCUMENTS, DELETE_DOCUMENT, UPDATE_DOCUMENT, SEARCH_DOCUMENT
} from '../constants/actionTypes';

const initialState = {
  document: [],
  pagination: {}
};

export const fetchDocuments = (state = initialState, action) => {
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
        document: documentsRemaining
      };
    }
    case CREATE_DOCUMENT: {
      const result = [action.document, ...state.document];
      return {
        document: result,
      };
    }
    case UPDATE_DOCUMENT: {
      const updatedDocument = state.document.map((document) => {
        if (document.id === action.document.id) return action.document;
        return document;
      });
      return {
        document: updatedDocument
      };
    }
    case SEARCH_DOCUMENT: {
      return Object.assign({}, { document: action.searchDocuments });
    }

    default:
      return state;
  }
};


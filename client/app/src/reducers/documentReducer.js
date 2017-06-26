import {
  CREATE_DOCUMENT, FETCH_USER_DOCUMENTS,
  FETCH_ALL_DOCUMENTS, DELETE_DOCUMENT, UPDATE_DOCUMENT
} from '../constants/actionTypes';

const initialState = {
  document: []
};

export const fetchDocuments = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_DOCUMENTS: {
      return {
        document: action.payload
      };
    }
    case FETCH_USER_DOCUMENTS: {
      return {
        document: action.payload,
      };
    }
    case DELETE_DOCUMENT: {
      const documentsRemaining = state.document.filter(document => document.id !== action.payload);
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

    default:
      return state;
  }
};


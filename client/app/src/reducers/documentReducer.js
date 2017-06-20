import { CREATE_DOCUMENT, FETCH_USER_DOCUMENTS, FETCH_ALL_DOCUMENTS  } from '../constants/actionTypes';

const initialState = {
  document: []
};

export const fetchDocuments = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DOCUMENTS: {
      return {
        document: action.payload
      };
    }
    case FETCH_ALL_DOCUMENTS: {
      return {
            document: action.payload
          }
    }
    default:
      return state;
  }
};





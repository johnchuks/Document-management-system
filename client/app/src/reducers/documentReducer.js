import { CREATE_DOCUMENT } from '../constants/actionTypes';

const initialState = {
  document: {}
};

export const fetchDocuments = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DOCUMENT: {
      return {
        document: action.document
      };
    }
    default:
      return state;
  }
};


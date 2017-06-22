import { CREATE_DOCUMENT, FETCH_USER_DOCUMENTS, FETCH_ALL_DOCUMENTS  } from '../constants/actionTypes';

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
    case CREATE_DOCUMENT: {
          console.log(action.document, 'document');
          console.log(state, 'create document state');
          const result = [action.document, ...state.document];
          console.log(result, 'the result');
        return {
            document: result,
          };
      }
    default:
        return state;
  }
}





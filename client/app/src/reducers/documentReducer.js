
export const fetchDocuments = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_DOCUMENT': {
      return Object.assign(...state, { document: action.payload });
    }
    default:
      return state;
  }
};

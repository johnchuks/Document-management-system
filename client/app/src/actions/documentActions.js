import axios from 'axios';
import { createDocument } from '../api/Api';
import { CREATE_DOCUMENT } from '../constants/actionTypes';

export const createDocumentAction = (document) => {
  return createDocument(document).then((response) => {
    return {
      type: CREATE_DOCUMENT,
      payload: response
    };
  });
};


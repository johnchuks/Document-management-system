import { expect } from 'chai';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import * as types from '../../src/constants/actionTypes';
import {createDocument, fetchAllDocuments, fetchAllDocumentsSuccess,
fetchDocument, updateDocument, searchDocument, deleteDocument } from '../../src/actions/documentActions';

describe('Document Action', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  describe('Create document', () => {
    it('Should make an AJAX call to create documents', (done) => {
      const document = {title: 'boullion van', content: 'In the club with a boullion van', value: 'public'};
      const store = mockStore({});
      const expectedAction = [{ type: types.CREATE_DOCUMENT }];
      store.dispatch(createDocument(document)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedAction);
      });
      done();
    });
  });
  describe('Fetch All Documents', () => {
    it('Should make an AJAX call to fetch all documents', (done) => {
         const document = [{title: 'boullion van', content: 'In the club with a boullion van', value: 'public'},{title: 'van', content: 'In the club with a boullion van', value: 'private'} ];
      const store = mockStore({});
      const expectedAction = [{type: types.FETCH_ALL_DOCUMENTS, payload:
      document}];
      store.dispatch(fetchAllDocuments(document)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedAction);
      });
      done();
    });
  });
  describe('Fetch User Documents', () => {
    it('Should make an AJAX call to fetch all documents', (done) => {
         const document = [{title: 'boullion van', content: 'In the club with a boullion van', value: 'public'},{title: 'van', content: 'In the club with a boullion van', value: 'private'} ];
      const store = mockStore({});
      const expectedAction = [{type: types.FETCH_USER_DOCUMENTS, payload:
      document}];
      store.dispatch(fetchDocument(document)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedAction);
      });
      done();
    });
  });
  describe('Update Documents', () => {
    it('Should make an AJAX call to update a document', (done) => {
         const document = [{title: 'boullion van', content: 'In the club with a boullion van', value: 'public'}];
      const store = mockStore({});
      const expectedAction = [{type: types.UPDATE_DOCUMENT, payload:
      document}];
      store.dispatch(updateDocument(document)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedAction);
      });
      done();
    });
  });
  describe('Search Documents', () => {
    it('Should make an AJAX call to search for documents', (done) => {
         const document = [{title: 'boullion van', content: 'In the club with a boullion van', value: 'public'}, {title: 'van', content: 'In the club with a boullion van', value: 'private'}];
      const store = mockStore({});
      const expectedAction = [{type: types.UPDATE_DOCUMENT, payload:
      document}];
      store.dispatch(searchDocument(document)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedAction);
      });
      done();
    });
  });
  describe('Delete Documents', () => {
    it('Should make an AJAX call to search for documents', (done) => {
      const documentId = 4;
      const store = mockStore({});
      const expectedAction = [{type: types.DELETE_DOCUMENT, payload:
      documentId}];
      store.dispatch(deleteDocument(documentId)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedAction);
      });
      done();
    });
  });
});

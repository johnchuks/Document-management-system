import { expect } from 'chai';
import 'babel-polyfill';
import documentReducer from '../../src/reducers/documentReducer';
import { fetchDocumentSuccess, updateDocumentSuccess,
fetchAllDocumentsSuccess, createDocumentSuccess,
deleteDocumentSuccess } from '../../src/actions/documentActions';

  describe('Document Reducer', () => {
    describe('CREATE_DOCUMENT', () => {
      it('should create a new document when passed CREATE_DOCUMENT', () => {
        const initialState = {
          document: [{
              id: 83,
              title: 'john james',
            },
             { id: 24, title: 'WSTRN'}]
        }
        const newDocument = { id: 14, title: 'osheee baddest'};
        const action = createDocumentSuccess(newDocument);
        const newState = documentReducer(initialState, action);
        expect(newState.document[0]).to.equal(newDocument);
        expect(newState.document).to.have.length(3);
      });
    })
    describe('FETCH_USER_DOCUMENTS', () => {
      it('should fetch all documents when passed FETCH_USER_DOCUMENTS', (done) => {
      const initialState = {
        document: [],
      }
      const documents = [{ id: 36,
            title: 'docuement created',
            content: '<p>It has to be created successfully though and working perfectly</p>',
            userId: 1,
            access: 'public'
          }, { id: 83,
              title: 'john james',
              content: '<p>james and john and john</p>',
              userId: 1,
              access: 'private'
            }];
      const action = fetchDocumentSuccess({ document: documents, pagination: {} });
      const newState = documentReducer(initialState, action);
      expect(newState.document).to.deep.equal(documents);
      expect(newState.document).to.have.length(2);
      expect(newState).to.not.equal(initialState);
      done();
      });
    });
    describe('UPDATE_DOCUMENT', () => {
        it('should update document when passed UPDATE_DOCUMENT', (done) => {
          const initialState = {
            document : [{
              id: 83,
              title: 'john james',
            },
             { id: 24, title: 'WSTRN',
            }]
          }
           const updateDoc = { id: 83, title: 'new document' };
           const action = updateDocumentSuccess(updateDoc);
            const newState = documentReducer(initialState, action);
           const updatedDocument = newState.document.find(doc => doc.id == updateDoc.id);
           const untouchedDocument = newState.document.find(doc => doc.id == 24);
           expect(updatedDocument.title).to.equal('new document');
           expect(untouchedDocument.title).to.equal('WSTRN');
           expect(newState.document).to.have.length(2);
           done();
        });
    });

    describe('FETCH_ALL_DOCUMENTS', () => {
      it('should fetch all documents when passed FETCH_ALL_DOCUMENT', (done) => {
        const initialState = {
          document: []
        };
        const documents = [{ id: 36,
            title: 'docuement created',
            content: '<p>It has to be created successfully though and working perfectly</p>',
            userId: 1,
            access: 'public'
          }, { id: 83,
              title: 'john james',
              content: '<p>james and john and john</p>',
              userId: 1,
              access: 'private'
            }];
      const action = fetchAllDocumentsSuccess({ document: documents, pagination: {} });
      const newState = documentReducer(initialState, action);
      expect(newState.document).to.deep.equal(documents);
      expect(newState.document).to.have.length(2);
      expect(newState).to.not.equal(initialState);
      done();
      });
    });
  });

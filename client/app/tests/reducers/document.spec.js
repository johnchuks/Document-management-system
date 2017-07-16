// import { expect } from 'chai';
// import 'babel-polyfill';
// import { fetchDocuments } from '../../src/reducers/documentReducer';
// import * as action from '../../src/actions/documentActions';

//   describe('Document Reducer', () => {
//     describe('FETCH_USER_DOCUMENTS', () => {
//       it('should fetch all documents when passed FETCH_USER_DOCUMENTS', () => {
//       const initialState = {
//         document: [],
//       }

//       const documents = {
//           document: [{ id: 36,
//             title: 'docuement created',
//             content: '<p>It has to be created successfully though and working perfectly</p>',
//             userId: 1,
//             access: 'public'
//           }, { id: 83,
//               title: 'john james',
//               content: '<p>james and john and john</p>',
//               userId: 1,
//               access: 'private'
//             }],
//       }
//       const action = action.fetchDocumentSuccess(documents);
//       const newState = fetchDocuments(initialState, action);
//       expect(newState.document).to.equal(documents);
//       expect(newState.document).to.have.length(2);
//       });
//     });
//     describe('CREATE_DOCUMENT', () => {
//         it('should update document when passed UPDATE_DOCUMENT', () => {
//           const intialState = {
//             document : [{
//               id: 83,
//               title: 'john james',
//               content: '<p>james and john and john</p>',
//               userId: 1,
//               access: 'private'
//             },
//              { id: 24, title: 'WSTRN',
//              content: 'james what are you saying man.',
//               userId: 1, access: 'public'}]
//           }
//            const updateDoc = { id:83, title: 'new document' };
//            const action = action.updateDocumentSuccess(updateDoc);
//            const updatedDocument = newState.find(doc => doc.id == updateDoc.id);
//            const untouchedDocument = newState.find(doc => doc.id == 24);
//            const newState = fetchDocuments(initialState, action);

//            expect(updatedDocument.title).to.Equal('new document');
//            expect(untouchedDocument.title).to.equal('WSTRN');
//            expect(newState).to.have.length(2);
//         });
//     });
//   });

// //     }, { type: 'UPDATE_DOCUMENT', document: { id: 83, title: 'WSTRN', content: '<p>james what are you saying man. Money is a hater you just have to take it slow</p>', userId: 1, access: 'public', createdAt: '2017-07-01T13:31:23.295Z', updatedAt: '2017-07-06T14:58:03.024Z' } });

// //     expect(state).toEqual({ usersReducer: { user: { email: 'admin@admin.com', id: 1, fullName: 'admin', roleId: 1, iat: 1499352255, exp: 1499438655 }, isAuthenticated: true }, fetchDocuments: { document: [{ id: 36, title: 'docuement created', content: '<p>It has to be created successfully though and working perfectly</p>', userId: 1, access: 'public', createdAt: '2017-07-01T08:24:50.781Z', updatedAt: '2017-07-06T14:49:41.876Z' }, { id: 83, title: 'WSTRN', content: '<p>james what are you saying man. Money is a hater you just have to take it slow</p>', userId: 1, access: 'public', createdAt: '2017-07-01T13:31:23.295Z', updatedAt: '2017-07-06T14:58:03.024Z' }], pagination: { totalCount: 2, pageCount: 1, page: 1, pageSize: 2 } } });


// //   });
// // });

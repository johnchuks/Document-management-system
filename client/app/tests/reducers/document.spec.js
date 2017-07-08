// import expect from 'expect';
// import reducers from '../../reducers';

// describe('reducers', () => {
//   it('should handle actions', () => {
//     let state;
//     state = reducers({
//       usersReducer: { user: { email: 'admin@admin.com', id: 1, fullName: 'admin', roleId: 1, iat: 1499352255, exp: 1499438655 }, isAuthenticated: true },
//       fetchDocuments: { document: [{ id: 36, title: 'docuement created', content: '<p>It has to be created successfully though and working perfectly</p>', userId: 1, access: 'public', createdAt: '2017-07-01T08:24:50.781Z', updatedAt: '2017-07-06T14:49:41.876Z' }, { id: 83, title: 'john james', content: '<p>james and john and john</p>', userId: 1, access: 'private', createdAt: '2017-07-01T13:31:23.295Z', updatedAt: '2017-07-06T14:56:50.310Z' }], pagination: { totalCount: 2, pageCount: 1, page: 1, pageSize: 2 } }

//     }, { type: 'UPDATE_DOCUMENT', document: { id: 83, title: 'WSTRN', content: '<p>james what are you saying man. Money is a hater you just have to take it slow</p>', userId: 1, access: 'public', createdAt: '2017-07-01T13:31:23.295Z', updatedAt: '2017-07-06T14:58:03.024Z' } });

//     expect(state).toEqual({ usersReducer: { user: { email: 'admin@admin.com', id: 1, fullName: 'admin', roleId: 1, iat: 1499352255, exp: 1499438655 }, isAuthenticated: true }, fetchDocuments: { document: [{ id: 36, title: 'docuement created', content: '<p>It has to be created successfully though and working perfectly</p>', userId: 1, access: 'public', createdAt: '2017-07-01T08:24:50.781Z', updatedAt: '2017-07-06T14:49:41.876Z' }, { id: 83, title: 'WSTRN', content: '<p>james what are you saying man. Money is a hater you just have to take it slow</p>', userId: 1, access: 'public', createdAt: '2017-07-01T13:31:23.295Z', updatedAt: '2017-07-06T14:58:03.024Z' }], pagination: { totalCount: 2, pageCount: 1, page: 1, pageSize: 2 } } });


//   });
// });

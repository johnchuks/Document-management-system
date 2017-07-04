import React from 'react';
import {Provider} from 'react-redux';
import { assert, expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import 'babel-polyfill';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import  SearchDocuments  from '../../src/components/documents/SearchDocuments';
import NavigationBar from '../../src/components/users/NavigationBar';
import SearchedDocumentList from '../../src/components/documents/SearchedDocumentList';

chai.use(chaiEnzyme());
describe('<SearchDocuments />', () => {
  const mockStore = configureMockStore([thunk]);
  let store;
  beforeEach(() =>{
    store = mockStore({
      fetchDocuments: {
      document:[
        {id:2, title: 'audax', content:'audax is coding'}
      ],
    },
    usersReducer: {
      user:{
        id: 2,
        email:'john@qdl.com',
        fullName:'john',
        roleId: 2
      }
    }
    });
  });
  it('should exists',  () => {
    assert.isDefined(SearchDocuments)
});
  const wrapper = shallow(
  <Provider store={store}>
  <SearchDocuments  />
  </Provider>
  );
 it('Should render the container component', () => {
   const wrapper = shallow(
  <Provider store={store}>
  <SearchDocuments  />
  </Provider>
  );
   expect(wrapper.find(SearchDocuments).length).to.equal(1);

 });
 it('Should render the navigation bar component', () => {

   const container = wrapper.find(SearchDocuments);
   assert.isDefined(wrapper.find(NavigationBar));

 });
 it('Should have an enclosing div tag', () => {
  const container = wrapper.find(SearchDocuments);
  assert.isDefined(container.find('div'));
 });
 it('Should have an onClick function', () => {
   const container = wrapper.find(SearchDocuments);
   const onSubmitSpy = sinon.stub(wrapper.instance(), "onSubmit");
    assert.isDefined(onSubmitSpy);
 });
 it('Should have an onChange function', () => {
   const onHandleChangeSpy = sinon.stub(wrapper.instance(), "onHandleChange");
   assert.isDefined(onHandleChangeSpy);
 });
 it('Should have a search button', () => {
   const container = wrapper.find(SearchDocuments);
   assert.isDefined(container.find('#searchButton'));

 });
 it('Should render the searchdocument list component', () => {
   assert.isDefined(wrapper.find(SearchedDocumentList));
 })
});

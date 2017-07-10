import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { assert, expect } from 'chai';
import spies from 'chai-spies';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import 'babel-polyfill';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import {
  SearchDocuments
} from '../../src/components/documents/SearchDocuments';
import { NavigationBar } from '../../src/components/users/NavigationBar';
import SearchedDocumentList
  from '../../src/components/documents/SearchedDocumentList';

chai.use(chaiEnzyme());
chai.use(spies);
const pushSpy = sinon.spy();

describe('<SearchDocuments />', () => {
  describe('when user is not authenticated', () => {
    const props = {
      isAuthenticated: false,
      searchDocument: () => {},
      history: { push: pushSpy }
    };
    const wrapper = mount(<SearchDocuments {...props} />);
    it('Should not render, and should redirect to home', () => {
      expect(pushSpy.callCount).to.equal(1);
      expect(pushSpy.calledWith('/')).to.equal(true);
      expect(wrapper.find(NavigationBar).length).to.equal(0);
    });
  });
  describe('when user is authenticated', () => {
    beforeEach(() => {
      pushSpy.reset();
    });
    const searchDocument = sinon.spy(() => Promise.resolve());
    const props = {
      isAuthenticated: true,
      error:{},
      searchDocument,
      history: { push: pushSpy },
      userRoleId: 1,
      searchResult: [],
      onSubmit: () => {},
      onHandlechange:() => {}
    };
    const store = {
      subscribe: () => {},
      dispatch: () => {},
      getState: () => ({
        usersReducer: {
          user: {
            roleId: 1,
            fullName: 'Test Test',
            email: 'test@test.com'
          },
          isAuthenticated: true
        }
      })
    };
    const wrapper = mount(<SearchDocuments {...props} />, {
      context: {
        store,
        router: { history: { push: pushSpy, createHref: () => {} } }
      },
      childContextTypes: { store: PropTypes.object, router: PropTypes.object }
    });
    it('Should not push to home if user is authenticated', () => {
      expect(pushSpy.callCount).to.equal(0);
      expect(pushSpy.calledWith('/')).to.equal(false);

    });
    it('Should render the navigation component', () => {
       expect(wrapper.find(NavigationBar).length).to.equal(1);
    });
    it('Should have a div class for the search component', () => {
      expect(wrapper).to.have.tagName('div');
    });
    it('Should have input field for the search component', () => {
      expect(wrapper.find('.searchBar')).to.not.be.blank();
    });
    it('Should have an onChange function', (done) => {
      const event = {target: {value: 'john'}};
      const handleChangeSpy = sinon.spy(wrapper.instance(), 'onHandleChange');
      const inputWrapper = wrapper.find('input');
      wrapper.update();
      inputWrapper.simulate('change', event);
      expect(handleChangeSpy.called).to.be.true;
      done();
    });
    it('Should have an onClick function', () => {
         wrapper.find('button').simulate('click');
         expect(searchDocument.callCount).to.equal(1);
    });
    it('Should have initial state of searchstring and searchList', () => {
        expect(wrapper.state().searchString).to.have.length(4);
        expect(wrapper.state().searchList).to.have.length(0);

  });
  it('Should change the intital state of searchList', () => {
    wrapper.setState().searchList = props.searchResult;
    expect(wrapper.setState().searchList).to.have.length(0);
  });
  });

});

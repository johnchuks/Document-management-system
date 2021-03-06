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
import ReactPaginate from 'react-paginate';
import { AllDocuments } from '../../src/components/documents/AllDocuments';

chai.use(chaiEnzyme());
const pushSpy = sinon.spy();

describe('<AllDocuments />', () => {
  describe('when user is not authenticated', () => {
    const props = {
      isAuthenticated: false,
      history: { push: pushSpy },
      fetchAllDocuments: () => {}
    };
    const wrapper = mount(<AllDocuments {...props} />);
    it('Should not render, and should redirect to home', () => {
      expect(pushSpy.callCount).to.equal(1);
      expect(pushSpy.calledWith('/')).to.equal(true);
    });

  });
   describe('when user is authenticated', () => {
    beforeEach(() => {
      pushSpy.reset();
    });
    const props = {
      isAuthenticated: true,
      history: { push: pushSpy },
      roleId: 1,
      fetchAllDocuments:() => {},
      publicDocument: [],
      handlePageChange:() => {}
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
    const wrapper = mount(<AllDocuments {...props} />, {
      context: {
        store,
        router: { history: { push: pushSpy, createHref: () => {} } }
      },
      childContextTypes: { store: PropTypes.object, router: PropTypes.object }
    });

    it('Should exists', () => {
      expect(wrapper).to.have.length(1);
    });

    it('Should not push to home if user is authenticated', () => {
      expect(pushSpy.callCount).to.equal(0);
      expect(pushSpy.calledWith('/')).to.equal(false);
    });
    it('Should have div to render the documents', () => {
      expect(wrapper.find('div').length).to.equal(3);
    });
    it('Should have a ReactPaginate component', () => {
      expect(wrapper.find(ReactPaginate).length).to.equal(0);
    });
   });
});

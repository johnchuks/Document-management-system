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
import { SearchUsers } from '../../src/components/users/SearchUsers';
import { NavigationBar } from '../../src/components/users/NavigationBar';

chai.use(chaiEnzyme());

const pushSpy = sinon.spy();
describe('<SearchUsers/>', () =>  {
  describe('when the user is not authenticated', () => {
    const props = {
      isAuthenticated: false,
      history:{ push: pushSpy },
      searchUser: () => {}
    };
    const wrapper = mount(<SearchUsers {...props} />);
    it('Should not render and should redirect to home', () => {
      expect(pushSpy.callCount).to.equal(1);
      expect(pushSpy.calledWith('/')).to.equal(true);
    });
    it('Should not render the navigation bar component', () => {
      expect(wrapper.find(NavigationBar).length).to.equal(0);
    });
  });
  describe('When the user is authenticated', () => {
    beforeEach(() => {
      pushSpy.reset();
    });
    const searchUser = sinon.spy(() => Promise.resolve());
    const props = {
      isAuthenticated: true,
      error: {},
      searchUser,
      history: { push : pushSpy},
      search: [],
      onSubmit: () => {},
      onHandleChange: () => {}
    }
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
    const wrapper = mount(<SearchUsers {...props} />, {
      context: {
        store,
        router: { history: { push: pushSpy, createHref: () => {} } }
      },
      childContextTypes: { store: PropTypes.object, router: PropTypes.object }
    });
    it('Should not redirect to home for authenticated user', () => {
      expect(pushSpy.callCount).to.equal(0);
      expect(pushSpy.calledWith('/')).to.equal(false);
    });
    it('Should render the navigation component', () => {
      expect(wrapper.find(NavigationBar).length).to.equal(1);
    });
    it('Should have a heading', () => {
      expect(wrapper.find('h4').length).to.equal(1);
    });
    it('Should a search button', () => {
      expect(wrapper.find('#searchButton').length).to.equal(1);
    });
    it('Should respond to event change on the input field', (done) => {
      const handleSpy = sinon.spy(wrapper.instance(), 'onHandleChange');
      const event = { target: {value: 'john'}};
      const inputWrapper = wrapper.find('input');
      wrapper.update();
      inputWrapper.simulate('change', event);
      expect(handleSpy.callCount).to.equal(1);
      done();
    });
    it('Should respond to onClick events', () => {
      wrapper.find('#searchButton').simulate('click');
      expect(searchUser.callCount).to.equal(1);
    });
  });
});

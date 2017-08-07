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
import { NavigationBar } from '../../src/components/users/NavigationBar';
import { ViewAllUsers } from '../../src/components/users/ViewAllUsers';

chai.use(chaiEnzyme());
const pushSpy = sinon.spy();
describe('<ViewAllUsers />', () => {
  describe('When user is not authenticated', () => {
     const props = {
      isAuthenticated: false,
      fetchUser: () => {},
      history: { push: pushSpy },
      usersList: []
    };
    const wrapper = mount(<ViewAllUsers {...props} />);
    it('Should not render, and should redirect to home page', () => {
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
    const props = {
      isAuthenticated: true,
      history:{push:pushSpy},
      usersList: [],
      fetchUser: () => {}
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

  const wrapper = mount(<ViewAllUsers {...props} />, {
    context: {
        store,
        router: { history: { push: pushSpy, createHref: () => {} } }
      },
      childContextTypes: { store: PropTypes.object, router: PropTypes.object }
  });
  it('Should exist', () => {
    expect(wrapper).to.have.length(1);
  });
  it('Should render the navigation bar component', () => {
    expect(wrapper.find(NavigationBar).length).to.equal(1);
  });
   it('Should not push to home if user is authenticated', () => {
      expect(pushSpy.callCount).to.equal(0);
      expect(pushSpy.calledWith('/')).to.equal(false);
    });
  it('Should have a heading tag', () => {
    expect(wrapper.find('h5').length).to.equal(1);
  });
 });
});

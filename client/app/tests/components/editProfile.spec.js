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
import {EditProfile} from '../../src/components/users/EditProfile';
import { NavigationBar } from '../../src/components/users/NavigationBar';

chai.use(chaiEnzyme());
const pushSpy = sinon.spy();

describe('<EditProfile />', () => {
  describe('when user is not authenticated', () => {
    const props = {
      isAuthenticated: false,
      searchDocument: () => {},
      history: { push: pushSpy },
      user: {}
    };
    const wrapper = mount(<EditProfile {...props} />);
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
    const profileUpdate = sinon.spy(() => Promise.resolve());
    const props = {
      isAuthenticated: true,
      profileUpdate,
      error:{},
      history: { push: pushSpy },
      user: {
        fullName: 'john james',
        userName: 'john',
        email:'john@john.com',
        id: 4
      },
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
    const wrapper = mount(<EditProfile {...props} />,{
      context: {
        store,
        router: { history: { push: pushSpy, createHref: () => {} } }
      },
      childContextTypes: { store: PropTypes.object, router: PropTypes.object }
    }
    );
    const changeSpy = sinon.spy(wrapper.instance(), "onChange");
     it('Should not push to home if user is authenticated', () => {
      expect(pushSpy.callCount).to.equal(0);
      expect(pushSpy.calledWith('/')).to.equal(false);
    });
    it('Should render the navigation component', () => {
       expect(wrapper.find(NavigationBar).length).to.equal(1);
    });
    it('Should have input fields for editing profile', () => {
      expect(wrapper.find('input')).to.have.length(4);
    });
    it('Should respond the profile name update', (done) => {
      const event = {
        target: {
          value:"john"
        }
      };
      const inputWrap = wrapper.find('#full_name');
      wrapper.update();
      inputWrap.simulate('change', event);
      expect(changeSpy.called).to.equal(true);
      expect(changeSpy.callCount).to.equal(1);
      expect(inputWrap).to.have.length(1);
      done();
    });
    it('Should respond the profile email update', (done) => {
      const event = {
        target: {
          value:"john@john.com"
        }
      };
      const inputWrap = wrapper.find('#editEmail');
      wrapper.update();
      inputWrap.simulate('change', event);
      expect(changeSpy.called).to.equal(true);
      expect(inputWrap).to.have.length(1);
      expect(changeSpy.callCount).to.equal(2);
      done();
    });
    it('Should respond the profile userName update', (done) => {
      const event = {
        target: {
          value:"john12"
        }
      };
      const inputWrap = wrapper.find('#user_name');
      wrapper.update();
      inputWrap.simulate('change', event);
      expect(changeSpy.callCount).to.equal(3);
      expect(inputWrap).to.have.length(1);
      done();
    });
    it('Should send the profile update with a submit button', () => {
     wrapper.find('button').simulate('click');
     expect(profileUpdate.callCount).to.equal(1);
    });
  });
});

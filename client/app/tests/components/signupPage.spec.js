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
import { SignupPage } from '../../src/components/users/SignupPage';
import Navigation from '../../src/components/users/Navigation';

chai.use(chaiEnzyme());
 const pushSpy = sinon.spy();
  const signup = sinon.spy(() => Promise.resolve());
  const props = {
    signup,
    history:{
      push: pushSpy
    }
  }
describe('<SignupPage />', () => {
  const wrapper = mount(<SignupPage {...props} />, {
    ontext: {
        router: { history: { push: pushSpy, createHref: () => {} } }
      },
  })
  const handleSpy = sinon.spy(wrapper.instance(), 'handleChange');
  it('Should exist', () => {
    expect(wrapper).to.have.length(1);
  });
  it('Should have the Navigation component render', () => {
    expect(wrapper.find(Navigation).length).to.equal(1);
  });
  it('Should have input fields for signing in', () => {
    expect(wrapper.find('input').length).to.equal(4);
  });
  it('Should update for the input field- email', (done) => {
    const event = {target:{value:'john@john.com'}};
    const emailWrap = wrapper.find('#email');
    wrapper.update();
    emailWrap.simulate('change', event);
    expect(handleSpy.callCount).to.equal(1);
    done();
  });
  it('Should update for the input field - password', (done) => {
    const event = {target:{value:'john'}};
    const passwordWrap = wrapper.find('#password');
    wrapper.update();
    passwordWrap.simulate('change', event);
    expect(handleSpy.callCount).to.equal(2);
    done();
  });
  it('Should update for the input field -full Name', (done) => {
    const event = {target:{value:'john12'}};
    const passwordWrap = wrapper.find('#full_Name');
    wrapper.update();
    passwordWrap.simulate('change', event);
    expect(handleSpy.callCount).to.equal(3);
    done();
  });
  it('Should update for the input field -userName', (done) => {
    const event = {target:{value:'john12'}};
    const passwordWrap = wrapper.find('#user_Name');
    wrapper.update();
    passwordWrap.simulate('change', event);
    expect(handleSpy.callCount).to.equal(4);
    done();
  });
  it('Should submit the users data', () => {
     wrapper.find('#signupButton').simulate('click');
     expect(signup.callCount).to.equal(1);
     expect(pushSpy.calledWith('/dashboard')).to.equal(false);
  });
})

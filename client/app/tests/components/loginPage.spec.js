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
import { LoginPage } from '../../src/components/users/LoginPage';
import Navigation from '../../src/components/users/Navigation';

chai.use(chaiEnzyme());

describe('<LoginPage />', () => {
  const pushSpy = sinon.spy();
  const props = {
    loginAction: () => {},
    history:{
      push: pushSpy
    }
  }
  const wrapper = mount(<LoginPage {...props} />);
   const handleSpy = sinon.spy(wrapper.instance(), 'handleChange');
  it('Should exist', () => {
    expect(wrapper).to.have.length(1);
  });
  it('Should have the Navigation component render', () => {
    expect(wrapper.find(Navigation).length).to.equal(1);
  });
  it('Should render the login container', () => {
    expect(wrapper.find('.loginContainer').length).to.equal(1);
  });
  it('Should have input fields for signing in', () => {
    expect(wrapper.find('input').length).to.equal(2);
  });
  it('Should have an onchange function for the input field- email', (done) => {
    const event = {target:{value:'john@john.com'}};
    const emailWrap = wrapper.find('#email');
    wrapper.update();
    emailWrap.simulate('change', event);
    expect(handleSpy.callCount).to.equal(1);
    done();
  });
  it('Should have an onchange function for the input field - password', (done) => {
    const event = {target:{value:'john'}};
    const passwordWrap = wrapper.find('#password');
    wrapper.update();
    passwordWrap.simulate('change', event);
    expect(handleSpy.callCount).to.equal(2);
    done();
  });
  it('Should have an onSubmit button', () => {
     const submitSpy = sinon.spy(wrapper.instance(), 'onSubmit');
     wrapper.find('button').simulate('click');
     expect(submitSpy.callCount).to.equal(1);
  });
  
});

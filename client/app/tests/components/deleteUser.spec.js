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
import { DeleteUser } from '../../src/components/users/DeleteUser';

chai.use(chaiEnzyme());
const deleteUser = sinon.spy(() => Promise.resolve());
 const props = {
   deleteUser,
    user: 4,
  };
describe('<DeleteUser />', () => {
  const wrapper = mount(<DeleteUser {...props} />);
  it('Should exist', () => {
    expect(wrapper).to.have.length(1);
  });
  it('Should have a modal to delete users', () => {
    expect(wrapper.find('Modal').length).to.equal(1);
  });
  it('Should have a No and Yes button', () => {
    expect(wrapper.find('Button').length).to.equal(1);
  });
  it('Should have a div for the modal', () => {
    expect(wrapper.find('div').length).to.equal(1);
  });
});

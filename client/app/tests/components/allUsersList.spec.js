import React from 'react';
import { expect, assert } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import 'babel-polyfill';
import { shallow } from 'enzyme';
import { DeleteUser } from '../../src/components/users/DeleteUser';
import AllUsersList from '../../src/components/users/AllUsersList';

chai.use(chaiEnzyme());
describe('<AllUsersList />', () => {
  const props = {
    allUsers: [{
      fullName: 'john bosco',
      email: 'jonh@email.com',
      id: 4
    }]
  };
  const wrapper = shallow(<AllUsersList {...props} />);
  it('Should have an enclosing div tag present', () => {
    expect(wrapper.find('div').length).to.equal(1);
  });
  it('Should have a table for listing users in the table', () => {
    expect(wrapper.find('table').length).to.equal(1);
    expect(wrapper.node.props.children).to.not.be.undefined;
  });
  it('Should have a deleteUser component present', () => {
   assert.isDefined(wrapper.find(DeleteUser));
  });
  it('Should have a bordered table for displaying users', () => {
    expect(wrapper.find('table')).to.have.className('bordered');
  });
});

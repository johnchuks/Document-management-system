import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect,assert } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { LogoutPage } from '../../src/components/users/LogoutPage.jsx';

chai.use(chaiEnzyme());

describe('<Logout />', () => {
  const wrapper = shallow(<LogoutPage />);

  it('Should have div tags in the render function', () => {
    expect(wrapper.find('div').length).to.equal(3);
  });
  it('Should have a nav tag in the render function', () => {
    expect(wrapper.find('nav').length).to.equal(1);
  });
  it('Should have the logout button in the right side of the navigation bar', () => {
    expect(wrapper).to.have.descendants('#nav');
  });
});

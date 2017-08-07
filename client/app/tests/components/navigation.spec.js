import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect,assert } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Navigation from '../../src/components/users/Navigation.jsx';

chai.use(chaiEnzyme());

describe('<Navigation />', () => {
  const wrapper = shallow(<Navigation />);

  it('Should have enclosing divs', () => {
    expect(wrapper.find('div').length).to.equal(3);
  });
  it('Should have an anchor tag for the login', () => {
    expect(wrapper.find('a').length).to.equal(2);
  });
});

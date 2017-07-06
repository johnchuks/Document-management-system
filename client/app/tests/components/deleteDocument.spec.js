import React from 'react';
import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import 'babel-polyfill';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { DeleteDocument } from '../../src/components/documents/DeleteDocument';

chai.use(chaiEnzyme());
describe('<DeleteDocument />', () => {
  const props = {
    cardDocument: 3,
    user:1
  }
  const wrapper = shallow(<DeleteDocument {...props} />);

  it('Should have an enclosing div present in the render', () => {
    expect(wrapper.find('div')).to.have.length(1);
  });
  it('Should have a modal for rendering delete options', () => {
    expect(wrapper.find('Modal')).to.have.length(1);
  });
  it('Should have Buttons for deciding options', () => {
    expect(wrapper.find('Button')).to.not.be.undefined;
  });
  it('Should have a h5 tag for displaying message',() => {
    expect(wrapper.find('h5')).to.not.be.undefined;
  });
});

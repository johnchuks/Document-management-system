import React from 'react';
import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import 'babel-polyfill';
import { shallow } from 'enzyme';
import { UpdateDocumentForm } from '../../src/components/documents/UpdateDocumentForm';

chai.use(chaiEnzyme());
describe('<UpdateDocumentForm />', () => {
  const props = {
    cardDocuments: {
      title: 'update',
      content:'update the table',
      access:'public',
      id: 34
    },
  };
  const wrapper = shallow(<UpdateDocumentForm {...props} />)
  it('Should contain a modal in the render function', () => {
    expect(wrapper.find('Modal').length).to.equal(1);
  });
  it('Should contain form in the render method for updating', () =>{
    expect(wrapper.find('form').length).to.equal(1);
  });
  it('Should contain enclosing div tags in the render function',() => {
    expect(wrapper.find('div').length).to.equal(5);
  });
  it('Should contain a select option tag in the render function', () => {
    expect(wrapper.find('select').length).to.equal(1);
  });
  it('Should contain an editor TinyMCE in the content field', () => {
    expect(wrapper.find('TinyMCE').length).to.equal(1);
  });
});

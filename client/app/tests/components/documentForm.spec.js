import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import DocumentForm from '../../src/components/documents/DocumentForm';

const props = {
  title: 'document',
  content: 'the boy is going to school',
  userId: 3,

}
describe('<DocumentForm />', () => {
  const wrapper = shallow(<DocumentForm {...props} />)
  it('Should render a modal element for the document', () => {
    expect(wrapper.find('Modal')).to.have.length(1);
    expect(wrapper.find('Modal').children()).to.be.defined;
  });
  it('Should have a input for taking in values as props', () => {
    expect(wrapper.find('input')).to.be.defined;
  });
  it('Should have an onChange function', () => {
    wrapper.instance().onHandlechange();
  });
  it('Should a submit button and a trigger', () => {
    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find('Button')).to.have.length(1);
  });
  it('Should have the select options element for document access', () => {
    expect(wrapper.find('select')).to.have.length(1);
    expect(wrapper.find('select').children()).to.be.defined;
  });
  it('Should have the optionChange function', () => {
    wrapper.instance().optionChange();
  });
  it('Should have a form to recieve the document as state', () => {
    expect(wrapper.find('form')).to.have.length(1);
    expect(wrapper.find('form').children()).to.be.defined;
  })
})

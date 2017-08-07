import React from 'react';
import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import PropTypes from 'prop-types';
import 'babel-polyfill';
import TinyMCE from 'react-tinymce';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { DocumentForm } from '../../src/components/documents/DocumentForm';

chai.use(chaiEnzyme());
const createDocument = sinon.spy(() => Promise.resolve());
describe('<DocumentForm />', () => {
   const store = {
      subscribe: () => {},
      dispatch: () => {},
   };

  const props = {
  title: 'document',
  content: 'the boy is going to school',
  userId: 3,
  createDocument,
  getContent: () => {}

};
  const wrapper = shallow(<DocumentForm {...props} />)
  it('Should render a modal element for the document', () => {
    expect(wrapper.find('Modal')).to.have.length(1);
    expect(wrapper.find('Modal').children()).to.not.be.undefined;
  });
  it('Should have a input for taking in values as props', () => {
    expect(wrapper.find('input')).to.not.be.undefined;
  });

  it('Should a submit button and a trigger', () => {
    expect(wrapper.find('Button')).to.have.length(1);
  });
  it('Should have the select options element for document access', () => {
    expect(wrapper.find('select')).to.have.length(1);
    expect(wrapper.find('select').children()).to.not.be.undefined;
  });
  it('Should have the optionChange function', (done) => {
    const event = {target:{value:'private'}};
    const optionSpy = sinon.stub(wrapper.instance(), 'optionChange');
    const optionWrapper = wrapper.find('select');
    wrapper.update();
    optionWrapper.simulate('change', event);
    expect(optionWrapper).to.have.length(1);
    expect(optionSpy.called).to.be.false;
    done();
  });

  it('Should have a handleChange function', () => {
    const event = {target:{value:'my document'}};
    const handleSpy = sinon.spy(wrapper.instance(), 'handleChange');
    const inputWrapper = wrapper.find('.validate');
    wrapper.update();
    inputWrapper.simulate('change', event);
    expect(inputWrapper).to.have.length(1);
    expect(handleSpy.called).to.be.false;
  });

  it('Should have a form to recieve the document as state', () => {
    expect(wrapper.find('form')).to.have.length(1);
    expect(wrapper.find('form').children()).to.not.be.undefined;
  });
  it('Should have an onChange function for the tinymce editor', () => {
    const content = sinon.spy();
    const handleChangeSpy = sinon.spy(wrapper.instance(), 'handleEditorChange');
    const event = { target:{content:'john', getContent: () => {} }};
    const tinymceWrapper = wrapper.find('TinyMCE');
    wrapper.update();
    tinymceWrapper.simulate('change', event);
    expect(tinymceWrapper).to.have.length(1);
    expect(handleChangeSpy.callCount).to.equal(0);
  });
  it('Should have an onSubmit button', () => {
    const event = {preventDefault: () => {}};
     wrapper.find('Button').simulate('click', event);
     expect(createDocument.callCount).to.equal(1);
  });
  it('Should have a div tag for the error messages', () => {
    expect(wrapper.find('div')).to.have.length(5);
  });
});

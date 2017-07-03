import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import DocumentView from '../../src/components/documents/DocumentView.jsx'


describe('<DocumentView />', () => {
  const props = {
    id: 1,
    title: 'document',
    content: 'mocha is the best testing framework',
  }
  const wrapper = shallow(<DocumentView {..props} />);

  it('Should have a div tag to render the documents', () => {
    expect(wrapper.find('div')).to.be.defined;
     expect(wrapper.node.props.children).to.be.defined;
  });
  it('Should have a modal present', () => {
    expect(wrapper.find('Modal')).to.be.defined;
    expect(wrapper.find('Modal').children()).to.be.defined;
  })
  it('Should have a view button present', () => {
    expect(wrapper.find('button')).to.be.defined;
    expect(wrapper.find('button')).to.have.className('waves-effect waves-light btn orange');
  });
 it('Should have p tag show the document content', () => {
   expect(wrapper).to.contain(props.content);
 });
 it('Should have a document header', () => {
   expect(wrapper).to.contain(props.title);
 });
});

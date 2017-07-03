import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from chai;
import SearchDocumentList from '../../src/components/documents/SearchedDocumentList.jsx';

describe('<SearchDocumentList />', () => {
  const props = {
    id: 2,
    title: 'search',
    content: 'card content and black text',
    access: 'public'
  };
  const wrapper = shallow(<SearchDocumentList {..props} />)
  it('Should have an enclosing div tag', () => {
    expect(wrapper.find('div')).to.be.defined;
    expect(wrapper.node.props.children).to.have.length(1);
  });
  it('Should have div with different classnames', () => {
    expect(wrapper.find('div')).to.have.className('container');
    expect(wrapper.find('div')).to.have.className('row');
  });
  it('Should have span for rendering document title', () => {
    expect(wrapper.find('span')).to.have.className('card-title');
  });
  it('Should render a document title', () => {
    expect(wrapper).to.contain(props.title).to.equal('search');
  });
  it('Should render a document content', () => {
    expect(wrapper).to.contain(props.content).to.equal('card content and black text');
  });
  it('Should render the document access', () => {
     expect(wrapper).to.contain(props.access).to.equal('public');
  })
});

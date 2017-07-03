import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import SearchDocumentList from '../../src/components/documents/SearchedDocumentList.jsx';

chai.use(chaiEnzyme());
describe('<SearchDocumentList />', () => {
  const props = {
    document: [{
    id: 2,
    title: 'search',
    content: 'card content and black text',
    access: 'public'
    }]
  };
  const wrapper = shallow(<SearchDocumentList {...props} />)
  it('Should have an enclosing div tag', () => {
    expect(wrapper.find('div')).to.not.be.undefined;
    expect(wrapper.node.props.children).to.not.be.undefined;
  });
  it('Should have span for rendering document title', () => {
    expect(wrapper.find('span')).to.have.className('card-title');
  });
  it('Should render a document title', () => {
    expect(wrapper).to.contain(props.document[0].title);
  });
  it('Should render a document content', () => {
    expect(wrapper).to.contain(props.document[0].content);
  });
  it('Should render the document access', () => {
     expect(wrapper).to.contain(props.document[0].access);
  });
});

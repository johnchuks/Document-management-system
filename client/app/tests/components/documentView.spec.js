import React from 'react';
import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow, mount } from 'enzyme';
import DocumentView from '../../src/components/documents/DocumentView.jsx'

chai.use(chaiEnzyme());
describe('<DocumentView />', () => {
  const props = {
    documentView: {
    id: 1,
    title: 'document',
    content: 'mocha is the best testing framework',
    }
  }
  const wrapper = shallow(<DocumentView {...props} />);

  it('Should have a div tag to render the documents', () => {
    expect(wrapper.find('div')).to.not.be.undefined;
     expect(wrapper.node.props.children).to.not.be.undefined;
  });
  it('Should have a modal present', () => {
    expect(wrapper.find('Modal')).to.not.be.undefined;
    expect(wrapper.find('Modal').children()).to.not.be.undefined;
  })
  it('Should have a view button present', () => {
    expect(wrapper.find('button')).to.not.be.undefined;

  });
 it('Should have p tag show the document content', () => {
   expect(wrapper).to.contain(props.documentView.content);
 });
});

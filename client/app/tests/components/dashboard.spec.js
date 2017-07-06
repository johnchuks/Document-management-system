import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect,assert } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Dashboard from '../../src/components/users/DashboardPage.jsx';
import AllDocuments from '../../src/components/documents/AllDocuments.jsx';
import DocumentForm from '../../src/components/documents/DocumentForm.jsx';
import NavigationBar from '../../src/components/users/NavigationBar.jsx';

chai.use(chaiEnzyme());

describe('<Dashboard />', () => {
  const wrapper = shallow(<Dashboard />);

  it('Should have the view public and role document component during rendering', () => {
    assert.isDefined(wrapper.find(AllDocuments));
  });
  it('Should have the document form component', () => {
    assert.isDefined(wrapper.find(DocumentForm));
  });
  it('Should have navigation bar component', () => {
    assert.isDefined(wrapper.find(NavigationBar));
  });
  it('Should have an enclosing div tag present', () => {
    expect(wrapper.find('div').length).to.equal(1);
  });
});

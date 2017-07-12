import React from 'react';
import { assert, expect } from 'chai';
import spies from 'chai-spies';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import 'babel-polyfill';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import SearchedUsersList from '../../src/components/users/SearchedUsersList.jsx';

chai.use(chaiEnzyme());

describe('<SearchedUsersList />', () => {
   const props = {
     users: [
        {
          fullName: 'john',
          id: 3,
          email: 'john@test.com',
          userName: 'John12'
        }
     ]
   }
   const wrapper = mount(<SearchedUsersList {...props} />);

   it('Should have a table for the users list', () => {
     expect(wrapper.find('table').length).to.equal(1);
     expect(wrapper.find('table')).to.have.className('bordered');
   });
   it('Should have an enclosing div tag', () => {
     expect(wrapper.find('div').length).to.equal(1);
   });
});

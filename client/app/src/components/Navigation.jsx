import React from 'react';
import { Navbar, NavItem } from 'react-materialize';

class Navigation extends React.Component {
  render() {
    return (
      <div id="navBar">
        <Navbar brand="DOCMe"right>
            <NavItem href='/signup'>SignUp</NavItem>
            <NavItem href='/login'>Login</NavItem>
          </Navbar>
        </div>
    )
  }
}
export default Navigation;

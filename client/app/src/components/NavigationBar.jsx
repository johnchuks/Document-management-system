import React from 'react';
import { Navbar } from 'react-materialize';
import LogoutPage from './LogoutPage';

class NavigationBar extends React.Component {
  render() {
    return (
      <div id="navBar">
        <Navbar brand='DOCMe'right>
        <LogoutPage />
          </Navbar>
        </div>
    )
  }
}
export default NavigationBar;

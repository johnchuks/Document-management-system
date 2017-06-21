import React from 'react';
import { withRouter } from 'react-router-dom';
import { NavItem } from 'react-materialize';

class LogoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit() {
    localStorage.removeItem('jwtToken');
    this.props.history.push('/login');
  }
  render() {
    return (
      <div>
        <NavItem href= '/login' onClick={this.onSubmit}>Logout</NavItem>
      </div>
    );
  }
}
export default withRouter(LogoutPage);

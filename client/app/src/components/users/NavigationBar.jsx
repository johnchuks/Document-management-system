import React from 'react';
import { Navbar } from 'react-materialize';
import { connect } from 'react-redux';
import LogoutPage from './LogoutPage.jsx';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.profileId,
      name: this.props.profileName,
      email: this.props.profileEmail
    };
  }
  render() {
    let Navigation =
      <ul id="slide-out" className="side-nav fixed">
      <li>
          <div className="user-view">
            <div className="background">
            </div>
           <img className="circle" src="" />
            <span className="name">{this.state.name}</span>
            <br />
         <span className="email">{this.state.email}</span>
          </div>
        </li>
          <li><a href="/dashboard">View all documents</a></li>
          <li><a href="/documents">My documents</a></li>
          <li><a href="/searchdocument">Search Document</a></li>
          <li><a href="/profile">Edit Profile</a></li>
        </ul>;

    if (this.state.profile === 1) {
      Navigation =
         <ul id="slide-out" className="side-nav fixed">
        <li>
        <div className="user-view">
           <div className="background">
        <img src="../../public/Library-Books1.jpeg" />
      </div>
      <img className="circle" src="" />
      <span className="name">{this.state.name}</span>
      <br />
    <span className="email">{this.state.email}</span>
    </div></li>
      <li><a href="/dashboard">View all documents</a></li>
      <li><a href="/documents">My documents</a></li>
      <li><a href="/viewusers">Manage Users</a></li>
      <li><a href="/searchuser">Search for users</a></li>
      <li><a href="/searchdocument">Search Document</a></li>
      <li><a href = "/profile">Edit Profile</a></li>
    </ul>;
    }
    return (
      <div id="navBar">
        <Navbar brand='DocumentMe'>
        <LogoutPage />
          </Navbar>
          {Navigation}
        </div>
    );
  }
}
const mapStateToProps = state => ({
  profileId: state.usersReducer.user.roleId,
  profileName: state.usersReducer.user.fullName,
  profileEmail: state.usersReducer.user.email,
});
export default connect(mapStateToProps)(NavigationBar);

import React from 'react';
import { Navbar } from 'react-materialize';
import { connect } from 'react-redux';
import LogoutPage from './LogoutPage';

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
        <img src="../../public/Library-Books1.jpg" />
      </div>
      <a href="#!user"><img className="circle" src="" /></a>
      <a href="#!name"><span className="white-text name">{this.state.name}</span></a>
      <a href="#!email"><span className="white-text email">{this.state.email}</span></a>
    </div></li>
      <li><a href="">View all documents</a></li>
      <li><a href="">My documents</a></li>
      <li><a href="">View All Users</a></li>
      <li><a href="">Search for users></a></li>
      <li><a href="">Search Document</a></li>
      <li><a href = "">Edit Profile</a></li>
       <a href="#" data-activates="slide-out" className="button-collapse">
      <i className="material-icons">menu</i></a>
    </ul>;
    }
    return (
      <div id="navBar">
        <Navbar brand='DOCMe'right>
        <LogoutPage />
          </Navbar>
          {Navigation}
        </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    profileId: state.usersReducer.user.roleId,
    profileName: state.usersReducer.user.fullName,
    profileEmail: state.usersReducer.user.email,
  };
};
export default connect(mapStateToProps)(NavigationBar);

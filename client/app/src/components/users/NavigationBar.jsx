import React from 'react';
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

  componentDidMount() {
     $('.button-collapse').sideNav();
     $('.collapsible').collapsible();
   }

  render() {
    const userName = this.state.name.split('');
    const initials = userName[0].toUpperCase();
    let Navigation = (
      <div>
        <ul id="slide-out" className="side-nav">
          <li>
            <div className="user-view">
              <div className="background profile grey lighten-4">
              <h1 className="initialTag">{initials}</h1>
              </div>
              <span className="name" id="welcomeName">Welcome {this.state.name}!</span>

            </div>
          </li>
          <li>
            <a href="/dashboard">
              <i className="material-icons">dashboard</i>View documents
            </a>
          </li>
          <li>
            <a href="/documents">
              <i className="material-icons">work</i>My documents
            </a>
          </li>
          <li>
            <a href="/searchdocument">
              <i className="material-icons">search</i>Search Document
            </a>
          </li>
          <li>
            <a href="/profile">
              <i className="material-icons">account_box</i>Edit Profile
            </a>
          </li>
        </ul>

      </div>
    );

    if (this.state.profile === 1) {
      Navigation = (
        <ul id="slide-out" className="side-nav">
          <li>
            <div className="user-view">
              <div className="background profile grey lighten-4">
                <h1 className="intitalTag">{initials}</h1>
              </div>
              <span className="name" id="welcomeName">Welcome {this.state.name}!</span>
            </div>
          </li>
          <li>
            <a href="/dashboard">
              <i className="material-icons">work</i>View all documents
            </a>
          </li>
          <li>
            <a href="/documents">
              <i className="material-icons">work</i>My documents
            </a>
          </li>
          <li>
            <a href="/viewusers">
              <i className="material-icons">people</i>Manage Users
            </a>
          </li>
          <li>
            <a href="/searchuser">
              <i className="material-icons">search</i>Search for users
            </a>
          </li>
          <li>
            <a href="/searchdocument">
              <i className="material-icons">search</i>Search Document
            </a>
          </li>
          <li>
            <a href="/profile">
              <i className="material-icons">account_box</i>Edit Profile
            </a>
          </li>
        </ul>
      );
    }
    return (
      <div id="navBar">
        <LogoutPage />
        {Navigation}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profileId: state.usersReducer.user.roleId,
  profileName: state.usersReducer.user.fullName,
  profileEmail: state.usersReducer.user.email
});
export default connect(mapStateToProps)(NavigationBar);

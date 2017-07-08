import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoutPage from './LogoutPage.jsx';

/**
 *
 * this component renders the navigation for admin and non admin user
 * @class NavigationBar
 * @extends {React.Component}
 */
export class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.profileId,
      name: this.props.profileName,
      email: this.props.profileEmail
    };
  }

  /**
   *
   * @return {void} - null
   *
   * @memberof NavigationBar
   */
  componentDidMount() {
    if (this.props.isAuthenticated === true) {
      $('.button-collapse').sideNav();
      $('.collapsible').collapsible();
    }
  }

  render() {
    const profileTag = {
      margin: 0
    };
    const userName = this.state.name.split('');
    const initials = userName[0].toUpperCase();
    let Navigation = (
      <div>
        <ul id="slide-out" className="side-nav">
          <li>
            <div className="user-view">
              <div className="background profile grey lighten-4">
                <h1 className="initialTag" style={profileTag}>{initials}</h1>
              </div>
              <span className="name" id="welcomeName">
                Welcome {this.state.name}!
              </span>

            </div>
          </li>
          <li>
            <Link to="/dashboard">
              <i className="material-icons">dashboard</i>View documents
            </Link>
          </li>
          <li>
            <Link to="/documents">
              <i className="material-icons">work</i>My documents
            </Link>
          </li>
          <li>
            <Link to="/searchdocument">
              <i className="material-icons">search</i>Search Document
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <i className="material-icons">account_box</i>Edit Profile
            </Link>
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
              <span className="name" id="welcomeName">
                Welcome {this.state.name}!
              </span>
            </div>
          </li>
          <li>
            <Link to="/dashboard">
              <i className="material-icons">work</i>View all documents
            </Link>
          </li>
          <li>
            <Link to="/documents">
              <i className="material-icons">work</i>My documents
            </Link>
          </li>
          <li>
            <Link to="/viewusers">
              <i className="material-icons">people</i>Manage Users
            </Link>
          </li>
          <li>
            <Link to="/searchuser">
              <i className="material-icons">search</i>Search for users
            </Link>
          </li>
          <li>
            <Link to="/searchdocument">
              <i className="material-icons">search</i>Search Document
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <i className="material-icons">account_box</i>Edit Profile
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <div id="navBar">
        {/* <LogoutPage /> */}
        {Navigation}
      </div>
    );
  }
}
NavigationBar.propTypes = {
  profileId: PropTypes.number.isRequired,
  profileEmail: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,

};

const mapStateToProps = state => ({
  profileId: state.usersReducer.user.roleId,
  profileName: state.usersReducer.user.fullName,
  profileEmail: state.usersReducer.user.email,
  isAuthenticated: state.usersReducer.isAuthenticated
});
export default connect(mapStateToProps)(NavigationBar);

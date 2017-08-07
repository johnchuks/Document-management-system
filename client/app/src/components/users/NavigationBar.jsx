import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoutPage from './LogoutPage.jsx';
import { getUser } from '../../actions/userActions';

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
      profile: this.props.roleId,
      userId: this.props.id,
      name: this.props.profileName,
      email: this.props.profileEmail
    };
  }

  /**
   * componentwillmount function get the logged in user details
   * before the component mounts
   * @return {void} - null
   * @memberof NavigationBar
   */
  componentWillMount() {
    this.props.getUser(this.state.userId);
  }
  /**
   *
   * @return {void} - null
   * this function checks if the user is authenticated upon mounting
   * @memberof NavigationBar
   */
  componentDidMount() {
    if (this.props.isAuthenticated === true) {
      $('.button-collapse').sideNav();
      $('.collapsible').collapsible();
    }
  }
  /**
   *
   * @return {void} - null
   * @param {object} nextProps - object of authenticated user
   * @memberof NavigationBar
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.profileName,
      email: nextProps.profileEmail
    });
  }

  render() {
    const profileTag = {
      margin: 0
    };
    const userName = this.state.name.split('');

    const initials = userName[0].toUpperCase();

    const nonAdminUser = [
      {
        to: '/dashboard',
        icon: 'dashboard',
        text: 'View Documents',
        key: 'documentNav'
      },
      {
        to: '/documents',
        icon: 'work',
        text: 'My Documents',
        key: 'mydocumentNav'
      },
      {
        to: '/document/search',
        icon: 'search',
        text: 'Search Documents',
        key: 'searchdocumentNav'
      },
      {
        to: '/profile',
        icon: 'account_box',
        text: 'Edit Profile',
        key: 'editprofileNav'
      }
    ];
    const adminUser = [
      ...nonAdminUser,
      {
        to: '/user/search',
        icon: 'search',
        text: 'search Users',
        key: 'searchuserNav'
      },
      {
        to: '/users/manage',
        icon: 'people',
        text: 'Manage Users',
        key: 'manageusersNav'
      }
    ];

    const Navigation = (
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
          {this.state.profile !== 1
            ? nonAdminUser.map(({ to, icon, text, key }) => (
                <li key={key}>
                  <Link id={key} to={to}>
                    <i className="material-icons">{icon}</i>{text}
                  </Link>
                </li>
              ))
            : adminUser.map(({ to, icon, text, key }) => (
                <li key={key}>
                  <Link id={key} to={to}>
                    <i className="material-icons">{icon}</i>{text}
                  </Link>
                </li>
              ))}

        </ul>
      </div>
    );
    return (
      <div id="navBar">
        <LogoutPage />
        {Navigation}
      </div>
    );
  }
}
NavigationBar.propTypes = {
  roleId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  profileEmail: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  roleId: state.usersReducer.user.roleId,
  id: state.usersReducer.user.id,
  profileName: state.usersReducer.user.fullName,
  profileEmail: state.usersReducer.user.email,
  isAuthenticated: state.usersReducer.isAuthenticated
});
export default connect(mapStateToProps, { getUser })(NavigationBar);

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchUser } from '../../actions/userActions';
import NavigationBar from './NavigationBar.jsx';
import AllUsersList from './AllUsersList.jsx';

/**
 *
 * renders all the users in the application
 * @class ViewAllUsers
 * @extends {React.Component}
 */
class ViewAllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: []
    };
  }
  /**
   * dispatches the fetch user action
   * @return{*} - null
   * @memberof ViewAllUsers
   */
  componentDidMount() {
    if (this.props.isAuthenticated === false) {
      this.props.history.push('/');
    }
    $('.button-collapse').sideNav('hide');
    this.props.fetchUser();
  }
  /**
   *
   * @return {*} updated state of the users list
   * @param {*} nextProps - new props of users from the store
   * @memberof ViewAllUsers
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ allUsers: nextProps.usersList });
  }
  render() {
    if (this.props.isAuthenticated === false) return null;
    const users = this.state.allUsers.filter(user => user.roleId !== 1);
    return (
      <div>
        <NavigationBar />
        <h5>Manage Users </h5>
        <AllUsersList allUsers={users} />
        </div>
    );
  }
}
ViewAllUsers.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  usersList: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  usersList: state.usersReducer.users,
  isAuthenticated: state.usersReducer.isAuthenticated
});
export default
  connect(mapStateToProps, { fetchUser })(withRouter(ViewAllUsers));

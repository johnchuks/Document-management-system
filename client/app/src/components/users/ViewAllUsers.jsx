import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { fetchUser } from '../../actions/userActions';
import NavigationBar from './NavigationBar.jsx';
import AllUsersList from './AllUsersList.jsx';

/**
 *
 * renders all the users in the application
 * @class ViewAllUsers
 * @extends {React.Component}
 */
export class ViewAllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 4,
      offset: 0,
      allUsers: [],
      pageCount: 0
    };
    this.handlePageChange = this.handlePageChange.bind(this);
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
    const { limit, offset } = this.state;
    this.props.fetchUser({ limit, offset });
  }
  /**
   *
   * @return {*} updated state of the users list
   * @param {*} nextProps - new props of users from the store
   * @memberof ViewAllUsers
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ allUsers: nextProps.usersList, pageCount: nextProps.pagination.pageCount });
  }
  handlePageChange(page) {
    const selected = page.selected;
    const offset = Math.ceil(selected * this.state.limit);
    this.setState({ offset }, () => {
      const { limit } = this.state;
      this.props.fetchUser({ limit, offset });
    });
  }
  render() {
    const { pageCount } = this.state;
    if (this.props.isAuthenticated === false) return null;
    const users = this.state.allUsers.filter(user => user.roleId !== 1);
    return (
      <div>
        <NavigationBar />
        <h5 className="manage-users">Manage Users </h5>
        <AllUsersList allUsers={users} />
        <div className="rows">
          <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={pageCount}
          initialPage={0}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
          </div>
        </div>
    );
  }
}
ViewAllUsers.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  usersList: PropTypes.array,
  pagination: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  usersList: state.usersReducer.users,
  pagination: state.usersReducer.pagination,
  isAuthenticated: state.usersReducer.isAuthenticated
});
export default
  connect(mapStateToProps, { fetchUser })(withRouter(ViewAllUsers));

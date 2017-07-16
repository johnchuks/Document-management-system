import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import NavigationBar from '../users/NavigationBar.jsx';
import { searchUser } from '../../actions/userActions';
import SearchedUsersList from './SearchedUsersList.jsx';

/**
 *
 * searches for users and returns the search results
 * @class SearchUsers
 * @extends {React.Component}
 */
export class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      limit: 6,
      offset: 0,
      searchList: []
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**
   *
   * @return {*} - null
   * @memberof SearchUsers
   */
  componentDidMount() {
    if (this.props.isAuthenticated === false) {
      this.props.history.push('/');
    }
    $('.button-collapse').sideNav('hide');
  }
  componenentWillReceiveProps(nextProps) {
    this.setState({
      searchList: nextProps.searchList
    });
  }
  /**
   *
   * @return{*} - updated state of the searchString
   * @param {string} event - onchange value for from search input field
   * @memberof SearchUsers
   */
  onHandleChange(event) {
    this.setState({ searchString: event.target.value });
  }
  /**
   *
   * @return{*} returns the search list from redux store
   * @param {*} event - null
   * @memberof SearchUsers
   */
  onSubmit(event) {
    event.preventDefault();
    const { offset, searchString, limit } = this.state;
    this.props.searchUser({ offset, searchString, limit }).then((error) => {
      if (!error) {
        this.setState({ searchList: this.props.searchList });
      } else {
        toastr.error(error.response.data.message);
      }
    });
  }
  /**
   *
   *
   * @param {any} data
   * @memberof SearchUsers
   */
  handlePageChange(data) {
    const selected = data.selected;
    const { limit, searchString } = this.state;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset }, () => {
      this.props.searchUser({ offset, searchString, limit });
    });
  }

  render() {
    if (this.props.isAuthenticated === false) return null;
    const { searchList } = this.state;

    const searchUsersList = searchList.filter(
      user => user.roleId !== 1
    );
    return (
      <div>
        <NavigationBar />
        <br />
        <h4 className="searchHeading">Search For Users</h4>
        <div className="searchBar">
          <input
            id="searchBar"
            type="text"
            name="search"
            onChange={this.onHandleChange}
            placeholder="Search.."
          />
          <button
            className="waves-effect waves-light btn orange"
            id="searchButton"
            onClick={this.onSubmit}
            type="submit"
          >
            Search
          </button>
        </div>
        <SearchedUsersList users={searchUsersList} />
        <div className="rows">
        { searchList.length > 0 ?
         <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={this.props.pageCount}
          initialPage={0}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
        : ''
        }
        </div>
      </div>
    );
  }
}
SearchUsers.propTypes = {
  searchList: PropTypes.array,
  searchUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  pageCount: PropTypes.number,
  isAuthenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  searchList: state.usersReducer.users,
  pageCount: state.usersReducer.pagination,
  isAuthenticated: state.usersReducer.isAuthenticated
});
export default
  connect(mapStateToProps, { searchUser })(withRouter(SearchUsers));

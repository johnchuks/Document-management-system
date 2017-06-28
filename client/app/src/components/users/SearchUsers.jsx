import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import NavigationBar from '../users/NavigationBar.jsx';
import { searchUser } from '../../actions/userActions';
import SearchedUsersList from './SearchedUsersList.jsx';

class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searchList: [],
      error: {}
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onHandleChange(event) {
    this.setState({ searchString: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.searchUser(this.state).then((error) => {
      if (!error) {
        this.setState({ searchList: this.props.search });
      } else {
        this.setState({ error: error.response.data.message });
        toastr.error(this.state.error);
      }
    });
  }
  render() {
    const searchUsersList = this.state.searchList;
    const searchUsersListFiltered = searchUsersList.filter(user =>
     user.roleId !== 1);
    const inputStyle = {
      width: '50%',
      marginLeft: '350px'
    };
    return (
      <div>
      <NavigationBar />
      <br/>
      <h4 id="searchHeading">Search For Users</h4>
      <div className="searchBar">
        <input id="searchBar" type="text" name="search"
        onChange={this.onHandleChange} placeholder="Search.."
        style={inputStyle} />
        <button className="waves-effect waves-light btn orange"
         id="searchButton" onClick={this.onSubmit} type="submit">Search</button>
        </div>
        <SearchedUsersList users={searchUsersListFiltered} />
    </div>
    );
  }
}
const mapStateToProps = state => ({
  search: state.usersReducer.users
});
export default connect(mapStateToProps, { searchUser })(SearchUsers);

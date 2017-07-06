import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import NavigationBar from '../users/NavigationBar.jsx';
import { searchDocument } from '../../actions/documentActions';
import SearchedDocumentList from '../documents/SearchedDocumentList.jsx';

/**
 *
 * searches for documents for the user
 * @export
 * @class SearchDocument
 * @extends {React.Component}
 */
class SearchDocuments extends React.Component {
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
  /**
   *
   *when the component mounts the side navigation bar becomes hidden
   * @return {null} - null
   * @memberof SearchDocument
   */
  componentDidMount() {
    $('.button-collapse').sideNav('hide');
  }
  /**
   *
   *@return {null} - null
   * @param {string} event - value from the search input field
   * @memberof SearchDocument
   */
  onHandleChange(event) {
    this.setState({ searchString: event.target.value });
  }
  /**
   *
   * @returns {*} - dispatches the search document action on click
   * @param {*} event null
   * @memberof SearchDocument
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.searchDocument(this.state).then((error) => {
      if (!error) {
        this.setState({ searchList: this.props.searchResult });
      } else {
        this.setState({ error: error.response.data.message });
        toastr.error(this.state.error);
      }
    });
  }
  render() {
    const searchList = this.state.searchList;
    const searchListFiltered = searchList.filter((document) => {
      if (document.access === 'role') {
        if (document.User.roleId === this.props.userRoleId ||
          this.props.userRoleId === 1) {
          return document;
        }
      }
      if (document.access === 'public') {
        return document;
      }
      return 'No documents found';
    });
    return (
      <div>
        <NavigationBar />
        <br />
        <h5>Search For Documents</h5>
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
        <SearchedDocumentList document={searchListFiltered} />
      </div>
    );
  }
}
SearchDocuments.propTypes = {
  searchResult: PropTypes.array,
  userRoleId: PropTypes.number.isRequired,
  searchDocument: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  searchResult: state.fetchDocuments.document.rows,
  userRoleId: state.usersReducer.user.roleId
});
export default connect(mapStateToProps, { searchDocument })(SearchDocuments);

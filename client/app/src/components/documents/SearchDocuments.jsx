/* eslint import/no-named-as-default:off */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import toastr from 'toastr';
import NavigationBar from '../users/NavigationBar.jsx';
import { searchDocument } from '../../actions/documentActions';
import SearchedDocumentList from '../documents/SearchedDocumentList.jsx';
import Footer from '../users/Footer.jsx';

/**
 *
 * searches for documents for the user
 * @export
 * @class SearchDocument
 * @extends {React.Component}
 */
export class SearchDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      limit: 6,
      offset: 0,
      searchList: [],
      errors: {}
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
   *
   *when the component mounts the side navigation bar becomes hidden
   * @return {null} - null
   * @memberof SearchDocument
   */
  componentDidMount() {
    if (this.props.isAuthenticated === false) {
      return this.props.history.push('/');
    }
    $('.button-collapse').sideNav('hide');
  }
  /**
   *
   * @return {void} - null
   * @param {array|error} nextProps - updated state from the store
   * @memberof SearchDocuments
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      searchList: nextProps.searchResult,
      errors: nextProps.error
    }, () => {
      if (this.state.errors.message) {
        toastr.error(this.state.errors.message);
      }
    });
  }
  /**
   *
   *@return {void} - null
   * @param {string} event - on change event from the search input field
   * @memberof SearchDocument
   */

  onHandleChange(event) {
    this.setState({ searchString: event.target.value });
  }
  /**
   *
   * @returns {void} - dispatches the search document action on click
   * @param {void} event - null
   * @memberof SearchDocument
   */
  onSubmit(event) {
    event.preventDefault();
    const { offset, searchString, limit } = this.state;
    this.props.searchDocument({ offset, searchString, limit });
  }
  /**
   *
   * @return {void} - void
   * @param {object} data - object containing currently selected page
   * @memberof SearchDocuments
   */
  handlePageChange(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.state.limit);
    this.setState({ offset }, () => {
      const { searchString, limit } = this.state;
      this.props.searchDocument({ offset, searchString, limit });
    });
  }
  render() {
    const { searchList } = this.state;


    if (this.props.isAuthenticated === false) return null;
    return (
      <div>
        <NavigationBar />
        <br />
        <h5 className="search-doc">Search For Documents</h5>
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
          >
            Search
          </button>
        </div>
        <SearchedDocumentList document={searchList} />
        <div className="rows">
         {searchList.length > 0 ?
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
        /> : '' }
        </div>
        <Footer />
      </div>
    );
  }
}
SearchDocuments.propTypes = {
  searchResult: PropTypes.array,
  pageCount: PropTypes.number,
  searchDocument: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  searchResult: state.documentReducer.document,
  pageCount: state.documentReducer.pagination.pageCount,
  isAuthenticated: state.usersReducer.isAuthenticated,
  error: state.documentReducer.error
});
export default
  connect(mapStateToProps, { searchDocument })(withRouter(SearchDocuments));

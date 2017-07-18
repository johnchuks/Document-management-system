import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
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
export class SearchDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      limit: 6,
      offset: 0,
      searchList: [],
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
   *
   * @param {any} nextProps
   * @memberof SearchDocuments
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ searchList: nextProps.searchResult });
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
   * @returns {void} - dispatches the search document action on click
   * @param {void} event null
   * @memberof SearchDocument
   */
  onSubmit(event) {
    event.preventDefault();
    const { offset, searchString, limit } = this.state;
    this.props.searchDocument({ offset, searchString, limit }).then((error) => {
      if (!error) {
        this.setState({ searchList: this.props.searchResult });
      } else {
        toastr.error(error.response.data.message);
      }
    });
  }
  /**
   *
   *
   * @param {any} data
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
      </div>
    );
  }
}
SearchDocuments.propTypes = {
  searchResult: PropTypes.array,
  pageCount: PropTypes.number,
  searchDocument: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  searchResult: state.documentReducer.document,
  pageCount: state.documentReducer.pagination.pageCount,
  isAuthenticated: state.usersReducer.isAuthenticated
});
export default
  connect(mapStateToProps, { searchDocument })(withRouter(SearchDocuments));

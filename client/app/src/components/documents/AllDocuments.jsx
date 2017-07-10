import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import striptags from 'striptags';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { fetchAllDocuments } from '../../actions/documentActions';
//import NavigationBar from '../../components/users/NavigationBar';
import DocumentView from '../documents/DocumentView.jsx';

/**
 *
 *Renders all public and role documents
 * @export
 * @class AllDocuments
 * @extends {React.Component}
 */
export class AllDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      offset: 0,
      limit: 6,
      roleId: ''
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**
   * @returns {null}
   *Dispatches the fetch All document action before the component
   * mounts
   * @memberof AllDocuments
   */
  componentDidMount() {
    $('.button-collapse').sideNav('hide');
    if (this.props.isAuthenticated === false) {
      this.props.history.push('/');
    }
    this.props.fetchAllDocuments(this.state);
  }
  /** updates the state of documents and role id upon rendering
   *
   *
   * @param {object} nextProps - updated props from the store
   * @return {null} - returns null
   * @memberof AllDocuments
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      documents: nextProps.publicDocument,
      roleId: nextProps.roleId
    });
  }
  /** handles the pagination event and changes the offsets
   * upon moving to a different page
   *
   * @param {number} page - the selected page number
   * @returns {null} - returns null
   * @memberof AllDocuments
   */
  handlePageChange(page) {
    const selected = page.selected;
    const offset = Math.ceil(selected * this.state.limit);
    this.setState({ offset }, () => {
      this.props.fetchAllDocuments(this.state);
    });
  }

  render() {
    if (this.props.isAuthenticated === false) return null;
    const publicRoleDocument = this.state.documents;
    return (
      <div>
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
        <div className="container">
          <div className="row">
            {publicRoleDocument.map((documents, index) => (
              <div className="col s12 m4" key={index}>
                <div className="card small grey lighten-4">
                  <div className="card-content black-text">
                    <span className="card-title">{documents.title}</span>
                    <p>{striptags(documents.content)}</p>
                  </div>
                  <div className="card-action">
                    <p>{documents.access}</p>
                      <DocumentView documentView={documents} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
AllDocuments.propTypes = {
  publicDocument: PropTypes.array.isRequired,
  pageCount: PropTypes.number,
  roleId: PropTypes.number.isRequired,
  fetchAllDocuments: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  publicDocument: state.fetchDocuments.document,
  pageCount: state.fetchDocuments.pagination.pageCount,
  roleId: state.usersReducer.user.roleId,
  isAuthenticated: state.usersReducer.isAuthenticated
});
export default
  connect(mapStateToProps, { fetchAllDocuments })(withRouter(AllDocuments));

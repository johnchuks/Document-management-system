import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import striptags from 'striptags';
import ReactPaginate from 'react-paginate';
import { fetchAllDocuments } from '../../actions/documentActions';
import DocumentView from '../documents/DocumentView.jsx';

class ViewPublicDouments extends React.Component {
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
  componentDidMount() {
    this.props.dispatch(fetchAllDocuments(this.state));
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      documents: nextProps.publicDocument,
      roleId: nextProps.userDetails
    });
  }
  handlePageChange(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.state.limit);
    this.setState({ offset }, () => {
      this.props.dispatch(fetchAllDocuments(this.state));
    });
  }

  render() {
    const userRole = this.state.roleId;
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
                    <DocumentView documentView={documents} />
                  </div>
                  <div className="card-action">
                    <p>{documents.access}</p>
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
const mapStateToProps = state => ({
  publicDocument: state.fetchDocuments.document,
  pageCount: state.fetchDocuments.pagination.pageCount,
  userDetails: state.usersReducer.user.roleId
});
export default connect(mapStateToProps)(ViewPublicDouments);

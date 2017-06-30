import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import striptags from 'striptags';
import { fetchDocument } from '../../actions/documentActions';
import DocumentForm from './DocumentForm.jsx';
import NavigationBar from '../users/NavigationBar.jsx';
import UpdateDocumentForm from './UpdateDocumentForm.jsx';
import DeleteDocument from './DeleteDocument.jsx';

class ViewUserDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user,
      document: [],
      offset: 0,
      limit: 6
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchDocument(this.state));
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ document: nextProps.document });
  }
  handlePageChange(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.state.limit);
    this.setState({ offset }, () => {
      this.props.dispatch(fetchDocument(this.state));
    });
  }

  render() {
    const rowStyle = {
      marginLeft: '200px',
      marginTop: '60px'
    };
    const userDocuments = this.state.document;
    return (
      <div>
        <DocumentForm />
        <NavigationBar />
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
        <h4 id="searchHeading">My Documents</h4>
        <div className="container">
          <div className="row">
            {userDocuments.map(document => (
              <div className="col s12 m4" key={document.id}>
                <div className="card small  grey lighten-4">
                  <div className="card-content black-text">
                    <span className="card-title" value={document.id}>
                      {document.title}
                    </span>
                    <p>{striptags(document.content)}</p>
                  </div>
                  <div className="card-action">
                    <p>{document.access}</p>
                    <DeleteDocument cardDocument={document.id} />
                    <UpdateDocumentForm cardDocuments={document} />
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
  user: state.usersReducer.user.id,
  document: state.fetchDocuments.document,
  pageCount: state.fetchDocuments.pagination.pageCount
});
export default connect(mapStateToProps)(ViewUserDocuments);

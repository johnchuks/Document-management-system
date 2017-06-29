import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDocument } from '../../actions/documentActions';
import DocumentForm from './DocumentForm.jsx';
import NavigationBar from '../users/NavigationBar.jsx';
import UpdateDocumentForm from './UpdateDocumentForm.jsx';
import DeleteDocument from './DeleteDocument.jsx';

class ViewUserDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user,
      document: this.props.document,
      delete: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchDocument(this.state.userId));
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ document: nextProps.document });
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
                    <p>{document.content}</p>
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
  document: state.fetchDocuments.document
});
export default connect(mapStateToProps)(ViewUserDocuments);

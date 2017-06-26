import React from 'react';
import { connect } from 'react-redux';
import { fetchDocument } from '../actions/documentActions';
import DocumentForm from '../components/DocumentForm';
import NavigationBar from './NavigationBar';
import UpdateDocumentForm from './UpdateDocumentForm';
import DeleteDocument from './DeleteDocument';

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
    const docs = this.state.document;
    return (
      <div>
        <NavigationBar />
        {
          docs.map((doc) => {
            return (
              <div className="row"key={doc.id}>
                <div className="col s12 m4">
                  <div className="card">
                    <div className="card-content black-text">
                      <span className="card-title" value={doc.id}>{doc.title}</span>
                      <p>{doc.content}</p>
                    </div>
                    <div className="card-action">
                        <div className="m6">
                        <DeleteDocument cardDocument={doc.id}/>
                      </div>
                      <div className=" m6">
                        <UpdateDocumentForm cardDocuments={doc.id}/>
                      </div>
                      </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user.id,
    document: state.fetchDocuments.document
  };
};
export default connect(mapStateToProps)(ViewUserDocuments);

import React from 'react';
import { connect } from 'react-redux';
import { fetchDocument } from '../actions/documentActions';
import DocumentForm from '../components/DocumentForm';
import NavigationBar from './NavigationBar';

class ViewUserDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user,
      document: []
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchDocument(this.state.userId)).then(() => {
      this.setState({ document: this.props.document });
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ document: nextProps.document });
  }

  render() {
    console.log(this.state, 'next props');
    const docs = this.state.document;
    return (
      <div>
        <NavigationBar />
        <DocumentForm />
        {
          docs.map((doc) => {
            return (
              <div className="row"key={doc.id}>
                <div className="col s12 m4">
                  <div className="card">
                    <div className="card-content black-text">
                      <span className="card-title">{doc.title}</span>
                      <p>{doc.content}</p>
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
import React from 'react';
import { connect } from 'react-redux';
import { fetchAllDocuments } from '../actions/documentActions';

class ViewPublicDouments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: this.props.publicDocument,
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchAllDocuments());
  }

  render() {
    const publicDocument = this.props.publicDocument.filter((documents) => {
      return documents.access === 'public';
    });

    return (
        <div>
            {publicDocument.map((documents) => (
                <div className="row"key={documents.id}>
                <div className="col s12 m4">
                  <div className="card">
                    <div className="card-content black-text">
                      <span className="card-title">{documents.title}</span>
                      <p>{documents.content}</p>
                    </div>
                  </div>
                </div>
              </div>
                ))}
        </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    publicDocument: state.fetchDocuments.document,
    userDetails: state.usersReducer.user.id
  }
};
export default connect(mapStateToProps, null)(ViewPublicDouments);

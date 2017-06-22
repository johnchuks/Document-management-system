import React from 'react';
import { connect } from 'react-redux';
import { fetchAllDocuments } from '../actions/documentActions';

class ViewRoleDouments extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllDocuments());
  }
  render() {
    const roleDocs = this.props.roleDocument.filter((documents) => {
      return documents.access === 'public'; && documents.User.roleId === this.props.userDetails;
    });

    return (
        <div>
            {publicDocs.map((document) => (
                <div className="row"key={document.id}>
                <div className="col s12 m4">
                  <div className="card">
                    <div className="card-content black-text">
                      <span className="card-title">{document.title}</span>
                      <p>{document.content}</p>
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
    roleDocument: state.fetchDocuments.document,
    userDetails: state.usersReducer.user.id
  }
};
export default connect(mapStateToProps, null)(ViewRoleDouments);

import React from 'react';
import { connect } from 'react-redux';
import { fetchAllDocuments } from '../../actions/documentActions';

class ViewRoleDouments extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllDocuments());
  }
  render() {
    const roleStyle = {
      marginLeft: '200px',
      marginTop: '60px',
    };
    const roleDocuments = this.props.roleDocument.filter((documents) => {
      return documents.access !== 'public' && documents.User.roleId === this.props.userDetails;
    });

    return (
        <div>
          <div className="container">
            <div className= "row" style={roleStyle}>
            {roleDocuments.map((document) => (
                <div className="col s12 m4" key={document.id}>
                  <div className="card small  grey lighten-4">
                    <div className="card-content black-text">
                      <span className="card-title">{document.title}</span>
                      <p>{document.content}</p>
                    </div>
                    <div className="card-action black-text">
                      <p>{document.access}</p>
                  </div>
                </div>
                </div>
                ))}
              </div>
          </div>
        </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    roleDocument: state.fetchDocuments.document,
    userDetails: state.usersReducer.user.roleId
  }
};
export default connect(mapStateToProps, null)(ViewRoleDouments);

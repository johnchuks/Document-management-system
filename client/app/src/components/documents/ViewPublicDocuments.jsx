import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAllDocuments } from '../../actions/documentActions';

class ViewPublicDouments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      limit: 6
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchAllDocuments(this.state));
    console.log(this.state)
  }

  render() {
    const rowStyle = {
      marginLeft: '200px',
      marginTop: '60px',
    };
    const publicRoleDocument = this.props.publicDocument.filter((documents) => {
      if (documents.access === 'public') {
        return documents;
      } else if (documents.access === 'role') {
        if (this.props.userDetails === documents.User.roleId || this.props.userDetails === 1) {
          return documents;
        }
      }
    });
    console.log(publicRoleDocument);
    return (
        <div>
          <div className="container">
            <div className="row" style={rowStyle} >
            {publicRoleDocument.map((documents, index) => (
                <div className="col s12 m4" key={index}>
                  <div className="card small grey lighten-4">
                    <div className="card-content black-text">
                      <span className="card-title">{documents.title}</span>
                      <p>{documents.content}</p>
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
const mapStateToProps = (state, ownProps) => ({
  publicDocument: state.fetchDocuments.document,
  userDetails: state.usersReducer.user.id
});
export default connect(mapStateToProps, null)(ViewPublicDouments);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAllDocuments } from '../../actions/documentActions';

class ViewPublicDouments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      offset: 0,
      limit: 6
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchAllDocuments(this.state));
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ documents: nextProps.publicDocument });
  }

  render() {
    const publicRoleDocument = this.state.documents.filter((documents) => {
      if (documents.access === 'public') {
        return documents;
      }
      if (documents.access === 'role') {
        if (this.props.userDetails === documents.User.roleId
         || this.props.userDetails === 1) {
          return documents;
        }
      }
      // if (document.access === 'private') {
      //   if (this.props.userDetails === 1) {
      //     return document;
      //   }
      // }
      return 'No documents found';
    });
    return (
        <div>
          <div className="container">
            <div className="row">
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
const mapStateToProps = state => ({
  publicDocument: state.fetchDocuments.document,
  userDetails: state.usersReducer.user.id
});
export default connect(mapStateToProps)(ViewPublicDouments);

import React from 'react';
import { connect } from 'react-redux';
import { fetchAllDocuments } from '../../actions/documentActions';

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
    const rowStyle = {
      marginLeft: '200px',
      marginTop: '60px',
    };
    const publicDocument = this.props.publicDocument.filter((documents) => {
      return documents.access === 'public';
    });
    console.log(publicDocument);
    return (
        <div>
          <div className="container">
            <div className="row" style={rowStyle}>
            {publicDocument.map((documents) => (
                <div className="col s12 m4" key={document.id}>
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
const mapStateToProps = (state, ownProps) => {
  return {
    publicDocument: state.fetchDocuments.document,
    userDetails: state.usersReducer.user.id
  };
};
export default connect(mapStateToProps, null)(ViewPublicDouments);

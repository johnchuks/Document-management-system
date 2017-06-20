import React from 'react';
import { connect } from 'react-redux';
import { fetchDocument } from '../actions/documentActions';

class ViewUserDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchDocument(this.state.userId));
  }

  render() {
    console.log(this.state);
    const docs = this.props.document;
    return (
      <div>
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
    user: state.createUsersReducer.user.id,
    document: state.fetchDocuments.document
  };
};
export default connect(mapStateToProps)(ViewUserDocuments);

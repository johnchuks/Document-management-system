import React from 'react';
import { connect } from 'react-redux';
import { createDocument, fetchDocumentAction } from '../actions/documentActions';

import { Modal, Button } from 'react-materialize';

class DashboardPage extends React.Component {
  constructor(props) {
      super(props);
    this.state = {
      title:'',
      content: '',
      value: '',
      userId: this.props.userId,
      documentsId: this.props.documentId,
    };
    this.handleChange = this.handleChange.bind(this);
    this.optionChange = this.optionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  optionChange(event) {
    this.setState({ value: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.document(this.state);
    console.log(this.state);
  }
  componentDidMount() {
    this.props.dispatch(fetchDocumentAction(this.state.documentsId));
  }
  // componentWillUnmount() {

  // }
  render() {
    console.log(this.state);
    return (
      <div>
        <Modal id="titleHeader"
	header='Create new Document'
	trigger={<Button className="btn-floating btn-large red">
            <i className="material-icons md-36">create</i>
  </Button>}>
          <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                <input id="title" name="title"
                  onChange={this.handleChange} />
                  <label htmlFor="title">Title</label>
              </div>
                <div className="input-field col s12">
                <textarea id="textarea" name="content"
                  className="materialize-textarea" onChange={this.handleChange}>
                </textarea>
                <label htmlFor="textarea">Content</label>
              </div>
                <div className="col s6">
                 <label>Select role type</label>
                 <select className="browser-default"
                   onChange={this.optionChange} value={this.state.value}>
                    <option value="" disabled selected>Choose your option</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="role">Role</option>
                  </select>
                </div>
                <Button className="btn modal-action modal-close btn-large blue"
                  id="documentbutton"
                  onClick={this.onSubmit}>Create</Button>
              </div>
           </form>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.loginUsersReducer.user.id,
    documentId: state.fetchDocuments.document.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    document: (documentDetails) => dispatch(createDocument(documentDetails))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

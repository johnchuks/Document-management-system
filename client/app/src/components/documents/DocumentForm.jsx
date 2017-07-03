import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';
import striptags from 'striptags';
import { Modal, Button } from 'react-materialize';
import { createDocument } from '../../actions/documentActions';

class DocumentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      value: '',
      userId: this.props.user,
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.optionChange = this.optionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleEditorChange(event) {
    this.setState({ content: event.target.getContent()});
  }
  optionChange(event) {
    this.setState({ value: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props
      .document(this.state)
      .then(() => {}, error => this.setState({ errors: error.response.data }));
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Modal
          id="titleHeader"
          header="Create new Document"
          trigger={
            <div className="fixed-action-btn horizontal">
              <Button className="btn-floating btn-large red">
                <i className="material-icons md-36">create</i>
              </Button>
            </div>
          }
        >
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input id="title" name="title" onChange={this.handleChange} />
                <label htmlFor="title">Title</label>
                {errors.title &&
                  <span className="alert alert-danger">
                    {errors.title}
                  </span>}
              </div>
              <div className="input-field col s12">
                <TinyMCE
                content={this.state.content}
                  onChange={this.handleEditorChange}
                />
                {errors.content &&
                  <div className="alert alert-danger">
                    {errors.content}
                  </div>}
              </div>
              <div className="col s6">
                <label>Select role type</label>
                <select
                  className="browser-default"
                  onChange={this.optionChange}
                  value={this.state.value}
                >
                  <option value="" disabled>Choose your option</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="role">Role</option>
                </select>
                {errors.value &&
                  <div className="alert alert-danger">
                    {errors.value}
                  </div>}
              </div>
              <Button
                className="btn modal-action btn-large blue"
                id="documentbutton"
                onClick={this.onSubmit}
              >
                Create
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.usersReducer.user.id
});
const mapDispatchToProps = dispatch => ({
  document: documentDetails => dispatch(createDocument(documentDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm);

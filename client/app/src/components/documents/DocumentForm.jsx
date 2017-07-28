import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import TinyMCE from 'react-tinymce';
import { Modal, Button } from 'react-materialize';
import { createDocument } from '../../actions/documentActions';

/**
 *
 * creates a document by filling the form field
 * @export
 * @class DocumentForm
 * @extends {React.Component}
 */
export class DocumentForm extends React.Component {
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
  /**
   *This function receives error messages as props from the
   * store if they are any
   * @param {object} nextProps  error object from the store
   * @return {void} null
   * @memberof DocumentForm
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.error.message });
  }
  /**
   * handles an on change event filling in the signup form
   * @return {null} - return null
   * @param {string} event - value from each field
   * @memberof DocumentForm
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * Handles change in the Tiny mc editor
   * @returns {void} returns null
   * @param {string} e value from the editor field
   * @memberof DocumentForm
   */
  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }
  /**
   * Handles the onClick funtion
   * @returns {void}  returns null
   * @param {string} event value from the option chnage
   * @memberof DocumentForm
   */
  optionChange(event) {
    this.setState({ value: event.target.value });
  }
  /**
   * Handles the onClick event
   * @return {object} - returns on click of the submit button
   * @param {string} event - null
   * @memberof DocumentForm
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.createDocument(this.state).then(() => {
      if (this.state.errors) {
        toastr.error(this.state.errors);
        this.setState({ errors: {} });
      } else {
        toastr.success('Document created successfully');
      }
    });
  }

  render() {
    return (
      <div>
        <Modal
          id="titleHeader"
          header="New Document"
          trigger={
            <div className="fixed-action-btn horizontal">
              <Button className="btn-floating btn-large red">
                <i id="creatDoc" className="material-icons md-36">create</i>
              </Button>
            </div>
          }
        >
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input name="title" onChange={this.handleChange}
                  className="validate" placeholder="Title..." />
              </div>
              <div className="input-field col s12">
                <TinyMCE
                  config={{
                    plugins: 'link image code',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                  }}
                  content={this.state.content}
                  onChange={this.handleEditorChange}
                />
              </div>
              <div className="col s6">
                <label>Select access type</label>
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
DocumentForm.propTypes = {
  createDocument: PropTypes.func.isRequired,
  user: PropTypes.number,
  error: PropTypes.object
};
const mapStateToProps = state => ({
  user: state.usersReducer.user.id,
  error: state.documentReducer.error
});
const mapDispatchToProps = dispatch => ({
  createDocument: documentDetails => dispatch(createDocument(documentDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm);

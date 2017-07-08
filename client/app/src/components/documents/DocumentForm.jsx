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
    this.setState({ errors: {} });
    this.props.document(this.state).then((error) => {
      if (error) {
        this.setState({ errors: error });
      } else {
        toastr.success('Document created successfully');
      }
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Modal
          id="titleHeader"
          header="New Document"
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
                <input name="title" onChange={this.handleChange}
                  className="validate" placeholder="Title..." />
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
DocumentForm.propTypes = {
  document: PropTypes.func.isRequired,
  user: PropTypes.number
};
const mapStateToProps = state => ({
  user: state.usersReducer.user.id
});
const mapDispatchToProps = dispatch => ({
  document: documentDetails => dispatch(createDocument(documentDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm);

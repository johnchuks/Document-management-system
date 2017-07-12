import React from 'react';
import { Modal, Button } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';
import toastr from 'toastr';
import { updateDocument } from '../../actions/documentActions';

/**
 *  This component updates a specific document
 *
 * @export
 * @class UpdateDocumentForm
 * @extends {React.Component}
 */
export class UpdateDocumentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.cardDocuments.title,
      content: this.props.cardDocuments.content,
      value: this.props.cardDocuments.access,
      documentId: this.props.cardDocuments.id
    };
    this.handleChange = this.handleChange.bind(this);
    this.optionChange = this.optionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  /**
   *
   * @return {*} - null
   * @param {*} event - on change value from the input field
   * @memberof UpdateDocumentForm
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @return {*} - null
   * @param {*} event - on option change value from the select option field
   * @memberof UpdateDocumentForm
   */
  optionChange(event) {
    this.setState({ value: event.target.value });
  }
  /**
   *
   * @return {*} - null
   * @param {*} event - on change value from the text editor
   * @memberof UpdateDocumentForm
   */
  handleEditorChange(event) {
    this.setState({ content: event.target.getContent() });
  }
  /**
   *
   * @return {void} - null
   * @param {void} event - on click event for submitting the form
   * @memberof UpdateDocumentForm
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.updateDocument(this.state).then(() => {
      toastr.success('document updated successfully');
    });
  }

  render() {
    return (
      <div>
        <Modal
          id={`titleHeader${this.state.documentId}`}
          header="update document"
          trigger={
            <div id="editIcon">
              <i className="material-icons md-36" id={this.state.documentId}>
                create
              </i>
            </div>
          }
        >
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.title}
                  className="validate"
                />
                <label htmlFor="title">Title</label>
              </div>
              <div className="input-field col s12">
                <TinyMCE
                  onChange={this.handleEditorChange}
                  content={this.state.content}
                />
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
              </div>
              <Button id="documentbutton"
                className="btn modal-action modal-close orange"
                onClick={this.onSubmit}
              >
                update
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}
UpdateDocumentForm.propTypes = {
  cardDocuments: PropTypes.object.isRequired,
  updateDocument: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  document: state.fetchDocuments.document
});
export default connect(mapStateToProps, { updateDocument })(UpdateDocumentForm);

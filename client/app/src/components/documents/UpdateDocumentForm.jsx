import React from 'react';
import { Modal, Button } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { updateDocument } from '../../actions/documentActions';

class UpdateDocumentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      value: '',
      documentId: this.props.cardDocuments,
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
    console.log(this.state);
    this.props.dispatch(updateDocument(this.state)).then(() => {
      toastr.success('document updated successfully');
    });
  }

  render() {
    console.log(this.props.cardDocuments);
    return (
      <div>
        <Modal id="titleHeader2"
	header="update document"
	trigger={<div id="editIcon"><i className="material-icons md-36" >create</i></div>}>
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
                    <option value="" disabled>Choose your option</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="role">Role</option>
                </select>
                </div>
                <Button className="btn modal-action modal-close orange"
                  id="documentbutton"
                  onClick={this.onSubmit}>update</Button>
              </div>
           </form>
        </Modal>
      </div>
    )
  }
}
UpdateDocumentForm.propTypes = {
  cardDocuments: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => {
  return {
    document: state.fetchDocuments.document
  };
};
export default connect(mapStateToProps)(UpdateDocumentForm);

import React from 'react';
import { Modal, Button } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { deleteDocument } from '../actions/documentActions';

class DeleteDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentId: this.props.cardDocument,
      userId: this.props.user,
    };
    this.onDelete = this.onDelete.bind(this);
  }
  onDelete() {
    event.preventDefault();
    this.props.dispatch(deleteDocument(this.state)).then(() => {
      toastr.success('document deleted successfully');
    })
  }
  render() {
    return (
    <div>
    <Modal
    trigger={<i className="material-icons md-36" id="deleteIcon">delete</i>}
    actions={<div><Button
    className="modal-action modal-close btn orange" id="noButton">No</Button>
    <Button className="modal-action modal-close btn orange" id="yesButton" onClick={this.onDelete}>Yes</Button></div>}>
      <h5 id="h5">Are you sure you want to delete this document</h5>
      </Modal>
      </div>
    );
  }
}
DeleteDocument.propTypes = {
  cardDocument: PropTypes.number.isRequired,
  user: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user.id
  };
};
export default connect(mapStateToProps)(DeleteDocument);

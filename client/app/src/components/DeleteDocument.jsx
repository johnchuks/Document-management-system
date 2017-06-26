import React from 'react';
import { Modal, Button } from 'react-materialize';
import { connect } from 'react-redux';
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
    this.props.dispatch(deleteDocument(this.state));
    console.log(this.state);
  }
  render() {
    console.log(this.props.cardDocument);
    return (
    <div>
    <Modal
    trigger={<i className="material-icons md-36">delete</i>}>
      <h5>Are you sure you want to delete this document</h5>
      <Button className="btn modal-action blue" onClick={this.onDelete} type="submit" data-dismiss="">Delete</Button>
      </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user.id
  };
};
export default connect(mapStateToProps)(DeleteDocument);

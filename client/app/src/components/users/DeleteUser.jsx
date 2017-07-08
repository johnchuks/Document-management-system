import React from 'react';
import { Modal, Button } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { deleteUser } from '../../actions/userActions';


/**
 *
 * Deletes a user by id
 * @export
 * @class DeleteUser
 * @extends {React.Component}
 */
export class DeleteUser extends React.Component {
  constructor(props) {
    super(props);

    this.onDeleteUser = this.onDeleteUser.bind(this);
  }

  /**
   *
   * @returns {*} dispatches a delete user action
   * @memberof DeleteUser
   */
  onDeleteUser() {
    event.preventDefault();
    this.props.deleteUser(this.props.user).then((error) => {
      if (!error) {
        toastr.success('user deleted successfully');
      }
    });
  }

  render() {
    return (
      <div>
        <Modal
          trigger={
            <Button className="waves-effect waves-light btn orange"
              id="deleteUserButton"><i className="material-icons"
                id="deleteUserIcon">delete</i></Button>
          }
          actions={
            <div>
              <Button
                className="modal-action modal-close btn orange"
                id="noButton"
              >
                No
              </Button>
              <Button
                className="modal-action modal-close btn orange"
                id="yesButton"
                onClick={this.onDeleteUser}
              >
                Yes
              </Button>
            </div>
          }
        >
          <h5 id="h5">Are you sure you want to delete this user</h5>
        </Modal>
        </div>
    );
  }
}
DeleteUser.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.number.isRequired
};
export default connect(null, { deleteUser })(DeleteUser);

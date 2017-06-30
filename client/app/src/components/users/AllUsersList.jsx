import React from 'react';
import DeleteUser from './DeleteUser.jsx'

class AllUsersList extends React.Component {
  render() {
    return (
      <div>
        <h5> Manage Users</h5>
        <table className="bordered">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.allUsers.map(user => (
              <tr>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td><DeleteUser user={user.id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default AllUsersList;

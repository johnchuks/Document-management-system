import React from 'react';
import DeleteUser from './DeleteUser.jsx';

const AllUsersList = (props) => {
    return (
      <div>
        <table className="bordered">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.allUsers.map(user => (
              <tr key={user.id}>
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
export default AllUsersList;

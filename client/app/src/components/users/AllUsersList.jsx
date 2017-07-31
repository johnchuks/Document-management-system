import React from 'react';
import PropTypes from 'prop-types';
import DeleteUser from './DeleteUser.jsx';

/**
 *
 *
 * @param {array} props - array of users
 * @returns {*} returns a list of users
 */
const AllUsersList = props => (
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
AllUsersList.propTypes = {
  allUsers: PropTypes.array.isRequired
};
export default AllUsersList;

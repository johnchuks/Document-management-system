import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * renders the searched users list
 * @class SearchedUsersList
 * @param {props} - users array list
 * @extends {React.Component}
 */
const SearchedUsersList = props => (
      <div>
        <table className="bordered">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {props.users.map(user => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
SearchedUsersList.propTypes = {
  users: PropTypes.array.isRequired
};
export default SearchedUsersList;

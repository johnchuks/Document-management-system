import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * renders the searched users list
 * @class SearchedUsersList
 * @extends {React.Component}
 */
class SearchedUsersList extends React.Component {
  render() {
    return (
      <div>
        <table className="bordered">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
SearchedUsersList.propTypes = {
  users: PropTypes.array.isRequired
};
export default SearchedUsersList;

import React from 'react';
import PropTypes from 'prop-types';

class SearchedUsersList extends React.Component {
  render() {
    const rowStyle = {
      marginLeft: '200px',
      marginTop: '60px'
    };
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
              <tr>
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
export default SearchedUsersList;

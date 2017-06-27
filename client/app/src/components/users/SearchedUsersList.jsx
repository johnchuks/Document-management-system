import React from 'react';
import PropTypes from 'prop-types';

class SearchedUsersList extends React.Component {
  render() {
    const rowStyle = {
      marginLeft: '200px',
      marginTop: '60px',
    };
    return (
      <div>
         <div className="container">
          <div className="row" style={rowStyle}>
        {this.props.users.map((user) => {
          return (
                <div className="col s12 m4" key={user.id}>
                  <div className="card small  grey lighten-4">
                    <div className="card-content black-text">
                      <span className="card-title" value={user.id}>{user.fullName}</span>
                      <p>User Name :{user.userName}</p>
                      <br />
                      <p>Email Address: {user.email}</p>
                    </div>
                </div>
                </div>
            );
        })
        }
         </div>
      </div>
    </div>
    );
  }
}
export default SearchedUsersList;

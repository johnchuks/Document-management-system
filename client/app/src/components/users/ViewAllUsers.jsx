import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUser } from '../../actions/userActions';
import NavigationBar from './NavigationBar';

class ViewAllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: []
    };
  }
  componentDidMount() {
    this.props.fetchUser();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ allUsers: nextProps.usersList });
  }
  render() {
    const users = this.state.allUsers.filter((user) => {
      return user.roleId !== 1;
    });
    console.log(users, 'user');
    return (
      <div>
        <NavigationBar />
        </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    usersList: state.usersReducer.users
  };
};
export default connect(mapStateToProps, { fetchUser })(ViewAllUsers);

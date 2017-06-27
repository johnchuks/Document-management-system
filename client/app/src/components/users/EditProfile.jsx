import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { editProfile } from '../../actions/userActions';
import NavigationBar from './NavigationBar';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: this.props.user.fullName,
      userName: this.props.user.userName,
      email: this.props.user.email,
      password: '',
      userId: this.props.user,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log('input',event.target.value)
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.profile(this.state).then(() => {
      toastr.success('Profile updated successfully');
    });
  }
  render() {
    console.log('first name', this.props.user.email)
    const profileStyle = {
      marginLeft: '400px',
    };
    return (
      <div>
      <NavigationBar />
      <br />
      <h4 id="searchHeading">Edit Profile</h4>
        <div id="formField" style={profileStyle}>
          <div className="col s12 z-depth 5" >
         <div className="row">
        <div className="input-field col s6">
          <input id="full_name" name="fullName" type="text"
          onChange={this.onChange}
          value={this.state.fullName}
          className="validate" />
          <label htmlFor="full_name">Full Name</label>
        </div>
        </div>
        <div className="row">
        <div className="input-field col s6">
          <input id="user_name" name="userName" type="text" onChange={this.onChange} className="validate"
          value={this.state.userName} />
          <label htmlFor="user_name">Username</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6">
          <input id="password" name="email" type="email" onChange={this.onChange} className="validate"
                    value={this.state.email} />
          <label htmlFor="password">Email</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6">
          <input id="email" name="password" type="password" onChange={this.onChange} className="validate" />
          <label htmlFor="email">Password</label>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
       <button className="waves-effect waves-light btn orange" id="editButton" type="submit" onClick={this.onSubmit}>
       Edit Profile</button>
       </div>
       </div>
    </div>
    </div>
</div>
     );
  }
};
const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    profile: profileCredentials => dispatch(editProfile(profileCredentials))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { editProfile, getUser } from '../../actions/userActions';
import NavigationBar from './NavigationBar.jsx';

/**
 *
 * updates the user profile
 * @class EditProfile
 * @extends {React.Component}
 */
export class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      userName: '',
      email: '',
      oldPassword: '',
      password: '',
      confirmPassword: '',
      userId: this.props.id,
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * hides the side navigation when the component is rendered
   * @return{void} - null
   * @memberof EditProfile
   */
  componentWillMount() {
    this.props.getUser(this.state.userId).then(() => {
      this.setState({
        fullName: this.props.fullName,
        userName: this.props.userName,
        email: this.props.email,
        password: '',
      });
    });
  }
  /**
   *
   *@return{void} - void
   * @memberof EditProfile
   */
  componentDidMount() {
    if (this.props.isAuthenticated === false) {
      this.props.history.push('/');
    }
    $('.button-collapse').sideNav('hide');
    this.props.getUser(this.state.userId);
  }

  /**
   *
   * @return {void} - returns a new state of the inputs
   * @param {string} event - on Change value from the inpput field
   * @memberof EditProfile
   */

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @return {void} displays a toastr on success
   * @param {void} event on click dispatches the edit profile action
   * @memberof EditProfile
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ error: {} });
    if (this.state.password !== this.state.confirmPassword) {
      toastr.error('Passwords do not match');
    } else {
      this.props.editProfile(this.state).then((error) => {
        if (error) {
          this.setState({ error: error.response.data });
        } else {
          this.props.getUser(this.state.userId);
          toastr.success('Profile updated successfully');
        }
      });
    }
  }
  render() {
    const { error } = this.state;
    if (this.props.isAuthenticated === false) return null;
    const profileStyle = {
      marginLeft: '400px'
    };
    return (
      <div>
        <NavigationBar />
        <br />
        <h4 className="searchHeading">Edit Profile</h4>
        <div id="formField" style={profileStyle}>
          <div className="col s12 z-depth 5">
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="full_name"
                  name="fullName"
                  type="text"
                  onChange={this.onChange}
                  value={this.state.fullName}
                  className="text"
                />
                <label htmlFor="full_name">Full Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="user_name"
                  name="userName"
                  type="text"
                  onChange={this.onChange}
                  className="validate"
                  value={this.state.userName}
                />
                <label htmlFor="user_name">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="editEmail"
                  name="email"
                  type="email"
                  onChange={this.onChange}
                  className="validate"
                  value={this.state.email}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="editpassword"
                  name="oldPassword"
                  type="password"
                  onChange={this.onChange}
                  className="validate"
                />
                {error.message &&
                 <span className="error-block">{error.message}
                   </span>}
                <label htmlFor="oldPassword">Old Password</label>
              </div>
            </div>
             <div className="row">
              <div className="input-field col s6">
                <input
                  id="editpassword"
                  name="password"
                  type="password"
                  onChange={this.onChange}
                  className="validate"
                />
                <label htmlFor="password">New Password</label>
              </div>
            </div>
             <div className="row">
              <div className="input-field col s6">
                <input
                  id="editpassword"
                  name="confirmPassword"
                  type="password"
                  onChange={this.onChange}
                  className="validate"
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <button
                  className="waves-effect waves-light btn orange"
                  id="editButton"
                  type="submit"
                  onClick={this.onSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  fullName: PropTypes.string.isRequired,
  userName: PropTypes.string,
  email: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.object,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  id: state.usersReducer.user.id,
  fullName: state.usersReducer.user.fullName,
  userName: state.usersReducer.user.userName,
  email: state.usersReducer.user.email,
  isAuthenticated: state.usersReducer.isAuthenticated,
});
export default
  connect(mapStateToProps, { editProfile, getUser })(withRouter(EditProfile));

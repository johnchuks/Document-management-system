import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupAction } from '../../actions/userActions';
import Navigation from './Navigation.jsx';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      userName: '',
      email: '',
      password: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    this.setState({ errors: {} });
    event.preventDefault();
    this.props.signup(this.state).then(
      () => {
        this.props.history.push('/dashboard'); // big edge case
      },
      error => this.setState({ errors: error.response.data })
    );
  }
  render() {
    const errorAlert = {
      color: 'red'
    };
    const { errors } = this.state;
    return (
      <div>
        <Navigation />
        <div className="signupContainer">
          <div className="row">
            <form className="col s12 z-depth-5" id="signup">
              <div className="row">
                <div className="col s12">
                  <h5> Sign Up to DocumentME</h5>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="full_Name"
                    name="fullName"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="full_Name" id="label">Full Name</label>
                  {errors.fullName &&
                    <span className="help-block" style={errorAlert}>
                      {errors.fullName}
                    </span>}
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="user_Name"
                    name="userName"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="user_Name" id="label">User Name</label>
                  {errors.userName &&
                    <span className="help-block" style={errorAlert}>
                      {errors.userName}
                    </span>}
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    name="email"
                    type="email"
                    className="validate"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="email" id="label">Email</label>
                  {errors.email &&
                    <span className="help-block" style={errorAlert}>
                      {errors.email}
                    </span>}
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    name="password"
                    type="password"
                    className="validate"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="password" id="label">Password</label>
                  {errors.password &&
                    <span className="help-block" style={errorAlert}>
                      {errors.password}
                    </span>}
                </div>
              </div>
              <div className="row">
                <div className="col m6 s12">
                  <a
                    className="waves-effect wave-light btn orange"
                    id="signupButton"
                    type="submit"
                    name="action"
                    onClick={this.onSubmit}
                  >
                    SignUp
                  </a>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  signup: signupCredentials => dispatch(signupAction(signupCredentials))
});
export default connect(null, mapDispatchToProps)(withRouter(SignupPage));

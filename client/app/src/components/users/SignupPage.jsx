import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { signupAction } from '../../actions/userActions';
import Navigation from './Navigation.jsx';
import Footer from './Footer';

/**
 *
 *
 * @class SignupPage
 * @extends {React.Component}
 */
export class SignupPage extends React.Component {
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
  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.error });
  }
  /**
   *
   * @return {void} - updated state of the inputs
   * @param {string} event - returns the on change value from the input fields
   * @memberof SignupPage
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @return {void} - dispatches the action
   * @param {void} event - null
   * @memberof SignupPage
   */
  onSubmit(event) {
    this.setState({ errors: {} });
    event.preventDefault();
    this.props.signup(this.state).then(() => {
      if (!this.state.errors) {
        this.props.history.push('/dashboard');
        toastr.success('You have successfully signed up');
      } else {
        const { errors } = this.state;
        toastr.error(errors.message);
        this.props.history.push('/signup');
      }
    });
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
            <form className="col s12 z-depth-5" id="signupForm" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col s12">
                  <h5 id="signupId"> Sign Up to DocumentME</h5>
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
                  <button
                    className="waves-effect wave-light btn orange"
                    id="signupButton"
                    type="submit"
                    name="action"
                    onClick={this.onSubmit}
                  >
                    SignUp
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
SignupPage.propTypes = {
  history: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  error: state.usersReducer.error
});
const mapDispatchToProps = dispatch => ({
  signup: signupCredentials => dispatch(signupAction(signupCredentials))
});

export default connect(mapStateToProps,
 mapDispatchToProps)(withRouter(SignupPage));

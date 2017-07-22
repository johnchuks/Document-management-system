import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';
import { loginAction } from '../../actions/userActions';
import Navigation from './Navigation.jsx';
import Footer from './Footer';
/**
 *
 * renders the login page component
 * @class LoginPage
 * @extends {React.Component}
 */
export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      userId: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.error });
  }
  /**
   *
   * @return {void} updated state of the user details
   * @param {void} event - on change event value from the input field
   * @memberof LoginPage
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @return {void} the login action is dispatched
   * @param {void} event - on click event
   * @memberof LoginPage
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.loginAction(this.state).then(() => {
      if (!this.state.errors.message) {
        this.props.history.push('/dashboard');
        toastr.success('You are Logged in successfully');
      } else {
        const { errors } = this.state;
        toastr.error(errors.message);
        this.props.history.push('/');
        this.setState({ errors: {} });
      }
    });
  }
  render() {
    return (
      <div>
        <Navigation />
        <div className="loginContainer">
          <div className="row">
            <div className="col s12  z-depth-5" id="login"
            onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col s12">
                  <h5 id="loginId">Login into your account</h5>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons" id="iconEmailPassword">
                    email
                  </i>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="email" id="label">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons" id="iconEmailPassword">
                    lock_outline
                  </i>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="validate"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="password" id="label">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <button
                    className="waves-effect waves-light btn orange"
                    id="loginButton"
                    type="submit"
                    onClick={this.onSubmit}
                  >
                    Log in
                  </button>
                  <div className="row">
                    <div className="col s12">
                      <p id="loginLink">
                        {' '}Don't have an account?
                        <a href="/signup" id="signupLink">SignUp Here</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  loginAction: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.usersReducer.user,
  error: state.usersReducer.error
});

export default connect(mapStateToProps, { loginAction })(
  withRouter(LoginPage)
);



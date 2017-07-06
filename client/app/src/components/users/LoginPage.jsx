import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginAction } from '../../actions/userActions';
import Navigation from './Navigation.jsx';

/**
 *
 * renders the login page component
 * @class LoginPage
 * @extends {React.Component}
 */
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false,
      userId: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   *
   * @return {*} updated state of the user details
   * @param {string} event - on change event value from the input field
   * @memberof LoginPage
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @return {*} the login action is dispatched
   * @param {*} event - on click event
   * @memberof LoginPage
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.login(this.state).then((error) => {
      if (!error) {
        this.props.history.push('/dashboard');
      } else {
        this.setState({ errors: error.response.data, isLoading: false });
        this.props.history.push('/');
      }
    });
  }
  render() {
    const rowStyle = {
      marginTop: '100px'
    };
    const { errors } = this.state;

    return (
      <div>
        <Navigation />
        <div className="loginContainer">
          <div className="row" style={rowStyle}>
            <div className="col s12  z-depth-5" id="login">
              <div className="row">
                <div className="col s12">
                  <h5 id="loginId">Login into your account</h5>
                  {errors.message &&
                    <div className="alert alert-danger">
                      {errors.message}
                    </div>}
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
                  {errors.email &&
                    <span id="errorAlert" className="help-block">
                      {errors.email}
                    </span>}
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
                  {errors.password &&
                    <span id="errorAlert" className="help-block">
                      {errors.password}
                    </span>}
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
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.usersReducer.user.id
});
const mapDispatchToProps = dispatch => ({
  login: loginCrendentials => dispatch(loginAction(loginCrendentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(LoginPage)
);

LoginPage.propTypes = {
  history: PropTypes.object.isRequired
};
LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

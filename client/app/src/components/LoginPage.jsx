import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions/userActions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    this.setState({ errors: {} });
    event.preventDefault();
    this.props.login(this.state).then((response) => {
      return response.data;
    }, error => this.setState({ errors: error.response.data }));

  }
  render() {
    console.log(this.state.errors);
    const rowStyle = {
      marginTop: '100px',
    };
    const { errors } = this.state;

    return (
      <div>
        <div className="loginContainer">
        <div className="row" style={rowStyle}>
          <div className="col s12  z-depth-5" id="login">
        <div className="row">
          <div className="col s12">
            <h5>Login into your account</h5>
          </div>
        </div>
        <div className="row">
              <div className="input-field col s12">
            <i className="material-icons" id="iconEmailPassword">
              email</i>
            <input id="email" name="email" type="text"
              className="validate" onChange={this.handleChange} />
            <label htmlFor="email" id="label">Email</label>
            {errors.message && <span id="errorAlert" className="help-block">{errors.message}</span>}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons" id="iconEmailPassword">
              lock_outline</i>
            <input id="password" name="password" type="text"
              className="validate" onChange={this.handleChange} />
            <label htmlFor="password" id="label">Password</label>
             {errors.message && <span id="errorAlert" className="help-block">{errors.message}</span>}
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                  <button className="waves-effect waves-light btn orange" type="submit" onClick={this.onSubmit}>
                  Log in</button>
                <div className="row">
                  <div className="col s12">
                    <p> Don't have an account? <a href="/signup" id="signupLink">SignUp</a></p>
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
const mapDispatchToProps = (dispatch) => {
  return {
    login: loginCrendentials => dispatch(loginAction(loginCrendentials))
  };
};
export default connect(null, mapDispatchToProps)(LoginPage);


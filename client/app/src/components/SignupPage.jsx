import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupAction } from '../actions/userActions';


class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      userName: '',
      email: '',
      password: '',
      errors: {},
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
    console.log(this.state);
    this.props.signup(this.state).then(() => {
      this.props.history.push('/dashboard')
    }, error => this.setState({ errors: error.response.data }));
  };
  render() {
    const login = {
      border: "10px solid #F5F3EE",
      padding: "inherit",
      width: "50%",
      height: "50%",
      marginLeft: '300px',
      backgroundColor: "#F5F3EE",
    };
    const errorAlert = {
      color: 'red',
    };
    const { errors } = this.state;
    return (
      <div>
        <div>
        <div className="row">
            <form className="col s12 z-depth-5" style={login}>
              <div className="row">
                <div className="col s12">
                  <h5> Sign Up to DocMe</h5>
                  </div>
                </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="full_Name" name="fullName" type="text" className="validate" onChange={this.handleChange}/>
                <label htmlFor="full_Name">Full Name</label>
                {errors.message && <span className="help-block" style={errorAlert}>{errors.message}</span>}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="user_Name" name="userName" type="text" className="validate" onChange={this.handleChange}/>
                <label htmlFor="user_Name">User Name</label>
                {errors.message && <span className="help-block" style={errorAlert}>{errors.message}</span>}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" name="email" type="email" className="validate" onChange={this.handleChange} />
                <label htmlFor="email">Email</label>
                {errors.message && <span className="help-block"style={errorAlert}>{errors.message}</span>}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" name="password" type="password" className="validate" onChange={this.handleChange} />
                <label htmlFor="password">Password</label>
                {errors.message && <span className="help-block"style={errorAlert}>{errors.message}</span>}
              </div>
            </div>
            <div className="row">
              <div className="col m6 s12">
                  <a className="waves-effect wave-light btn" type="submit" name="action" onClick={this.onSubmit}>SignUp</a>
            </div>

            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    signup: signupCredentials => dispatch(signupAction(signupCredentials))
  };
};
export default connect(null, mapDispatchToProps)(withRouter(SignupPage));

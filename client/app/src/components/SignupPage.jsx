import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import signupAction from '../actions/createUserActions';


class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.props.signup(this.state).then(() => {
      this.props.history.push('/dashboard');
    });
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
  console.log('this.props.signup', (this.state));
    return (
      <div>
        <div>
        <div className="row">
            <form className="col s12 z-depth-5" style={login}>
              <div class="row">
                <div class="col s12">
                  <h5> Sign Up to DocMe</h5>
                  </div>
                </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="first_Name" name="firstName" type="text" className="validate" onChange={this.handleChange}/>
                <label htmlFor="first_Name">First Name</label>
              </div>
              <div className="input-field col s12">
                <input id="last_Name" name="lastName" type="text" className="validate" onChange={this.handleChange}/>
                <label htmlFor="last_Name">Last Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="user_Name" name="userName" type="text" className="validate" onChange={this.handleChange}/>
                <label htmlFor="user_Name">User Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" name="email" type="email" className="validate" onChange={this.handleChange} />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" name="email" type="password" className="validate" onChange={this.handleChange} />
                <label htmlFor="email">Email</label>
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
export default connect(mapDispatchToProps)(withRouter(SignupPage));

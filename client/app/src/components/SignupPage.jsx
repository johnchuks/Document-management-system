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
      border: "10px solid #444",
      padding: "inherit",
      width: "50%",
      height: "50%",
      marginLeft: '300px',
      backgroundColor: "#444",
  }
    return (
      <div>
        <h1>Signup</h1>
        <div>
        <div className="row">
          <form className="col s12" style={login}>
            <div className="row">
              <div className="input-field col s6">
                <input id="first_Name" name="firstName" type="text" className="validate" placeholder="firstName" onChange={this.handleChange}/>
                {/*<label htmlFor="first_Name">First Name</label>*/}
              </div>
              <div className="input-field col s6">
                <input id="last_Name" name="lastName" type="text" placeholder="Last Name" className="validate" onChange={this.handleChange}/>
                {/*<label htmlFor="last_Name">Last Name</label>*/}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="user_Name" name="userName" type="text" placeholder=" User Name" className="validate" onChange={this.handleChange}/>
                {/*<label htmlFor="user_Name">User Name</label>*/}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" name="password" type="password" placeholder="Password" className="validate" onChange={this.handleChange} />
                {/*<label htmlFor="password">Password</label>*/}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" name="email" type="email" placeholder="Email" className="validate" onChange={this.handleChange} />
                {/*<label htmlFor="email">Email</label>*/}
              </div>
            </div>
            <div className="row">
            <a className="waves-effect wave-light btn"type="submit"name="action" onClick={this.onSubmit}>SignUp</a>
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

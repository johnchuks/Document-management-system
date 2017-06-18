import React from 'react';

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
    console.log(this.state)
  }
  render() {
    const rowStyle = {
      marginTop: '100px',
    };
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
              lock_outline</i>
            <input id="email" name="email" type="text"
              className="validate" onChange={this.handleChange} />

            <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons" id="iconEmailPassword">
              lock_outline</i>
            <input id="password" name="password" type="text"
              className="validate" onChange={this.handleChange} />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                  <button className="waves-effect waves-light btn orange" type="submit" onClick={this.onSubmit}>
                  Log in</button>
                <div className="row">
                  <div className="col s12">
                    <p> Don't have an account? <a href="/signup">SignUp</a></p>
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
export default LoginPage;


import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {},
    };
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmitChange(event) {
    this.setState({ error: {} });
    event.preventDefault();
    this.props.history.push('/dashboard');
  }
  render() {
    return (
      <div>
        <div className="row">
          <form className="col s12" style={login}>
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
            </form>
            </div>
        </div>
    )
  }
}
export default withRouter(LoginPage);

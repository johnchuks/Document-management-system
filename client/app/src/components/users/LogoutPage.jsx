import React from 'react';

/**
 *
 * logs the user out of the application
 * @export
 * @class LogoutPage
 * @extends {React.Component}
 */
class LogoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   *
   * @return {*} - null
   * @memberof LogoutPage
   */
  onSubmit() {
    localStorage.removeItem('jwtToken');
  }
  render() {
    return (
      <div id="nav">
        <nav>
          <div className="nav-wrapper">
            <a
              href="#"
              data-activates="slide-out"
              className="button-collapse navigationCollapse"
            >
              <i className="material-icons">menu</i>
            </a>

            <div className="brand-logo left" id="navLogout">DocumentME</div>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a
                  className="waves-effect wave-light"
                  href="/"
                  onClick={this.onSubmit}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>

      </div>
    );
  }
}
export default LogoutPage;

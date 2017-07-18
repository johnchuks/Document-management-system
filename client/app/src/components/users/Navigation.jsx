import React from 'react';

/**
 * displats static navigation header
 * @return {*} - null
 */
const Navigation = () => (
  <div>
    <nav>
      <div className="nav-wrapper">
        <div className="brand-logo left" id="navLogin">DocumentME</div>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="/" className="waves-effect waves-light">
              Login
            </a>
          </li>
          <li>
            <a id="navSignup" className="waves-effect wave-light" href="/signup">Signup</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);
export default Navigation;
